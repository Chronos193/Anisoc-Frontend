import CommentItem from "./CommentItem";

const CommentList = ({ comments }) => {
  if (comments.length === 0) {
    return (
      <p className="text-zinc-500 text-sm">
        No comments yet. Be the first to speak.
      </p>
    );
  }

  return (
    <div className="space-y-4">
      {comments.map(c => (
        <CommentItem key={c.id} comment={c} />
      ))}
    </div>
  );
};

export default CommentList;
