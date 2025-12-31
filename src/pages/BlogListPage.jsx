import { useEffect, useState } from "react";
import api from "../api";
import BlogPostCard from "../components/blog/BlogPostCard";
import { useNavigate } from "react-router-dom";

const BlogListPage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    api.get("/blog-posts/")
      .then(res => setPosts(res.data.results || res.data))
      .finally(() => setLoading(false));

    api.get("/auth/me/")
      .then(res => setUser(res.data))
      .catch(() => setUser(null));
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center ">
        Loading blog posts…
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white px-6 py-20 mt-10">
      <div className="max-w-5xl mx-auto space-y-10">

        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-4xl font-bold text-orange-400">
            Blog
          </h1>

          <button
            onClick={() => {
              if (!user) navigate("/login");
              else navigate("/blog/new");
            }}
            className="px-6 py-2 rounded-full bg-orange-500 font-semibold hover:scale-105 transition"
          >
            Write Blog
          </button>
        </div>

        {posts.length === 0 && (
          <p className="text-zinc-500">
            No blog posts yet.
          </p>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {posts.map(post => (
            <BlogPostCard key={post.id} post={post} />
          ))}
        </div>

      </div>
    </div>
  );
};

export default BlogListPage;
