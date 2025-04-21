// 📦 React Query의 useQuery 훅 가져오기
import { useQuery } from '@tanstack/react-query';
// 🧱 단일 포스트 표시 컴포넌트
import { PostItem } from './PostItem';
// 🔌 Supabase 클라이언트
import { supabase } from '../supabase-client';

// 🧾 Post 타입 정의
export interface Post {
  id: number;
  title: string;
  content: string;
  image_url: string;
  created_at: string;
}

// 📥 Supabase에서 posts 가져오는 async 함수
const fetchPosts = async (): Promise<Post[]> => {
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .order('created_at', { ascending: false }); // 최신 글 먼저

  if (error) throw new Error(error.message);
  return data as Post[]; // 타입 보장
};

// 📜 글 리스트 렌더링 컴포넌트
export const PostList = () => {
  // 🔄 useQuery로 posts 불러오기 (캐싱 자동됨)
  const { data, error, isLoading } = useQuery<Post[], Error>({
    queryKey: ['posts'], // 캐시 키
    queryFn: fetchPosts, // 불러올 함수
  });

  // 🔄 로딩 중
  if (isLoading)
    return <div className="text-center text-white py-10">Loading Posts...</div>;

  // ❌ 에러 발생 시
  if (error) {
    return (
      <div className="text-red-300 text-center py-10">
        Error: {error.message}
      </div>
    );
  }

  // ✅ 정상 렌더링
  return (
    // 🧱 전체 리스트 감싸는 div (추후 grid로 바꾸기 가능)
    <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 px-4 py-12">
      {data?.map((post, key) => (
        <PostItem post={post} key={key} />
      ))}
    </div>
  );
};
