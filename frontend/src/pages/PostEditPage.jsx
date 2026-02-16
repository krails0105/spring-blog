import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { fetchPost, fetchCategories, updatePost } from '../api/postApi'
import PostForm from '../components/PostForm'

// PostEditPage: 글 수정 페이지
// 기존 글 데이터를 불러와서 PostForm에 초기값으로 전달
function PostEditPage() {
  const { id } = useParams()
  const navigate = useNavigate()

  // 기존 글 데이터 (PostForm의 initialData로 사용)
  const [initialData, setInitialData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // 기존 글 데이터 + 카테고리 목록을 동시에 로드
  useEffect(() => {
    // Promise.all: 여러 비동기 작업을 동시에 실행
    Promise.all([fetchPost(id), fetchCategories()])
      .then(([post, categories]) => {
        // PostForm에 전달할 초기값 구성
        // categoryName → categoryId로 변환 (카테고리 이름으로 ID를 찾음)
        const matchedCategory = categories.find((c) => c.name === post.categoryName)
        setInitialData({
          title: post.title,
          content: post.content,
          categoryId: matchedCategory?.id || '',
          tagNames: post.tagNames || [],
        })
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [id])

  // 폼 제출 시 호출: API로 글 수정 후 상세 페이지로 이동
  const handleSubmit = async (postData) => {
    try {
      await updatePost(id, postData)
      navigate(`/posts/${id}`)
    } catch (err) {
      alert(err.message)
    }
  }

  if (loading) return <p className="text-gray-500 text-center py-8">불러오는 중...</p>
  if (error) return <p className="text-red-500 text-center py-8">{error}</p>

  return (
    <div className="bg-white rounded-lg shadow-sm border p-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">글 수정</h1>
      {/* initialData를 PostForm에 전달하여 기존 값으로 폼을 채움 */}
      <PostForm
        initialData={initialData}
        onSubmit={handleSubmit}
        submitLabel="수정하기"
      />
    </div>
  )
}

export default PostEditPage
