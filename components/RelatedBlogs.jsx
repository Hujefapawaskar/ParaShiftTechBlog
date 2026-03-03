import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { getPosts } from "../API/PostApi";

const CARD_THEMES = [
  {
    glow: "bg-fuchsia-400/25",
    tint: "from-fuchsia-500/20 via-violet-500/10 to-cyan-400/20",
    button: "border-fuchsia-300/40 bg-fuchsia-500/25 text-fuchsia-100 hover:bg-fuchsia-700",
  },
  {
    glow: "bg-cyan-400/25",
    tint: "from-cyan-500/20 via-sky-500/10 to-indigo-400/20",
    button: "border-cyan-300/40 bg-cyan-500/25 text-cyan-100 hover:bg-cyan-700",
  },
  {
    glow: "bg-emerald-400/20",
    tint: "from-emerald-500/20 via-teal-500/10 to-lime-400/15",
    button: "border-emerald-300/40 bg-emerald-500/25 text-emerald-100 hover:bg-emerald-700",
  },
  {
    glow: "bg-amber-400/20",
    tint: "from-amber-500/20 via-orange-500/10 to-rose-400/15",
    button: "border-amber-300/40 bg-amber-500/25 text-amber-100 hover:bg-amber-700",
  },
];

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
      <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-3">
        {Array(3)
          .fill()
          .map((_, index) => (
            <div
              key={index}
              className="relative overflow-hidden rounded-2xl border border-slate-200/35 bg-slate-900/20 p-4 shadow-sm shadow-black/30 backdrop-blur-2xl"
            >
              <div className="pointer-events-none absolute inset-0 bg-white/15 backdrop-blur-2xl" />
              <div className="relative z-10 space-y-3">
                <div className="h-4 w-2/3 animate-pulse rounded bg-slate-700" />
                <div className="h-3 w-full animate-pulse rounded bg-slate-700" />
                <div className="h-3 w-4/5 animate-pulse rounded bg-slate-700" />
              </div>
            </div>
          ))}
      </div>
    );
  }

  if (!relatedPosts.length) return null;

  return (
    <section className="relative z-10 mt-12">
      <h2 className="bg-linear-to-r from-slate-100 via-indigo-200 to-fuchsia-300 bg-clip-text text-2xl font-bold text-transparent">
        Related Blogs
      </h2>
      <p className="mt-2 text-sm text-slate-300">You might also like these reads.</p>

      <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-3">
        {relatedPosts.map((item, index) => (
          (() => {
            const theme = CARD_THEMES[item.id % CARD_THEMES.length];
            return (
          <motion.article
            key={item.id}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ delay: index * 0.08, duration: 0.28 }}
            className="group relative overflow-hidden rounded-2xl border border-slate-200/35 bg-slate-900/20 p-4 shadow-sm shadow-black/30 ring-1 ring-white/20 backdrop-blur-2xl"
          >
            <div className={`pointer-events-none absolute -left-8 -top-8 h-28 w-28 rounded-full blur-3xl ${theme.glow}`} />
            <div className="pointer-events-none absolute inset-0 bg-white/15 backdrop-blur-2xl" />
            <div className={`pointer-events-none absolute inset-0 bg-linear-to-br ${theme.tint}`} />
            <div className="relative z-10">
              <p className="inline-flex rounded-full border border-slate-400/30 bg-slate-900/70 px-2.5 py-1 text-xs font-semibold text-slate-100">
                Post #{item.id}
              </p>
              <h3 className="mt-3 line-clamp-2 text-base font-semibold text-slate-100">{item.title}</h3>
              <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-slate-300">{item.body}</p>
              <Link
                to={`/blogs/${item.id}`}
                className={`mt-4 inline-flex items-center rounded-full px-3 py-1.5 text-xs font-semibold transition hover:text-neutral-200 ${theme.button}`}
              >
                Read More →
              </Link>
            </div>
          </motion.article>
            );
          })()
        ))}
      </div>
    </section>
  );
};

export default RelatedBlogs;
