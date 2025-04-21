// src/components/Navbar.tsx
import { useState } from 'react';
import { Link } from 'react-router'; // React Router 6.x 사용 시
import { useAuth } from '../context/AuthContext';

export const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { signInWithGitHub, signOut, user } = useAuth();

  const displayName = user?.user_metadata.user_name || user?.email;

  const handleClick = (page: string) => {
    console.log(`Link clicked: ${page}`);
    setMenuOpen(false);
  };

  return (
    // 🧊 상단 고정 네비게이션 바 (반투명 배경 + 다크모드 지원)
    <nav className="sticky top-0 z-50 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm border-b border-gray-100 dark:border-gray-800">
      {/* 📦 네비게이션 전체 레이아웃 (중앙 정렬 + 반응형 패딩) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 🔄 내부 요소 정렬: 양쪽 끝 정렬 + 수직 가운데 */}
        <div className="flex justify-between h-16 items-center">
          {/* 🔖 로고 영역 */}
          <div className="flex items-center">
            <Link
              to="/"
              className="text-xl font-semibold text-gray-800 dark:text-gray-100"
              onClick={() => handleClick('home')}
            >
              We-Create
            </Link>
          </div>

          {/* 🖥️ 데스크탑 네비 메뉴 */}
          <div className="hidden md:flex items-center space-x-6">
            {/* 각 메뉴 항목 */}
            <Link
              to="/"
              onClick={() => handleClick('home')}
              className="text-sm text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              Home
            </Link>
            <Link
              to="/create"
              onClick={() => handleClick('create')}
              className="text-sm text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              Create Post
            </Link>
            <Link
              to="/communities"
              onClick={() => handleClick('communities')}
              className="text-sm text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              Communities
            </Link>
            <Link
              to="/community/create"
              onClick={() => handleClick('community/create')}
              className="text-sm text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              Create Community
            </Link>

            {/* 🔐 로그인 상태에 따른 UI */}
            {user ? (
              <div className="flex items-center space-x-3">
                {user.user_metadata.avatar_url && (
                  <div className="relative">
                    <img
                      src={user.user_metadata.avatar_url}
                      alt="avatar"
                      className="w-7 h-7 rounded-full ring-1 ring-gray-200 dark:ring-gray-700"
                    />
                    {/* 🟢 온라인 상태 표시 */}
                    <div className="absolute -bottom-0.5 -right-0.5 w-2 h-2 bg-green-400 rounded-full ring-1 ring-white dark:ring-gray-900"></div>
                  </div>
                )}
                <span className="text-sm text-gray-600 dark:text-gray-300">
                  {displayName}
                </span>
                <button
                  onClick={signOut}
                  className="text-sm px-3 py-1.5 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              // 🔘 GitHub 로그인 버튼
              <button
                onClick={signInWithGitHub}
                className="text-sm px-3 py-1.5 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors flex items-center space-x-1.5"
              >
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="...GitHub SVG..." />
                </svg>
                <span>Sign in</span>
              </button>
            )}
          </div>

          {/* 📱 모바일 메뉴 토글 버튼 */}
          <div className="md:hidden">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              {menuOpen ? (
                <svg
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  {/* X 아이콘 */}
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  {/* ☰ 햄버거 메뉴 아이콘 */}
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* 📱 모바일 메뉴 리스트 */}
      <div
        className={`md:hidden transition-all duration-200 ease-in-out ${
          menuOpen
            ? 'max-h-screen opacity-100'
            : 'max-h-0 opacity-0 overflow-hidden'
        }`}
      >
        <div className="px-4 pt-2 pb-3 space-y-1 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm border-b border-gray-100 dark:border-gray-800">
          {/* 각 메뉴 항목 - 모바일 */}
          <Link
            to="/"
            onClick={() => handleClick('home')}
            className="block px-3 py-2 text-sm text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            Home
          </Link>
          <Link
            to="/create"
            onClick={() => handleClick('create')}
            className="block px-3 py-2 text-sm text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            Create Post
          </Link>
          <Link
            to="/communities"
            onClick={() => handleClick('communities')}
            className="block px-3 py-2 text-sm text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            Communities
          </Link>
          <Link
            to="/community/create"
            onClick={() => handleClick('community/create')}
            className="block px-3 py-2 text-sm text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            Create Community
          </Link>

          {/* 🔐 모바일 로그인 영역 */}
          <div className="pt-3 border-t border-gray-100 dark:border-gray-800">
            {user ? (
              <div className="flex items-center space-x-3 px-3 py-2">
                {user.user_metadata.avatar_url && (
                  <img
                    src={user.user_metadata.avatar_url}
                    alt="avatar"
                    className="w-7 h-7 rounded-full ring-1 ring-gray-200 dark:ring-gray-700"
                  />
                )}
                <span className="text-sm text-gray-600 dark:text-gray-300">
                  {displayName}
                </span>
                <button
                  onClick={signOut}
                  className="ml-auto text-sm text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <button
                onClick={signInWithGitHub}
                className="w-full flex items-center justify-center space-x-1.5 px-3 py-2 text-sm text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="...GitHub SVG..." />
                </svg>
                <span>Sign in with GitHub</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
