const CommentItem = ({ comment }) => {
  return (
    <div className="bg-zinc-900 rounded-xl p-4">
      <div className="text-sm text-orange-300 font-semibold">
        {comment.author_username}
      </div>

      <div className="text-zinc-300 mt-1 whitespace-pre-wrap">
        {comment.content}
      </div>

      <div className="text-xs text-zinc-500 mt-2">
        {new Date(comment.created_at).toLocaleString()}
      </div>
    </div>
  );
};

export default CommentItem;
