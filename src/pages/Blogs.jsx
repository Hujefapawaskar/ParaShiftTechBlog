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
      <div className="mx-auto max-w-xl px-4 py-24 text-center">
        <p className="text-lg font-semibold text-red-600">{error}</p>
        <button
          onClick={getPostData}
          className="mt-4 rounded-lg bg-black px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-gray-800"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[1400px] px-4 py-16 sm:px-8 lg:px-12 bg-white">
      
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="mb-14 flex flex-col md:flex-row md:items-end justify-between gap-6"
      >
        <div className="max-w-2xl">
           <h1 className="text-4xl font-extrabold tracking-tight text-black sm:text-5xl lg:text-5xl mb-4">
             Explore Latest Blogs
           </h1>
           <p className="text-base text-gray-500 sm:text-lg leading-relaxed">
             Fresh reads, practical ideas, and bite-sized learning for your next project.
           </p>
        </div>
        
        <div className="shrink-0 flex items-center md:pb-2">
           <p className="inline-flex rounded-full border border-gray-200 bg-gray-50 px-4 py-1.5 text-sm font-semibold tracking-wide text-gray-700">
             Showing {Math.min(visible, posts.length)} of {posts.length} posts
           </p>
        </div>
      </motion.div>

      {/* Grid */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="grid grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3"
      >
        {visiblePosts.map((post) => (
          <BlogCard key={post.id} post={post} />
        ))}
      </motion.div>

      {/* Load More Button */}
      {visible < posts.length && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mt-20 text-center"
        >
          <button
            onClick={handleLoadMore}
            className="rounded-full bg-white border border-gray-200 px-8 py-3 text-[15px] font-semibold text-black transition hover:border-gray-900 hover:bg-gray-50 shadow-xs"
          >
            Load More Posts
          </button>
        </motion.div>
      )}
    </div>
  );
};

export default Blogs;