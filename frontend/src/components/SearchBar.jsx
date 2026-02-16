import { useState, useEffect } from 'react'
import { fetchCategories } from '../api/postApi'

// SearchBar: 검색어 입력 + 카테고리 필터 컴포넌트
// onSearch: 검색 버튼 클릭 시 호출되는 콜백 함수 ({ keyword, category })
// initialKeyword, initialCategory: URL에서 가져온 초기값
function SearchBar({ onSearch, initialKeyword = '', initialCategory = '' }) {
  // 검색어 입력 상태
  const [keyword, setKeyword] = useState(initialKeyword)
  // 선택된 카테고리 상태
  const [category, setCategory] = useState(initialCategory)
  // 카테고리 목록 (API에서 가져옴)
  const [categories, setCategories] = useState([])

  // 컴포넌트가 처음 렌더링될 때 카테고리 목록을 API에서 가져옴
  useEffect(() => {
    fetchCategories()
      .then(setCategories)
      .catch(() => setCategories([]))
  }, []) // [] = 마운트 시 1번만 실행

  // 검색 폼 제출 처리
  const handleSubmit = (e) => {
    e.preventDefault() // 폼의 기본 동작(페이지 새로고침) 방지
    onSearch({ keyword, category })
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-wrap gap-2 mb-6">
      {/* 검색어 입력 필드 */}
      <input
        type="text"
        placeholder="검색어를 입력하세요"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        className="flex-1 min-w-[200px] border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
      />
      {/* 카테고리 드롭다운 */}
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
      >
        <option value="">전체 카테고리</option>
        {categories.map((cat) => (
          <option key={cat.id} value={cat.name}>
            {cat.name}
          </option>
        ))}
      </select>
      {/* 검색 버튼 */}
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 text-sm"
      >
        검색
      </button>
    </form>
  )
}

export default SearchBar
