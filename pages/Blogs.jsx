import { useCallback, useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import BlogCard from "../components/BlogCard";
import SkeletonCard from "../components/SkeletonCard";
import { getPosts } from "../API/PostApi";

const POSTS_PER_PAGE = 6;

const Blogs = () => {
  const [posts, setPosts] = useState([]);
  const [visible, setVisible] = useState(POSTS_PER_PAGE);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getPostData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await getPosts();
      setPosts(res.data || []);
      setVisible(POSTS_PER_PAGE);
    } catch (err) {
      setError("Unable to load posts");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getPostData();
  }, [getPostData]);

  const visiblePosts = useMemo(() => posts.slice(0, visible), [posts, visible]);
  const handleLoadMore = useCallback(() => {
    setVisible((prev) => prev + POSTS_PER_PAGE);
  }, []);

  if (loading) return <SkeletonCard count={6} />;
  if (error) {
    return (
      <div className="mx-auto max-w-xl px-4 py-16 text-center">
        <p className="text-lg font-semibold text-rose-300">{error}</p>
        <button
          onClick={getPostData}
          className="mt-4 rounded-lg bg-slate-100 px-5 py-2.5 text-sm font-semibold text-slate-900 transition hover:bg-white"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="relative mx-auto max-w-7xl overflow-hidden px-4 py-8 sm:px-6 lg:px-8">
      <div className="pointer-events-none absolute -left-24 top-12 h-56 w-56 rounded-full bg-fuchsia-500/20 blur-3xl" />
      <div className="pointer-events-none absolute -right-20 top-2 h-52 w-52 rounded-full bg-cyan-500/20 blur-3xl" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        className="relative mb-8 rounded-3xl border border-slate-700/60 bg-linear-to-br from-slate-900/80 via-slate-900/70 to-indigo-950/65 p-6 shadow-lg shadow-black/30 backdrop-blur-md"
      >
        <h1 className="bg-linear-to-r from-slate-100 via-violet-200 to-fuchsia-300 bg-clip-text text-2xl font-extrabold tracking-tight text-transparent sm:text-3xl">
          Explore Latest Blogs
        </h1>
        <p className="mt-2 text-sm text-slate-300 sm:text-base">
          Fresh reads, practical ideas, and bite-sized learning for your next project.
        </p>
        <p className="mt-3 inline-flex rounded-full border border-violet-400/30 bg-violet-500/20 px-3 py-1 text-xs font-semibold tracking-wide text-violet-100 sm:text-sm">
          Showing {Math.min(visible, posts.length)} of {posts.length} posts
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.15, duration: 0.4 }}
        className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3"
      >
        {visiblePosts.map((post) => (
          <BlogCard key={post.id} post={post} />
        ))}
      </motion.div>

      {visible < posts.length && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="mt-10 text-center"
        >
          <button
            onClick={handleLoadMore}
            className="hover-gradient-lr rounded-full px-7 py-2.5 text-sm font-semibold text-white shadow-lg shadow-violet-900/50 hover:scale-[1.03] hover:brightness-110"
          >
            Load More
          </button>
        </motion.div>
      )}
    </div>
  );
};

export default Blogs;