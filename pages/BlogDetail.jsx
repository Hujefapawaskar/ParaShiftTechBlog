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
      <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-3xl border border-slate-700/60 bg-slate-900/70 shadow-lg shadow-black/30 backdrop-blur-md">
          <div className="h-80 w-full animate-pulse bg-slate-800" />
          <div className="space-y-4 p-6">
            <div className="h-6 w-3/5 animate-pulse rounded bg-slate-700" />
            <div className="h-4 w-full animate-pulse rounded bg-slate-700" />
            <div className="h-4 w-5/6 animate-pulse rounded bg-slate-700" />
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mx-auto max-w-xl px-4 py-16 text-center">
        <p className="text-lg font-semibold text-rose-300">{error}</p>
        <button
          onClick={fetchPost}
          className="mt-4 rounded-full bg-linear-to-r from-indigo-500 to-fuchsia-500 px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-violet-900/50 transition hover:scale-[1.03] hover:brightness-110"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (!post) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="relative mx-auto max-w-5xl overflow-hidden px-4 py-10 sm:px-6 lg:px-8"
    >
      <div className="pointer-events-none absolute -left-20 top-20 h-52 w-52 rounded-full bg-fuchsia-500/20 blur-3xl" />
      <div className="pointer-events-none absolute -right-16 top-4 h-44 w-44 rounded-full bg-cyan-500/20 blur-3xl" />

      <div className="relative rounded-3xl border border-slate-200/35 bg-slate-900/20 p-4 shadow-xl shadow-black/35 ring-1 ring-white/20 backdrop-blur-2xl sm:p-6">
        <div className="pointer-events-none absolute inset-0 rounded-3xl bg-white/15 backdrop-blur-2xl" />
        <div className="relative overflow-hidden rounded-2xl">
          <img
            src={`https://picsum.photos/1200/700?random=${id}`}
            alt={title}
            className="h-72 w-full object-cover sm:h-96"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/70 via-transparent to-transparent" />
          <span className="absolute left-4 top-4 rounded-full border border-slate-500/30 bg-slate-900/80 px-3 py-1 text-xs font-semibold text-slate-100 shadow-sm">
            Post #{id}
          </span>
        </div>

        <h1 className="relative z-10 mt-6 bg-linear-to-r from-slate-100 via-indigo-200 to-fuchsia-300 bg-clip-text text-3xl font-extrabold leading-tight text-transparent sm:text-4xl">
          {title}
        </h1>
        <p className="relative z-10 mt-4 text-base leading-relaxed text-slate-300 sm:text-lg">{body}</p>

        <Link
          to="/blogs"
          className="relative z-10 mt-7 inline-flex items-center rounded-full border border-indigo-400/30 bg-indigo-500/20 px-5 py-2 text-sm font-semibold text-indigo-100 transition hover:bg-indigo-500 hover:text-white"
        >
          ← Back to Blogs
        </Link>
      </div>

      <RelatedBlogs currentPostId={id} currentUserId={userId} />
    </motion.div>
  );
};

export default BlogDetail;