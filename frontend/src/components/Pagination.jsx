// Pagination: 페이지 번호 버튼을 렌더링하는 컴포넌트
// currentPage: 현재 선택된 페이지 (0부터 시작)
// totalPages: 전체 페이지 수
// onPageChange: 페이지 번호 클릭 시 호출되는 콜백
function Pagination({ currentPage, totalPages, onPageChange }) {
  // 페이지가 1개 이하면 페이지네이션 불필요
  if (totalPages <= 1) return null

  // 페이지 번호 배열 생성 (예: totalPages가 5면 [0, 1, 2, 3, 4])
  const pages = Array.from({ length: totalPages }, (_, i) => i)

  return (
    <div className="flex justify-center gap-2 mt-8">
      {/* 이전 페이지 버튼: pill 형태 (둥근 모서리) */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 0}
        className="px-3 py-1.5 rounded-full text-sm font-medium disabled:opacity-30 disabled:cursor-not-allowed text-gray-500 hover:bg-indigo-50 hover:text-indigo-600"
      >
        &larr; 이전
      </button>

      {/* 페이지 번호 버튼들 */}
      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          // 현재 페이지: 인디고→퍼플 그라데이션 배경, 나머지: 호버 시 연한 인디고 배경
          className={`w-9 h-9 rounded-full text-sm font-medium ${
            page === currentPage
              ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-md'
              : 'text-gray-600 hover:bg-indigo-50 hover:text-indigo-600'
          }`}
        >
          {/* 사용자에게는 1부터 보여줌 (내부적으로는 0부터) */}
          {page + 1}
        </button>
      ))}

      {/* 다음 페이지 버튼 */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages - 1}
        className="px-3 py-1.5 rounded-full text-sm font-medium disabled:opacity-30 disabled:cursor-not-allowed text-gray-500 hover:bg-indigo-50 hover:text-indigo-600"
      >
        다음 &rarr;
      </button>
    </div>
  )
}

export default Pagination
