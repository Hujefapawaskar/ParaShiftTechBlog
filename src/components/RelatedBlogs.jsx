import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { getPosts } from "../API/PostApi";

const RelatedBlogs = ({ currentPostId, currentUserId }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    const fetchPosts = async () => {
      try {
        const res = await getPosts();
        if (mounted) {
          setPosts(res.data || []);
        }
      } catch (error) {
        console.error(error);
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    fetchPosts();

    return () => {
      mounted = false;
    };
  }, []);

  const relatedPosts = useMemo(() => {
    if (!posts.length) return [];

    const excludeCurrent = posts.filter((post) => post.id !== currentPostId);
    const sameAuthor = currentUserId
      ? excludeCurrent.filter((post) => post.userId === currentUserId)
      : [];

    const source = sameAuthor.length ? sameAuthor : excludeCurrent;
    return source.slice(0, 3);
  }, [posts, currentPostId, currentUserId]);

  if (loading) {
     return (
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {Array(3)
            .fill()
            .map((_, index) => (
              <div
                key={index}
                className="overflow-hidden rounded-2xl bg-gray-50 border border-gray-100 p-5 shadow-xs"
              >
                <div className="space-y-4">
                  <div className="h-4 w-2/3 animate-pulse rounded bg-gray-200" />
                  <div className="h-3 w-full animate-pulse rounded bg-gray-200" />
                  <div className="h-3 w-4/5 animate-pulse rounded bg-gray-200" />
                </div>
              </div>
            ))}
        </div>
      );
  }

  if (!relatedPosts.length) return null;

  return (
    <section className="mt-12">
      <h2 className="text-3xl font-extrabold text-black mb-3">
        Related Blogs
      </h2>
      <p className="text-[17px] text-gray-500 mb-8">You might also like these reads.</p>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        {relatedPosts.map((item, index) => (
          <motion.article
            key={item.id}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ delay: index * 0.1, duration: 0.4 }}
            className="group flex flex-col gap-4 cursor-pointer relative p-4 border border-gray-200/60 rounded-3xl bg-white hover:border-gray-300 transition-colors"
          >
             <div className="relative overflow-hidden rounded-xl w-full aspect-[16/10] bg-gray-100">
               <img
                  src={`https://picsum.photos/600/400?random=${item.id}`}
                  alt={item.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
               />
               <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300" />
               <div className="absolute inset-0 flex items-start justify-end p-3 pointer-events-none overflow-hidden z-10">
                   <div className="w-10 h-10 rounded-full bg-[#e43333] shadow-md flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-75 group-hover:scale-100 pointer-events-auto overflow-hidden">
                       <svg className="w-4 h-4 transform translate-y-5 -translate-x-5 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all duration-500 ease-out delay-[50ms]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                       </svg>
                   </div>
               </div>
             </div>

             <div className="flex flex-col flex-1 px-1">
                 <h3 className="text-[18px] font-bold leading-snug text-black group-hover:text-[#e43333] transition-colors line-clamp-2 mb-2">
                   {item.title}
                 </h3>
                 <p className="text-[14px] leading-relaxed text-gray-500 line-clamp-2 mb-4 flex-1">
                    {item.body}
                 </p>
             </div>

            <Link to={`/blogs/${item.id}`} className="absolute inset-0 z-10">
               <span className="sr-only">Read more about {item.title}</span>
            </Link>
          </motion.article>
        ))}
      </div>
    </section>
  );
};

export default RelatedBlogs;
