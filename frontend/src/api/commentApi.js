// 댓글 API 호출 함수 모음
// 댓글은 인증 불필요 (누구나 작성/조회 가능, 삭제는 비밀번호 확인)

// 댓글 목록 조회 (특정 게시글의 댓글을 페이지 단위로 가져옴)
// postId: 게시글 ID, page: 페이지 번호 (0부터 시작)
export async function listComments(postId, page = 0) {
  const response = await fetch(`/api/posts/${postId}/comments?page=${page}`)
  if (!response.ok) throw new Error('댓글을 불러오지 못했습니다')
  return response.json()
}

// 댓글 작성
// postId: 어떤 게시글에 댓글을 달 것인지
// data: { content, author, password }
export async function createComment(postId, data) {
  const response = await fetch(`/api/posts/${postId}/comments`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  if (!response.ok) throw new Error('댓글 작성에 실패했습니다')
  return response.json()
}

// 댓글 삭제 (비밀번호 확인 필요)
// id: 댓글 ID, password: 작성 시 입력한 비밀번호
export async function deleteComment(id, password) {
  const response = await fetch(`/api/comments/${id}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    // DELETE 요청이지만 비밀번호 확인을 위해 body를 포함
    body: JSON.stringify({ password }),
  })
  if (!response.ok) {
    throw new Error('비밀번호가 일치하지 않습니다')
  }
}
