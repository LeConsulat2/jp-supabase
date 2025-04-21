import { Link } from 'react-router';
import { Post } from './PostList';

interface Props {
  post: Post;
}

export const PostItem = ({ post }: Props) => {
  return (
    <div className="w-full max-w-xl mx-auto bg-white/10 backdrop-blur-lg rounded-2xl overflow-hidden shadow-lg transition-transform duration-300 hover:scale-[1.015] hover:shadow-2xl">
      <Link to={`/post/${post.id}`} className="block">
        {/* Image Banner */}
        <div className="h-64 overflow-hidden">
          <img
            src={post.image_url}
            alt={post.title}
            className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
          />
        </div>

        {/* Header: Title and Timestamp */}
        <div className="p-5 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold text-white">{post.title}</h3>
            <span className="text-sm text-white/60">
              {new Date(post.created_at).toLocaleDateString()}
            </span>
          </div>
          <p className="text-sm text-white/80 line-clamp-3">{post.content}</p>
        </div>
      </Link>
    </div>
  );
};
