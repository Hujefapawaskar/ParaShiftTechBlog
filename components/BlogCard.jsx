import { memo } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

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

const BlogCard = ({ post }) => {
  const { id, title } = post;
  const theme = CARD_THEMES[id % CARD_THEMES.length];
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      whileHover={{ y: -8, scale: 1.015 }}
      
      transition={{ type: "spring", stiffness: 210, damping: 20 }}
      className="group relative overflow-hidden rounded-2xl border border-slate-200/35 bg-slate-900/20 shadow-md shadow-black/40 ring-1 ring-white/20 backdrop-blur-2xl transition-all hover:shadow-2xl hover:shadow-violet-900/40"
    >
      <div className={`pointer-events-none absolute -left-10 -top-10 h-40 w-40 rounded-full blur-3xl ${theme.glow}`} />
      <div className="pointer-events-none absolute inset-0 bg-white/15 backdrop-blur-2xl" />
      <div className={`pointer-events-none absolute inset-0 bg-linear-to-br ${theme.tint}`} />
      <div className="relative overflow-hidden">
        <img
          src={`https://picsum.photos/600/400?random=${id}`}
          alt={title}
          loading="lazy"
          decoding="async"
          className="h-52 w-full object-cover transition duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/75 via-black/20 to-transparent" />
        <span className="absolute left-3 top-3 rounded-full border border-slate-500/30 bg-slate-900/80 px-2.5 py-1 text-xs font-semibold text-slate-100 shadow-sm">
          Blog #{id}
        </span>
      </div>
      <div className="relative z-10 p-5">
        <h2 className="line-clamp-2 bg-linear-to-r from-slate-100 to-indigo-300 bg-clip-text text-lg font-bold leading-snug text-transparent">
          {title}
        </h2>
        <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-slate-300">
          {post.body}
        </p>
        <Link
          to={`/blogs/${id}`}
          className={`mt-4 inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-sm font-semibold transition hover:text-neutral-200 ${theme.button}`}
        >
          Read More →
        </Link>
      </div>
    </motion.div>
  );
};

export default memo(BlogCard);