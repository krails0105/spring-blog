import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { fetchPost, deletePost } from '../api/postApi'
import { useAuth } from '../contexts/AuthContext'
import CommentSection from '../components/CommentSection'

// PostDetailPage: 글 상세 보기 페이지
// URL의 :id 파라미터로 어떤 글을 보여줄지 결정
function PostDetailPage() {
  // useParams: URL에서 동적 파라미터 추출 (/posts/3 → id = "3")
  const { id } = useParams()
  // useNavigate: 프로그래밍 방식으로 페이지 이동 (링크 클릭 없이)
  const navigate = useNavigate()
  // useAuth: 로그인 상태 확인 (수정/삭제 버튼 표시 여부)
  const { user } = useAuth()

  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // 컴포넌트가 마운트되면 (또는 id가 변경되면) 글 데이터를 가져옴
  useEffect(() => {
    fetchPost(id)
      .then(setPost)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [id])

  // 삭제 버튼 클릭 처리
  const handleDelete = async () => {
    // 사용자에게 확인 대화상자 표시
    if (!window.confirm('정말 삭제하시겠습니까?')) return

    try {
      await deletePost(id)
      // 삭제 성공 시 글 목록 페이지로 이동
      navigate('/')
    } catch (err) {
      alert(err.message)
    }
  }

  if (loading) return <p className="text-gray-400 text-center py-12">불러오는 중...</p>
  if (error) return <p className="text-red-500 text-center py-12">{error}</p>
  if (!post) return <p className="text-gray-400 text-center py-12">글을 찾을 수 없습니다.</p>

  return (
    <article className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      {/* 글 제목 영역: 상단에 그라데이션 장식 라인 */}
      <div className="h-1 bg-gradient-to-r from-indigo-500 to-purple-500" />

      <div className="p-8">
        {/* 글 제목: 큰 폰트 + 아래에 그라데이션 밑줄 효과 */}
        <h1 className="text-3xl font-bold text-gray-900 mb-4 leading-tight">
          {post.title}
        </h1>

        {/* 메타 정보: 카테고리, 태그, 날짜 */}
        <div className="flex flex-wrap items-center gap-2 text-sm mb-6 pb-6 border-b border-gray-100">
          {/* 카테고리 뱃지: 인디고 계열 pill 스타일 */}
          {post.categoryName && (
            <span className="bg-indigo-50 text-indigo-600 px-3 py-1 rounded-full text-xs font-medium">
              {post.categoryName}
            </span>
          )}
          {/* 태그 뱃지들 */}
          {post.tagNames?.map((tag) => (
            <span key={tag} className="bg-gray-100 text-gray-500 px-3 py-1 rounded-full text-xs">
              #{tag}
            </span>
          ))}
          {/* 작성일: 달력 아이콘 + 날짜 */}
          <span className="ml-auto flex items-center gap-1.5 text-gray-400 text-xs">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            {post.createdAt?.substring(0, 10)}
          </span>
        </div>

        {/* 글 내용: 줄바꿈 유지 + 읽기 좋은 줄 간격/자간 */}
        <div className="prose max-w-none text-gray-700 whitespace-pre-wrap mb-8 leading-relaxed tracking-wide">
          {post.content}
        </div>

        {/* 액션 버튼 영역 */}
        <div className="flex items-center gap-3 pt-6 border-t border-gray-100">
          {/* 목록으로 돌아가기 링크 */}
          <Link
            to="/"
            className="flex items-center gap-1 text-gray-500 hover:text-indigo-600 text-sm font-medium"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            목록으로
          </Link>
          {/* 로그인한 경우에만 수정/삭제 버튼 표시 */}
          {user && (
            <div className="flex gap-2 ml-auto">
              <Link
                to={`/posts/${id}/edit`}
                className="bg-amber-50 text-amber-600 px-4 py-1.5 rounded-lg hover:bg-amber-100 text-sm font-medium"
              >
                수정
              </Link>
              <button
                onClick={handleDelete}
                className="bg-red-50 text-red-500 px-4 py-1.5 rounded-lg hover:bg-red-100 text-sm font-medium"
              >
                삭제
              </button>
            </div>
          )}
        </div>
      </div>

      {/* 댓글 영역: 게시글 하단에 표시 */}
      <CommentSection postId={id} />
    </article>
  )
}

export default PostDetailPage
