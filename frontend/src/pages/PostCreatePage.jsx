import { useNavigate } from 'react-router-dom'
import { createPost } from '../api/postApi'
import PostForm from '../components/PostForm'

// PostCreatePage: 새 글 작성 페이지
// PostForm 컴포넌트를 재사용하여 폼 UI를 렌더링
function PostCreatePage() {
  const navigate = useNavigate()

  // 폼 제출 시 호출: API로 글 생성 후 상세 페이지로 이동
  const handleSubmit = async (postData) => {
    try {
      // createPost가 성공하면 생성된 글 데이터를 반환
      const created = await createPost(postData)
      // 생성된 글의 상세 페이지로 이동
      navigate(`/posts/${created.id}`)
    } catch (err) {
      alert(err.message)
    }
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      {/* 상단 장식: 인디고→퍼플 그라데이션 바 (다른 페이지와 통일된 디자인) */}
      <div className="h-1 bg-gradient-to-r from-indigo-500 to-purple-500" />
      <div className="p-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">새 글 작성</h1>
        <PostForm onSubmit={handleSubmit} submitLabel="작성하기" />
      </div>
    </div>
  )
}

export default PostCreatePage
