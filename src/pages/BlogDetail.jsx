import { Link, useParams } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { getPostById } from "../API/PostApi";
import RelatedBlogs from "../components/RelatedBlogs";

const BlogDetail = () => {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id, title, body, userId } = post || {};

  const fetchPost = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await getPostById(slug);
      setPost(res.data || null);
    } catch (err) {
      setError("Unable to load this blog post");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [slug]);

  useEffect(() => {
    fetchPost();
  }, [fetchPost]);

  if (loading) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-16 sm:px-8">
        <div className="overflow-hidden rounded-2xl bg-white shadow-xs border border-gray-100">
          <div className="h-[400px] w-full animate-pulse bg-gray-100" />
          <div className="space-y-6 p-8">
            <div className="h-10 w-3/5 animate-pulse rounded bg-gray-200" />
            <div className="space-y-3 mt-8">
               <div className="h-4 w-full animate-pulse rounded bg-gray-200" />
               <div className="h-4 w-5/6 animate-pulse rounded bg-gray-200" />
               <div className="h-4 w-4/5 animate-pulse rounded bg-gray-200" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mx-auto max-w-xl px-4 py-24 text-center">
        <p className="text-lg font-semibold text-red-600">{error}</p>
        <button
          onClick={fetchPost}
          className="mt-6 rounded-full bg-black px-8 py-3 text-[15px] font-semibold text-white transition hover:bg-gray-800 shadow-sm"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (!post) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="mx-auto max-w-[1200px] px-4 py-12 sm:px-8 lg:px-12 bg-white"
    >
      <Link
        to="/blogs"
        className="mb-8 inline-flex items-center text-sm font-semibold tracking-wide text-gray-500 hover:text-black transition-colors"
      >
        <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
        Back to Blogs
      </Link>

      <div className="overflow-hidden rounded-[2rem] w-full aspect-[21/9] bg-gray-100 mb-12 shadow-sm border border-gray-100">
        <img
          src={`https://picsum.photos/1200/500?random=${id}`}
          alt={title}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="max-w-[800px] mx-auto">
          <div className="flex items-center gap-4 mb-6">
             <span className="text-[14px] font-bold tracking-wider text-[#e43333] uppercase">
                Technology
             </span>
             <span className="w-1.5 h-1.5 rounded-full bg-gray-300"></span>
             <span className="text-[14px] font-medium text-gray-500">
                Oct 12, 2023
             </span>
             <span className="w-1.5 h-1.5 rounded-full bg-gray-300"></span>
             <span className="text-[14px] font-medium text-gray-500">
                By Unknown
             </span>
          </div>

          <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-black sm:text-5xl mb-8">
            {title}
          </h1>
          
          <div className="prose prose-lg prose-gray max-w-none">
             <p className="text-[19px] leading-relaxed text-gray-700">{body}</p>
             <p className="text-[19px] leading-relaxed text-gray-700 mt-6 md:mt-8">{body}</p>
          </div>
      </div>

      <div className="mt-24 pt-16 border-t border-gray-100">
         <RelatedBlogs currentPostId={id} currentUserId={userId} />
      </div>
    </motion.div>
  );
};

export default BlogDetail;