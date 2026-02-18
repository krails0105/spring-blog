import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { fetchPost, deletePost } from '../api/postApi'
import { useAuth } from '../contexts/AuthContext'

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

  if (loading) return <p className="text-gray-500 text-center py-8">불러오는 중...</p>
  if (error) return <p className="text-red-500 text-center py-8">{error}</p>
  if (!post) return <p className="text-gray-500 text-center py-8">글을 찾을 수 없습니다.</p>

  return (
    <article className="bg-white rounded-lg shadow-sm border p-8">
      {/* 글 제목 */}
      <h1 className="text-2xl font-bold text-gray-800 mb-3">{post.title}</h1>

      {/* 메타 정보: 카테고리, 태그, 날짜 */}
      <div className="flex flex-wrap items-center gap-2 text-sm text-gray-500 mb-6 pb-6 border-b">
        {post.categoryName && (
          <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded text-xs">
            {post.categoryName}
          </span>
        )}
        {post.tagNames?.map((tag) => (
          <span key={tag} className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded text-xs">
            #{tag}
          </span>
        ))}
        <span className="ml-auto">{post.createdAt?.substring(0, 10)}</span>
      </div>

      {/* 글 내용 (줄바꿈 유지) */}
      <div className="prose max-w-none text-gray-700 whitespace-pre-wrap mb-8">
        {post.content}
      </div>

      {/* 액션 버튼 */}
      <div className="flex gap-3 pt-6 border-t">
        <Link to="/" className="text-gray-600 hover:text-gray-800 text-sm">
          &larr; 목록으로
        </Link>
        {/* 로그인한 경우에만 수정/삭제 버튼 표시 */}
        {user && (
          <>
            <Link
              to={`/posts/${id}/edit`}
              className="bg-yellow-500 text-white px-4 py-1.5 rounded-lg hover:bg-yellow-600 text-sm ml-auto"
            >
              수정
            </Link>
            <button
              onClick={handleDelete}
              className="bg-red-500 text-white px-4 py-1.5 rounded-lg hover:bg-red-600 text-sm"
            >
              삭제
            </button>
          </>
        )}
      </div>
    </article>
  )
}

export default PostDetailPage
