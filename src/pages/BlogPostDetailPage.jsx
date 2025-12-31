import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api";
import BlogPostContent from "../components/blog/BlogPostContent";
import CommentList from "../components/blog/CommentList";
import CommentForm from "../components/blog/CommentForm";

const BlogPostDetailPage = () => {
  const { id } = useParams();

  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    api.get(`/blog-posts/${id}/`).then(res => setPost(res.data));
    api.get("/auth/me/")
      .then(res => setUser(res.data))
      .catch(() => setUser(null));
  }, [id]);

    useEffect(() => {
    api.get("/comments/", {
        params: {
        parent_type: "blog",
        parent_id: id,
        },
    }).then(res => setComments(res.data));
    }, [id]);


  if (!post) return null;

  return (
    <div className="min-h-screen bg-black text-white px-6 py-20">
      <div className="max-w-3xl mx-auto space-y-10">

        <BlogPostContent post={post} />

        <div className="border-t border-white/10 pt-8 space-y-6">
          <h2 className="text-xl font-semibold text-orange-400">
            Discussion
          </h2>

          <CommentList comments={comments} />

          {user ? (
            <CommentForm
              blogPostId={id}
              onNewComment={(c) =>
                setComments(prev => [c, ...prev])
              }
            />
          ) : (
            <p className="text-zinc-400 text-sm">
              Login to join the discussion.
            </p>
          )}
        </div>

      </div>
    </div>
  );
};

export default BlogPostDetailPage;
