import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api";
import CommentList from "../components/comments/CommentList";
import CommentBox from "../components/comments/CommentBox";

const ChapterReader = () => {
  const { id } = useParams();
  const [chapter, setChapter] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchChapter = async () => {
      try {
        const res = await api.get(`/chapters/${id}/`);
        setChapter(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchChapter();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-400">
        Loading chapter…
      </div>
    );
  }

  if (!chapter) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-400">
        Chapter not found.
      </div>
    );
  }

  return (
    <div className="min-h-screen px-6 py-20 text-white mt-6">
      <div className="max-w-3xl mx-auto">

        {/* Chapter Title */}
        <div className="flex justify-center items-center ">
          <h1 className="text-4xl text-orange-400 mb-6 font-arvo font-extrabold">
            {chapter.title}
          </h1>
        </div>

        {/* Chapter Content */}
        <div
          className="text-gray-200 leading-relaxed whitespace-pre-wrap
                     text-lg mb-20"
        >
          {chapter.content}
        </div>

        {/* Comments */}
        <section>
          <h2 className="text-2xl font-semibold text-blue-400 mb-6">
            Comments
          </h2>

          <CommentBox parentType="chapter" parentId={chapter.id} />

          <CommentList parentType="chapter" parentId={chapter.id} />
        </section>

      </div>
    </div>
  );
};

export default ChapterReader;
