import { CreatePost } from '../components/CreatePost';
import { useNavigate } from 'react-router';

export const CreatePostPage = () => {
  const navigate = useNavigate();

  return (
    // 🌌 전체 배경: 파란 계열 그라디언트 + 화면 꽉 채움
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-600 to-sky-400">
      {/* 📦 콘텐츠 중앙 정렬 + 반응형 패딩 */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 🔼 헤더 영역 (상단 Back 버튼) */}
        <header className="py-6">
          <div className="flex items-center justify-between">
            {/* ⬅️ 뒤로가기 버튼 */}
            <button
              onClick={() => navigate(-1)}
              className="flex items-center text-sky-100 hover:text-white transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                  clipRule="evenodd"
                />
              </svg>
              Back
            </button>

            {/* ↔️ 오른쪽 공간 맞추기 위한 빈 영역 (정렬용) */}
            <div className="w-20"></div>
          </div>
        </header>

        {/* 🧠 메인 콘텐츠 */}
        <main className="pb-16">
          {/* 📝 타이틀 + 설명 */}
          <div className="mb-8 text-center">
            <h2 className="text-4xl font-bold text-white mb-2">
              Share Your Story
            </h2>
            <p className="text-sky-200 max-w-2xl mx-auto">
              Create a new post to share your ideas, thoughts, and experiences
              with our community
            </p>
          </div>

          {/* ✅ 실제 CreatePost 컴포넌트 삽입 */}
          <CreatePost />
        </main>
      </div>
    </div>
  );
};
