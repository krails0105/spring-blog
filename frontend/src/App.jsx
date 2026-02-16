import { Routes, Route, Link } from 'react-router-dom'
import PostListPage from './pages/PostListPage'
import PostDetailPage from './pages/PostDetailPage'
import PostCreatePage from './pages/PostCreatePage'
import PostEditPage from './pages/PostEditPage'

// App 컴포넌트: 전체 레이아웃 + URL별 페이지 라우팅 설정
function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* 상단 네비게이션 바 */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 py-4 flex justify-between items-center">
          {/* 블로그 제목 - 클릭하면 홈(글 목록)으로 이동 */}
          <Link to="/" className="text-xl font-bold text-gray-800 hover:text-blue-600">
            Spring Blog
          </Link>
          {/* 글 작성 버튼 */}
          <Link
            to="/posts/new"
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 text-sm"
          >
            새 글 작성
          </Link>
        </div>
      </nav>

      {/* 메인 콘텐츠 영역 */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* Routes: URL 경로에 따라 어떤 컴포넌트를 보여줄지 결정 */}
        <Routes>
          {/* / → 글 목록 페이지 */}
          <Route path="/" element={<PostListPage />} />
          {/* /posts/new → 글 작성 페이지 (주의: :id보다 위에 있어야 함) */}
          <Route path="/posts/new" element={<PostCreatePage />} />
          {/* /posts/123 → 글 상세 페이지 (:id는 동적 파라미터) */}
          <Route path="/posts/:id" element={<PostDetailPage />} />
          {/* /posts/123/edit → 글 수정 페이지 */}
          <Route path="/posts/:id/edit" element={<PostEditPage />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
