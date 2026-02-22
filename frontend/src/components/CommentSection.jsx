import { useState, useEffect } from 'react'
import { listComments, createComment, deleteComment } from '../api/commentApi'
import { useAuth } from '../contexts/AuthContext'
import Pagination from './Pagination'

// CommentSection: 게시글 하단에 표시되는 댓글 영역
// 댓글 목록 조회, 작성, 삭제 기능을 모두 포함
function CommentSection({ postId }) {
  // 댓글 목록 상태
  const [comments, setComments] = useState([])
  const [currentPage, setCurrentPage] = useState(0)
  const [totalPages, setTotalPages] = useState(0)

  // 댓글 작성 폼 상태
  const [author, setAuthor] = useState('')
  const [password, setPassword] = useState('')
  const [content, setContent] = useState('')
  const [submitting, setSubmitting] = useState(false)

  // 관리자 로그인 상태 (관리자는 비밀번호 없이 삭제 가능)
  const { user } = useAuth()

  // 댓글 목록을 서버에서 가져오는 함수
  const loadComments = (page = 0) => {
    listComments(postId, page)
      .then((data) => {
        setComments(data.content)
        setTotalPages(data.totalPages)
        setCurrentPage(data.number)
      })
      .catch(() => {})
  }

  // 컴포넌트 마운트 시 댓글 목록 로드
  useEffect(() => {
    loadComments()
  }, [postId])

  // 페이지 변경 핸들러
  const handlePageChange = (page) => {
    loadComments(page)
  }

  // 댓글 작성 폼 제출
  const handleSubmit = async (e) => {
    // form의 기본 동작(페이지 새로고침) 방지
    e.preventDefault()
    if (!content.trim() || !author.trim() || !password.trim()) {
      alert('닉네임, 비밀번호, 내용을 모두 입력해주세요.')
      return
    }

    setSubmitting(true)
    try {
      await createComment(postId, { content, author, password })
      // 작성 성공 후 폼 초기화 & 목록 새로고침
      setContent('')
      setAuthor('')
      setPassword('')
      loadComments(0)
    } catch (err) {
      alert(err.message)
    } finally {
      setSubmitting(false)
    }
  }

  // 댓글 삭제 처리
  const handleDelete = async (commentId) => {
    // 관리자는 비밀번호 없이 삭제 (빈 문자열 전송)
    // 일반 사용자는 비밀번호 입력 필요
    const inputPassword = user
      ? ''
      : prompt('삭제하려면 비밀번호를 입력하세요.')

    // prompt에서 취소를 누르면 null 반환
    if (inputPassword === null) return

    try {
      await deleteComment(commentId, inputPassword)
      loadComments(currentPage)
    } catch (err) {
      alert(err.message)
    }
  }

  return (
    <div className="mt-8 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      {/* 헤더: 댓글 수 표시 */}
      <div className="px-8 py-5 border-b border-gray-100">
        <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
          <svg className="w-5 h-5 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
          </svg>
          댓글
        </h2>
      </div>

      <div className="p-8">
        {/* 댓글 작성 폼 */}
        <form onSubmit={handleSubmit} className="mb-8">
          {/* 닉네임 + 비밀번호 입력 (한 줄에 나란히) */}
          <div className="flex gap-3 mb-3">
            <input
              type="text"
              placeholder="닉네임"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className="flex-1 px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
            <input
              type="password"
              placeholder="비밀번호"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="flex-1 px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>
          {/* 댓글 내용 입력 */}
          <textarea
            placeholder="댓글을 입력하세요..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={3}
            className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent mb-3"
          />
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={submitting}
              className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-5 py-2 rounded-lg text-sm font-medium hover:from-indigo-600 hover:to-purple-600 disabled:opacity-50"
            >
              {submitting ? '등록 중...' : '댓글 등록'}
            </button>
          </div>
        </form>

        {/* 댓글 목록 */}
        {comments.length === 0 ? (
          <p className="text-gray-400 text-center py-8 text-sm">아직 댓글이 없습니다. 첫 댓글을 남겨보세요!</p>
        ) : (
          <div className="space-y-4">
            {comments.map((comment) => (
              <div key={comment.id} className="border border-gray-100 rounded-lg p-4">
                {/* 댓글 상단: 작성자 + 날짜 + 삭제 버튼 */}
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-sm text-gray-900">{comment.author}</span>
                    <span className="text-xs text-gray-400">
                      {comment.createdAt?.substring(0, 10)}
                    </span>
                  </div>
                  <button
                    onClick={() => handleDelete(comment.id)}
                    className="text-xs text-gray-400 hover:text-red-500"
                  >
                    삭제
                  </button>
                </div>
                {/* 댓글 내용: 줄바꿈 유지 */}
                <p className="text-sm text-gray-700 whitespace-pre-wrap">{comment.content}</p>
              </div>
            ))}
          </div>
        )}

        {/* 페이지네이션: 기존 Pagination 컴포넌트 재활용 */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  )
}

export default CommentSection
