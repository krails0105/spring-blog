import { Link } from 'react-router-dom'

// PostCard: 글 목록에서 각 글을 카드 형태로 보여주는 컴포넌트
// props로 글 데이터(post)를 받아서 표시
function PostCard({ post }) {
  return (
    // 카드 전체가 클릭 가능한 링크 (해당 글 상세 페이지로 이동)
    <Link to={`/posts/${post.id}`} className="block group">
      {/* 카드 본체: 왼쪽 인디고 액센트 보더 + 호버 시 위로 살짝 이동하며 그림자 강화 */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 border-l-4 border-l-indigo-400 p-5 hover:shadow-lg hover:-translate-y-0.5">
        {/* 글 제목: 호버 시 인디고 색상으로 변경 */}
        <h2 className="text-lg font-semibold text-gray-800 mb-2 group-hover:text-indigo-600">
          {post.title}
        </h2>

        {/* 글 내용 미리보기 (최대 100자까지만 표시) */}
        <p className="text-gray-500 text-sm mb-3 line-clamp-2 leading-relaxed">
          {post.content?.substring(0, 100)}
          {post.content?.length > 100 && '...'}
        </p>

        {/* 메타 정보: 카테고리, 태그, 작성일 */}
        <div className="flex flex-wrap items-center gap-2 text-xs text-gray-500">
          {/* 카테고리 뱃지: 인디고 계열 배경 */}
          {post.categoryName && (
            <span className="bg-indigo-50 text-indigo-600 px-2.5 py-0.5 rounded-full font-medium">
              {post.categoryName}
            </span>
          )}
          {/* 태그 뱃지들: pill(둥근 알약) 스타일 */}
          {post.tagNames?.map((tag) => (
            <span key={tag} className="bg-gray-100 text-gray-500 px-2.5 py-0.5 rounded-full">
              #{tag}
            </span>
          ))}
          {/* 작성일: 달력 아이콘 + 날짜 */}
          <span className="ml-auto flex items-center gap-1 text-gray-400">
            {/* 달력 SVG 아이콘 (16x16) */}
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            {post.createdAt?.substring(0, 10)}
          </span>
        </div>
      </div>
    </Link>
  )
}

export default PostCard
