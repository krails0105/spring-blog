import { createContext, useContext, useState, useEffect } from 'react'
import { checkStatus, login as apiLogin, logout as apiLogout } from '../api/authApi'

// AuthContext: 앱 전체에서 로그인 상태를 공유하기 위한 React Context
// Context를 사용하면 props 전달 없이 어디서든 로그인 상태를 확인할 수 있음
const AuthContext = createContext(null)

// AuthProvider: App을 감싸서 하위 모든 컴포넌트에 인증 상태를 제공
export function AuthProvider({ children }) {
  // 현재 로그인한 사용자 정보 (null이면 비로그인)
  const [user, setUser] = useState(null)
  // 초기 로딩 상태 (새로고침 시 토큰 확인 중)
  const [loading, setLoading] = useState(true)

  // 앱이 처음 로드될 때 (새로고침 포함) 저장된 토큰으로 로그인 상태 확인
  // localStorage에 토큰이 있으면 서버에 유효성 확인 → user 복원
  useEffect(() => {
    checkStatus()
      .then((data) => {
        // 서버가 username을 반환하면 로그인 상태
        if (data.username) {
          setUser({ username: data.username })
        }
      })
      .catch(() => {
        // 토큰이 만료되었거나 유효하지 않으면 삭제
        localStorage.removeItem('token')
      })
      .finally(() => setLoading(false))
  }, [])

  // 로그인 함수: authApi.login 호출 후 user 상태 업데이트
  // (토큰 저장은 authApi.login 내부에서 처리)
  const login = async (username, password) => {
    const data = await apiLogin(username, password)
    setUser({ username: data.username })
  }

  // 로그아웃 함수: localStorage에서 토큰 삭제 + user 초기화
  const logout = async () => {
    await apiLogout()
    setUser(null)
  }

  // loading 중에는 빈 화면 표시 (깜빡임 방지)
  if (loading) {
    return <div className="min-h-screen bg-gray-50" />
  }

  // value로 전달하는 값들을 하위 컴포넌트에서 useAuth()로 사용 가능
  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

// useAuth: 어디서든 인증 상태와 함수에 접근하는 커스텀 훅
// 사용법: const { user, login, logout } = useAuth()
export function useAuth() {
  return useContext(AuthContext)
}
