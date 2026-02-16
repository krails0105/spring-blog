import { Link } from 'react-router-dom'

// PostCard: 글 목록에서 각 글을 카드 형태로 보여주는 컴포넌트
// props로 글 데이터(post)를 받아서 표시
function PostCard({ post }) {
  return (
    // 카드 전체가 클릭 가능한 링크 (해당 글 상세 페이지로 이동)
    <Link to={`/posts/${post.id}`} className="block">
      <div className="bg-white rounded-lg shadow-sm border p-5 hover:shadow-md transition-shadow">
        {/* 글 제목 */}
        <h2 className="text-lg font-semibold text-gray-800 mb-2">{post.title}</h2>

        {/* 글 내용 미리보기 (최대 100자까지만 표시) */}
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {post.content?.substring(0, 100)}
          {post.content?.length > 100 && '...'}
        </p>

        {/* 메타 정보: 카테고리, 태그, 작성일 */}
        <div className="flex flex-wrap items-center gap-2 text-xs text-gray-500">
          {/* 카테고리 뱃지 */}
          {post.categoryName && (
            <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded">
              {post.categoryName}
            </span>
          )}
          {/* 태그 뱃지들 */}
          {post.tagNames?.map((tag) => (
            <span key={tag} className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded">
              #{tag}
            </span>
          ))}
          {/* 작성일 (ISO 날짜 문자열에서 날짜 부분만 추출) */}
          <span className="ml-auto">{post.createdAt?.substring(0, 10)}</span>
        </div>
      </div>
    </Link>
  )
}

export default PostCard
