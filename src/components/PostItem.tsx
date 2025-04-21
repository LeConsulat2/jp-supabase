import { Link } from 'react-router';
import { Post } from './PostList';

interface Props {
  post: Post;
}

// 🧱 단일 게시물 카드 컴포넌트
export const PostItem = ({ post }: Props) => {
  return (
    // 🧊 카드 전체: 반투명 배경 + 블러 + 그림자 + hover 확대 효과
    <div className="w-full max-w-xl mx-auto bg-white/10 backdrop-blur-lg rounded-2xl overflow-hidden shadow-lg transition-transform duration-300 hover:scale-[1.015] hover:shadow-2xl">
      {/* 🔗 카드 클릭 시 상세 페이지로 이동 */}
      <Link to={`/post/${post.id}`} className="block">
        {/* 🖼️ 이미지 배너: 상단 고정 높이 + 오버플로우 숨김 */}
        <div className="h-64 overflow-hidden">
          <img
            src={post.image_url}
            alt={post.title}
            className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
          />
          {/* object-cover: 이미지가 박스 채움 / hover 시 부드럽게 확대 */}
        </div>

        {/* 📋 텍스트 영역: 패딩 + 간격 + 타이틀/날짜/내용 */}
        <div className="p-5 space-y-3">
          {/* 🔠 타이틀 + 날짜 (양쪽 정렬) */}
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold text-white">{post.title}</h3>
            <span className="text-sm text-white/60">
              {new Date(post.created_at).toLocaleDateString()}
            </span>
          </div>

          {/* 📝 게시물 요약: 3줄까지만 보여주기 (line-clamp-3) */}
          <p className="text-sm text-white/80 line-clamp-3">{post.content}</p>
        </div>
      </Link>
    </div>
  );
};
