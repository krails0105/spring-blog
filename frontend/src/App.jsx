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
    // 배경에 은은한 그라데이션 적용 (위: 밝은 슬레이트 → 아래: 밝은 회색)
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-gray-100 flex flex-col">
      {/* 상단 네비게이션 바: sticky(스크롤해도 상단 고정) + 글래스모피즘(반투명 블러) 효과 */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md shadow-sm border-b border-gray-200/50">
        <div className="max-w-4xl mx-auto px-4 py-4 flex justify-between items-center">
          {/* 블로그 로고: 인디고→퍼플 그라데이션 텍스트 */}
          <Link
            to="/"
            className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-500 bg-clip-text text-transparent hover:from-indigo-500 hover:to-purple-400"
          >
            Spring Blog
          </Link>
          {/* 로그인 상태에 따라 다른 버튼 표시 */}
          <div className="flex items-center gap-3">
            {user ? (
              <>
                {/* 로그인 상태: 사용자 이름 표시 */}
                <span className="text-sm text-gray-500">{user.username}</span>
                {/* 새 글 작성 버튼: 그라데이션 배경 + 호버 시 살짝 확대 */}
                <Link
                  to="/posts/new"
                  className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-4 py-2 rounded-lg hover:from-indigo-600 hover:to-purple-600 hover:scale-105 text-sm font-medium shadow-sm"
                >
                  새 글 작성
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-gray-500 hover:text-indigo-600 text-sm"
                >
                  로그아웃
                </button>
              </>
            ) : (
              /* 비로그인 상태: 로그인 버튼만 표시 */
              <Link
                to="/login"
                className="text-gray-600 hover:text-indigo-600 text-sm font-medium"
              >
                로그인
              </Link>
            )}
          </div>
        </div>
      </nav>

      {/* 메인 콘텐츠 영역 (flex-1로 남은 공간을 모두 차지하여 푸터를 하단에 고정) */}
      <main className="max-w-4xl mx-auto px-4 py-8 w-full flex-1">
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

      {/* 하단 푸터: 저작권 정보 + 기술 스택 표시 */}
      <footer className="border-t border-gray-200/50 bg-white/50 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto px-4 py-6 text-center">
          <p className="text-sm text-gray-400">
            Built with{' '}
            <span className="font-medium text-indigo-400">Spring Boot</span>
            {' + '}
            <span className="font-medium text-purple-400">React</span>
          </p>
          <p className="text-xs text-gray-300 mt-1">
            &copy; {new Date().getFullYear()} Spring Blog
          </p>
        </div>
      </footer>
    </div>
  )
}

export default App
