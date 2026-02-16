// API 호출 함수 모음
// fetch API를 사용하여 백엔드(Spring Boot)와 통신
// Vite 프록시 설정으로 /api 요청이 자동으로 localhost:8080으로 전달됨

// 글 목록 조회 (검색, 카테고리 필터, 페이징 지원)
// params: { page, keyword, category }
export async function fetchPosts(params = {}) {
  // URLSearchParams: 객체를 쿼리스트링으로 변환 (예: ?page=0&keyword=spring)
  const query = new URLSearchParams()

  // 페이지 번호 (Spring Data JPA는 0부터 시작)
  if (params.page !== undefined) query.set('page', params.page)
  // 검색어
  if (params.keyword) query.set('keyword', params.keyword)
  // 카테고리 필터
  if (params.category) query.set('category', params.category)

  const response = await fetch(`/api/posts?${query.toString()}`)
  if (!response.ok) throw new Error('글 목록을 불러오지 못했습니다')
  return response.json()
}

// 글 상세 조회
export async function fetchPost(id) {
  const response = await fetch(`/api/posts/${id}`)
  if (!response.ok) throw new Error('글을 찾을 수 없습니다')
  return response.json()
}

// 글 작성
// postData: { title, content, categoryId, tagNames }
export async function createPost(postData) {
  const response = await fetch('/api/posts', {
    method: 'POST',
    // JSON 형식으로 보낸다고 서버에 알려주는 헤더
    headers: { 'Content-Type': 'application/json' },
    // JavaScript 객체를 JSON 문자열로 변환하여 전송
    body: JSON.stringify(postData),
  })
  if (!response.ok) throw new Error('글 작성에 실패했습니다')
  return response.json()
}

// 글 수정
export async function updatePost(id, postData) {
  const response = await fetch(`/api/posts/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(postData),
  })
  if (!response.ok) throw new Error('글 수정에 실패했습니다')
  return response.json()
}

// 글 삭제
export async function deletePost(id) {
  const response = await fetch(`/api/posts/${id}`, {
    method: 'DELETE',
  })
  if (!response.ok) throw new Error('글 삭제에 실패했습니다')
  // 204 No Content 응답은 body가 없으므로 json() 호출하지 않음
}

// 카테고리 목록 조회 (글 작성/수정 폼의 드롭다운에 사용)
export async function fetchCategories() {
  const response = await fetch('/api/categories')
  if (!response.ok) throw new Error('카테고리를 불러오지 못했습니다')
  return response.json()
}
