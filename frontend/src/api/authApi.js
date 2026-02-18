// 인증(로그인/로그아웃/상태확인) API 호출 함수 모음
// JWT 기반 인증: 토큰을 localStorage에 저장하고, Authorization 헤더로 전송

// 로그인: 백엔드에서 JWT 토큰을 발급받아 localStorage에 저장
export async function login(username, password) {
  const response = await fetch('/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  })
  if (!response.ok) throw new Error('아이디 또는 비밀번호가 올바르지 않습니다')
  const data = await response.json()
  // 서버가 발급한 JWT 토큰을 브라우저 localStorage에 저장
  // 이후 API 요청 시 이 토큰을 꺼내서 Authorization 헤더에 넣음
  localStorage.setItem('token', data.token)
  return data
}

// 로그아웃: localStorage에서 토큰 삭제 (서버에는 할 일 없음)
export async function logout() {
  localStorage.removeItem('token')
}

// 로그인 상태 확인: 저장된 토큰으로 백엔드에 확인
// 페이지 새로고침 시 로그인 상태를 복원하는 데 사용
export async function checkStatus() {
  const token = localStorage.getItem('token')
  // 토큰이 없으면 API 호출 없이 바로 비로그인 처리
  if (!token) return { username: null, message: 'Not Login' }

  const response = await fetch('/api/auth/status', {
    headers: { 'Authorization': `Bearer ${token}` },
  })
  if (!response.ok) throw new Error('상태 확인 실패')
  return response.json()
}

// 저장된 토큰을 반환하는 헬퍼 함수
// postApi.js에서 Authorization 헤더를 만들 때 사용
export function getToken() {
  return localStorage.getItem('token')
}
