import { CreatePost } from '../components/CreatePost';
import { useNavigate } from 'react-router';

export const CreatePostPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-600 to-sky-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <header className="py-6">
          <div className="flex items-center justify-between">
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
            <div className="w-20"></div> {/* Placeholder for symmetry */}
          </div>
        </header>

        {/* Main Content */}
        <main className="pb-16">
          <div className="mb-8 text-center">
            <h2 className="text-4xl font-bold text-white mb-2">
              Share Your Story
            </h2>
            <p className="text-sky-200 max-w-2xl mx-auto">
              Create a new post to share your ideas, thoughts, and experiences
              with our community
            </p>
          </div>

          <CreatePost />
        </main>
      </div>
    </div>
  );
};
