import { useState } from "react";
import api from "../../api";

const CommentBox = ({ parentType, parentId }) => {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const submitComment = async () => {
    if (!content.trim()) return;

    try {
      setLoading(true);
      await api.post("/comments/", {
        content,
        parent_type: parentType,
        parent_id: parentId,
      });
      setContent("");
      window.location.reload(); // simple V1 refresh
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mb-10">
      <textarea
        value={content}
        onChange={e => setContent(e.target.value)}
        placeholder="Write a comment..."
        rows={4}
        className="w-full p-4 rounded-lg bg-black/40
                   border border-white/10 text-white
                   focus:outline-none focus:border-orange-400"
      />

      <button
        onClick={submitComment}
        disabled={loading}
        className="mt-3 px-6 py-2 rounded-lg bg-orange-500
                   text-black font-semibold hover:bg-orange-400
                   transition disabled:opacity-50"
      >
        Post Comment
      </button>
    </div>
  );
};

export default CommentBox;
