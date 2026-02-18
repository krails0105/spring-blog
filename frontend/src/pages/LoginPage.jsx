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
      <div className="bg-white rounded-lg shadow-sm border p-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          관리자 로그인
        </h1>

        {/* 에러 메시지 표시 */}
        {error && (
          <div className="bg-red-50 text-red-600 text-sm p-3 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              아이디
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              비밀번호
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 disabled:opacity-50 text-sm"
          >
            {submitting ? '로그인 중...' : '로그인'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default LoginPage
