import { useState } from "react";
import api from "../../api";

const CommentForm = ({ blogPostId, onNewComment }) => {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

    const submit = async () => {
    if (!content.trim()) return;

    setLoading(true);
    try {
        const res = await api.post("/comments/", {
        parent_type: "blog",
        parent_id: blogPostId,
        content,
        });

        setContent("");
        onNewComment(res.data);
    } finally {
        setLoading(false);
    }
    };


  return (
    <div className="space-y-3">
      <textarea
        value={content}
        onChange={e => setContent(e.target.value)}
        rows={3}
        placeholder="Write your thoughts..."
        className="w-full bg-black border border-zinc-700 rounded-xl px-4 py-3"
      />

      <button
        onClick={submit}
        disabled={loading}
        className="bg-orange-500 px-6 py-2 rounded-full font-semibold hover:scale-105 transition disabled:opacity-50"
      >
        Post Comment
      </button>
    </div>
  );
};

export default CommentForm;
