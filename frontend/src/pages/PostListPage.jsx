import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { fetchPosts } from '../api/postApi'
import PostCard from '../components/PostCard'
import SearchBar from '../components/SearchBar'
import Pagination from '../components/Pagination'

// PostListPage: 글 목록 페이지 (메인 페이지)
// URL 쿼리 파라미터로 검색어, 카테고리, 페이지를 관리
function PostListPage() {
  // useSearchParams: URL 쿼리스트링(?keyword=xxx&page=0)을 읽고 쓰는 훅
  const [searchParams, setSearchParams] = useSearchParams()

  // 글 목록 데이터
  const [posts, setPosts] = useState([])
  // 전체 페이지 수
  const [totalPages, setTotalPages] = useState(0)
  // 로딩 상태
  const [loading, setLoading] = useState(true)

  // URL에서 현재 검색 조건 읽기
  const keyword = searchParams.get('keyword') || ''
  const category = searchParams.get('category') || ''
  const page = Number(searchParams.get('page') || '0')

  // 검색 조건(keyword, category, page)이 변경될 때마다 API 호출
  useEffect(() => {
    setLoading(true)
    fetchPosts({ keyword, category, page })
      .then((data) => {
        // Spring Data JPA의 Page 응답: { content: [...], totalPages: N, ... }
        setPosts(data.content)
        setTotalPages(data.totalPages)
      })
      .catch(() => setPosts([]))
      .finally(() => setLoading(false))
  }, [keyword, category, page]) // 의존성 배열: 이 값들이 변하면 재실행

  // 검색 실행: URL 쿼리스트링을 업데이트하면 위의 useEffect가 다시 실행됨
  const handleSearch = ({ keyword, category }) => {
    const params = {}
    if (keyword) params.keyword = keyword
    if (category) params.category = category
    // 검색하면 첫 페이지(page=0)로 이동
    setSearchParams(params)
  }

  // 페이지 변경
  const handlePageChange = (newPage) => {
    const params = {}
    if (keyword) params.keyword = keyword
    if (category) params.category = category
    if (newPage > 0) params.page = newPage
    setSearchParams(params)
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">글 목록</h1>

      {/* 검색/필터 바 */}
      <SearchBar
        onSearch={handleSearch}
        initialKeyword={keyword}
        initialCategory={category}
      />

      {/* 로딩 중 표시 */}
      {loading && <p className="text-gray-500 text-center py-8">불러오는 중...</p>}

      {/* 글 목록 */}
      {!loading && posts.length === 0 && (
        <p className="text-gray-500 text-center py-8">글이 없습니다.</p>
      )}
      <div className="space-y-3">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>

      {/* 페이지네이션 */}
      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  )
}

export default PostListPage
