import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

// LoginPage: 관리자 로그인 페이지
function LoginPage() {
  const navigate = useNavigate()
  const { login } = useAuth()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  // 폼 제출 처리
  const handleSubmit = async (e) => {
    e.preventDefault() // 브라우저 기본 폼 제출(페이지 새로고침) 방지
    setError('')
    setSubmitting(true)

    try {
      await login(username, password)
      // 로그인 성공 시 홈(글 목록)으로 이동
      navigate('/')
    } catch (err) {
      setError(err.message)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="max-w-sm mx-auto mt-16">
      {/* 로그인 카드: 둥근 모서리 + 강화된 그림자 */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
        {/* 상단 장식: 인디고→퍼플 그라데이션 바 */}
        <div className="h-1.5 bg-gradient-to-r from-indigo-500 to-purple-500" />

        <div className="p-8">
          {/* 상단 아이콘: 자물쇠 아이콘을 그라데이션 배경 원 안에 배치 */}
          <div className="flex justify-center mb-5">
            <div className="w-14 h-14 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center shadow-md">
              <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
          </div>

          <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            관리자 로그인
          </h1>

          {/* 에러 메시지 표시 */}
          {error && (
            <div className="bg-red-50 text-red-600 text-sm p-3 rounded-lg mb-4 border border-red-100">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1.5">
                아이디
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 bg-gray-50 placeholder-gray-400"
                placeholder="아이디를 입력하세요"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1.5">
                비밀번호
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 bg-gray-50 placeholder-gray-400"
                placeholder="비밀번호를 입력하세요"
                required
              />
            </div>

            {/* 로그인 버튼: 인디고→퍼플 그라데이션 */}
            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white py-2.5 rounded-lg hover:from-indigo-600 hover:to-purple-600 hover:shadow-md disabled:opacity-50 text-sm font-medium mt-2"
            >
              {submitting ? '로그인 중...' : '로그인'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
