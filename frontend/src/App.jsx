import { Routes, Route, Link, Navigate } from 'react-router-dom'
import { useAuth } from './contexts/AuthContext'
import PostListPage from './pages/PostListPage'
import PostDetailPage from './pages/PostDetailPage'
import PostCreatePage from './pages/PostCreatePage'
import PostEditPage from './pages/PostEditPage'
import LoginPage from './pages/LoginPage'

// App 컴포넌트: 전체 레이아웃 + URL별 페이지 라우팅 설정
function App() {
  // useAuth: AuthContext에서 로그인 상태와 로그아웃 함수를 가져옴
  const { user, logout } = useAuth()

  // 로그아웃 버튼 클릭 처리
  const handleLogout = async () => {
    try {
      await logout()
    } catch (err) {
      alert(err.message)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 상단 네비게이션 바 */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 py-4 flex justify-between items-center">
          {/* 블로그 제목 - 클릭하면 홈(글 목록)으로 이동 */}
          <Link to="/" className="text-xl font-bold text-gray-800 hover:text-blue-600">
            Spring Blog
          </Link>
          {/* 로그인 상태에 따라 다른 버튼 표시 */}
          <div className="flex items-center gap-3">
            {user ? (
              <>
                {/* 로그인 상태: 새 글 작성 + 로그아웃 버튼 */}
                <span className="text-sm text-gray-500">{user.username}</span>
                <Link
                  to="/posts/new"
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 text-sm"
                >
                  새 글 작성
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-gray-500 hover:text-gray-700 text-sm"
                >
                  로그아웃
                </button>
              </>
            ) : (
              /* 비로그인 상태: 로그인 버튼만 표시 */
              <Link
                to="/login"
                className="text-gray-600 hover:text-blue-600 text-sm"
              >
                로그인
              </Link>
            )}
          </div>
        </div>
      </nav>

      {/* 메인 콘텐츠 영역 */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* Routes: URL 경로에 따라 어떤 컴포넌트를 보여줄지 결정 */}
        <Routes>
          {/* / → 글 목록 페이지 */}
          <Route path="/" element={<PostListPage />} />
          {/* /login → 로그인 페이지 */}
          <Route path="/login" element={<LoginPage />} />
          {/* /posts/new → 글 작성 (로그인 필요 - 비로그인 시 로그인 페이지로 이동) */}
          <Route
            path="/posts/new"
            element={user ? <PostCreatePage /> : <Navigate to="/login" />}
          />
          {/* /posts/123 → 글 상세 페이지 (:id는 동적 파라미터) */}
          <Route path="/posts/:id" element={<PostDetailPage />} />
          {/* /posts/123/edit → 글 수정 (로그인 필요) */}
          <Route
            path="/posts/:id/edit"
            element={user ? <PostEditPage /> : <Navigate to="/login" />}
          />
        </Routes>
      </main>
    </div>
  )
}

export default App
