const BlogPostContent = ({ post }) => {
  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold text-orange-400">
        {post.title}
      </h1>

      <div className="text-sm text-zinc-400">
        By {post.author_username} •{" "}
        {new Date(post.created_at).toLocaleDateString()}
      </div>

      <div className="whitespace-pre-wrap leading-relaxed text-zinc-200">
        {post.content}
      </div>
    </div>
  );
};

export default BlogPostContent;
