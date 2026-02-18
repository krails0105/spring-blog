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
    // 검색 영역을 카드 형태로 감싸기 (배경색 + 테두리 + 둥근 모서리)
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-6">
      <form onSubmit={handleSubmit} className="flex flex-wrap gap-2">
        {/* 검색어 입력 필드: 왼쪽에 돋보기 아이콘 포함 */}
        <div className="relative flex-1 min-w-[200px]">
          {/* 돋보기 SVG 아이콘: 입력 필드 왼쪽에 절대 위치로 배치 */}
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="검색어를 입력하세요"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            className="w-full border border-gray-200 rounded-lg pl-10 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-300 bg-gray-50 placeholder-gray-400"
          />
        </div>
        {/* 카테고리 드롭다운 */}
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-300 bg-gray-50"
        >
          <option value="">전체 카테고리</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.name}>
              {cat.name}
            </option>
          ))}
        </select>
        {/* 검색 버튼: 인디고→퍼플 그라데이션 */}
        <button
          type="submit"
          className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-5 py-2 rounded-lg hover:from-indigo-600 hover:to-purple-600 hover:shadow-md text-sm font-medium"
        >
          검색
        </button>
      </form>
    </div>
  )
}

export default SearchBar
