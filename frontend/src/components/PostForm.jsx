import { useState, useEffect } from 'react'
import { fetchCategories } from '../api/postApi'

// PostForm: 글 작성/수정에서 공통으로 사용하는 폼 컴포넌트
// initialData: 수정 시 기존 글 데이터 (작성 시에는 빈 값)
// onSubmit: 폼 제출 시 호출되는 콜백 함수
// submitLabel: 버튼 텍스트 ("작성하기" 또는 "수정하기")
function PostForm({ initialData = {}, onSubmit, submitLabel = '작성하기' }) {
  // 폼 입력 상태 관리
  const [title, setTitle] = useState(initialData.title || '')
  const [content, setContent] = useState(initialData.content || '')
  const [categoryId, setCategoryId] = useState(initialData.categoryId || '')
  // 태그 입력은 쉼표로 구분된 문자열로 받음 (예: "Java, Spring")
  const [tagInput, setTagInput] = useState(initialData.tagNames?.join(', ') || '')
  // 카테고리 드롭다운 목록
  const [categories, setCategories] = useState([])
  // 제출 중 상태 (중복 클릭 방지)
  const [submitting, setSubmitting] = useState(false)

  // 컴포넌트 마운트 시 카테고리 목록 로드
  useEffect(() => {
    fetchCategories()
      .then(setCategories)
      .catch(() => setCategories([]))
  }, [])

  // 폼 제출 처리
  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)

    // 태그 문자열을 배열로 변환: "Java, Spring" → ["Java", "Spring"]
    // filter(Boolean): 빈 문자열("") 제거
    const tagNames = tagInput
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean)

    await onSubmit({
      title,
      content,
      categoryId: categoryId ? Number(categoryId) : null,
      tagNames,
    })
    setSubmitting(false)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* 글 제목 입력 */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">제목</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
          placeholder="글 제목을 입력하세요"
        />
      </div>

      {/* 카테고리 선택 */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">카테고리</label>
        <select
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
          className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
        >
          <option value="">선택 없음</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      {/* 태그 입력 */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">태그</label>
        <input
          type="text"
          value={tagInput}
          onChange={(e) => setTagInput(e.target.value)}
          className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
          placeholder="쉼표로 구분 (예: Java, Spring, JPA)"
        />
      </div>

      {/* 글 내용 입력 (Markdown 지원) */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">내용 (Markdown)</label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          rows={15}
          className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300 font-mono text-sm"
          placeholder="Markdown 형식으로 작성하세요"
        />
      </div>

      {/* 제출 버튼 */}
      <button
        type="submit"
        disabled={submitting}
        className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 disabled:opacity-50"
      >
        {submitting ? '처리 중...' : submitLabel}
      </button>
    </form>
  )
}

export default PostForm
