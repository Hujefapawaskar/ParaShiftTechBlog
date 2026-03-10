import { memo } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const BlogCard = ({ post }) => {
   const { id, title, body } = post;

   return (
      <motion.div
         initial={{ opacity: 0, y: 20 }}
         whileInView={{ opacity: 1, y: 0 }}
         viewport={{ once: true, amount: 0.25 }}
         whileHover={{ y: -6 }}
         transition={{ duration: 0.4, ease: "easeOut" }}
         className="group flex flex-col gap-5 cursor-pointer relative p-4 border border-gray-200/60 rounded-3xl bg-white hover:border-gray-300 transition-colors"
      >
         {/* Image Container with Hover Overlay */}
         <div className="relative overflow-hidden rounded-2xl w-full aspect-16/10 bg-gray-100">
            <img
               src={`https://picsum.photos/600/400?random=${id}`}
               alt={title}
               loading="lazy"
               decoding="async"
               className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />

            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300" />

            {/* Red circular arrow overlay */}
            <div className="absolute inset-0 flex items-start justify-end p-4 pointer-events-none overflow-hidden z-10 -top-1">
               <div className="w-12 h-12 rounded-full bg-[#e43333] shadow-lg flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-75 group-hover:scale-100 pointer-events-auto overflow-hidden">
                  <svg className="w-5 h-5 transform translate-y-6 -translate-x-6 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all duration-500 ease-out delay-50ms" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                  </svg>
               </div>
            </div>
         </div>

         {/* Content Container */}
         <div className="flex flex-col flex-1 px-1">
            <h2 className="text-[20px] font-bold leading-snug text-[#050505] group-hover:text-[#e43333] transition-colors line-clamp-2 mb-2">
               {title}
            </h2>

            <p className="text-[15px] leading-relaxed text-gray-500 line-clamp-2 mb-6 flex-1">
               {body}
            </p>

            <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100 pb-1">
               <span className="text-[13px] font-semibold tracking-wide text-gray-400 uppercase">
                  Oct 12, 2023
               </span>
               <span className="flex flex-row items-center gap-1.5 text-[13px] font-semibold text-gray-400">
                  <svg className="w-4 h-4 mb-px" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  5 min read
               </span>
            </div>
         </div>

         {/* Make whole card clickable */}
         <Link to={`/blogs/${id}`} className="absolute inset-0 z-10">
            <span className="sr-only">Read more about {title}</span>
         </Link>
      </motion.div>
   );
};

export default memo(BlogCard);