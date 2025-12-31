import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

const BlogCreatePage = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isPublic, setIsPublic] = useState(true);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const submit = async () => {
    if (!title.trim() || !content.trim()) return;

    setLoading(true);
    try {
      const res = await api.post("/blog-posts/", {
        title,
        content,
        is_public: isPublic,
      });

      navigate(`/blog/${res.data.id}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white px-6 py-20">
      <div className="max-w-3xl mx-auto space-y-6">

        <h1 className="text-3xl font-bold text-orange-400">
          Write a Blog Post
        </h1>

        <input
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder="Blog title"
          className="w-full bg-black border border-zinc-700 rounded-xl px-4 py-3"
        />

        <textarea
          value={content}
          onChange={e => setContent(e.target.value)}
          rows={10}
          placeholder="Write your blog content..."
          className="w-full bg-black border border-zinc-700 rounded-xl px-4 py-3"
        />

        {/* Public toggle */}
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            checked={isPublic}
            onChange={() => setIsPublic(v => !v)}
          />
          <span className="text-zinc-300">
            Public (visible to everyone)
          </span>
        </div>

        <div className="flex gap-4">
          <button
            onClick={submit}
            disabled={loading}
            className="bg-orange-500 px-6 py-2 rounded-full font-semibold hover:scale-105 transition disabled:opacity-50"
          >
            Publish
          </button>

          <button
            onClick={() => navigate(-1)}
            className="text-zinc-400"
          >
            Cancel
          </button>
        </div>

      </div>
    </div>
  );
};

export default BlogCreatePage;
