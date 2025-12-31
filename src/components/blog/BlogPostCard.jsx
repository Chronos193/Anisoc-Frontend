import { useNavigate } from "react-router-dom";

const BlogPostCard = ({ post }) => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(`/blog/${post.id}`)}
      className="text-left bg-zinc-900 rounded-2xl p-6 hover:scale-[1.02] transition shadow"
    >
      <h2 className="text-xl font-semibold text-orange-300">
        {post.title}
      </h2>

      <div className="text-sm text-zinc-400 mt-1">
        By {post.author_username} •{" "}
        {new Date(post.created_at).toLocaleDateString()}
      </div>

      <p className="text-zinc-300 mt-3 line-clamp-3">
        {post.content}
      </p>
    </button>
  );
};

export default BlogPostCard;
