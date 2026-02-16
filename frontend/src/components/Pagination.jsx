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
    <div className="flex justify-center gap-1 mt-8">
      {/* 이전 페이지 버튼 */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 0}
        className="px-3 py-1 rounded border text-sm disabled:opacity-30 hover:bg-gray-100"
      >
        ←
      </button>

      {/* 페이지 번호 버튼들 */}
      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          // 현재 페이지는 파란색 배경, 나머지는 흰색 배경
          className={`px-3 py-1 rounded border text-sm ${
            page === currentPage
              ? 'bg-blue-500 text-white'
              : 'hover:bg-gray-100'
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
        className="px-3 py-1 rounded border text-sm disabled:opacity-30 hover:bg-gray-100"
      >
        →
      </button>
    </div>
  )
}

export default Pagination
