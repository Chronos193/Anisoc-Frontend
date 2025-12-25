import { useEffect, useState } from "react";
import api from "../../api";

const CommentList = ({ parentType, parentId }) => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchComments = async () => {
      const res = await api.get("/comments/", {
        params: {
          parent_type: parentType,
          parent_id: parentId,
        },
      });
      setComments(res.data);
    };

    fetchComments();
  }, [parentType, parentId]);

  if (comments.length === 0) {
    return <p className="text-gray-400">No comments yet.</p>;
  }

  return (
    <div className="space-y-6">
      {comments.map(comment => (
        <div
          key={comment.id}
          className="p-4 rounded-lg bg-white/5 border border-white/10"
        >
          <p className="text-sm text-gray-400 mb-1">
            {comment.author.username} ·{" "}
            {new Date(comment.created_at).toDateString()}
          </p>
          <p className="text-gray-200 whitespace-pre-wrap">
            {comment.content}
          </p>
        </div>
      ))}
    </div>
  );
};

export default CommentList;
