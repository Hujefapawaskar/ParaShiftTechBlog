import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const Footer = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  // Social icon SVGs as simple path data for placeholder purposes
  const socials = [
    { name: "LinkedIn", path: "M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" },
    { name: "Instagram", path: "M12 2c2.717 0 3.056.01 4.122.06 1.065.05 1.79.217 2.428.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.36.465 2.427.048 1.067.06 1.407.06 4.123s-.012 3.057-.06 4.123c-.05 1.065-.218 1.79-.465 2.428a4.883 4.883 0 01-1.153 1.772 4.915 4.915 0 01-1.772 1.153c-.637.247-1.36.416-2.428.465-1.066.048-1.405.06-4.122.06s-3.056-.012-4.123-.06c-1.065-.05-1.79-.218-2.427-.465a4.89 4.89 0 01-1.772-1.153 4.904 4.904 0 01-1.153-1.772c-.248-.637-.416-1.36-.465-2.428C2.013 15.056 2 14.717 2 12s.01-3.056.06-4.122c.05-1.066.217-1.79.465-2.428a4.88 4.88 0 011.153-1.772A4.897 4.897 0 015.45 2.525c.636-.248 1.36-.416 2.428-.465C8.944 2.013 9.283 2 12 2zM12 7a5 5 0 100 10 5 5 0 000-10zm0 8a3 3 0 110-6 3 3 0 010 6zm5.5-8.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" },
    { name: "Twitter", path: "M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" },
    { name: "Facebook", path: "M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" },
    { name: "YouTube", path: "M22.54 6.42a2.78 2.78 0 00-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 00-1.94 2A29 29 0 001 11.75a29 29 0 00.46 5.33A2.78 2.78 0 003.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 001.94-2 29 29 0 00.46-5.25 29 29 0 00-.46-5.33zM9.75 15.02V8.48l6.45 3.27z" }
  ];

  return (
    <footer className="bg-[#050505] text-white px-6 py-12 lg:px-24">
      <div className="max-w-7xl mx-auto flex flex-col pt-8 pb-4">
        
        {/* Top Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-gray-800 pb-12 mb-8 gap-8">
          <nav className="flex flex-wrap gap-x-8 gap-y-4 list-none m-0 p-0 text-[15px] font-medium tracking-wide">
            <Link to="/" className="hover:text-gray-400 transition">Home</Link>
            <a href="#" className="hover:text-gray-400 transition">About</a>
            <a href="#" className="hover:text-gray-400 transition">Work</a>
            <Link to="/blogs" className="text-[#e43333] transition">Blog</Link>
            <a href="#" className="hover:text-gray-400 transition">Join Us</a>
            <a href="#" className="hover:text-gray-400 transition">Contact</a>
          </nav>
          
          <div className="flex gap-4">
             {socials.map((social) => (
                <a key={social.name} href="#" aria-label={social.name} className="w-[42px] h-[42px] rounded-full border border-gray-700 flex items-center justify-center hover:bg-gray-800 hover:border-gray-500 transition group">
                   <svg className="w-[18px] h-[18px] fill-current text-gray-300 group-hover:text-white transition" viewBox="0 0 24 24">
                     <path d={social.path} />
                   </svg>
                </a>
             ))}
          </div>
        </div>

        {/* Expandable Section */}
        <div className="flex flex-col items-center">
             <button 
                onClick={() => setIsExpanded(!isExpanded)}
                className="flex items-center gap-2 text-[14px] uppercase tracking-wider font-semibold text-gray-400 hover:text-white transition"
             >
                 {isExpanded ? 'View less' : 'View more'}
                 <motion.svg 
                    animate={{ rotate: isExpanded ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="w-4 h-4" 
                    fill="none" viewBox="0 0 24 24" stroke="currentColor"
                  >
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                 </motion.svg>
             </button>
             <AnimatePresence>
                 {isExpanded && (
                     <motion.div
                         initial={{ height: 0, opacity: 0 }}
                         animate={{ height: "auto", opacity: 1 }}
                         exit={{ height: 0, opacity: 0 }}
                         transition={{ duration: 0.4, ease: "easeInOut" }}
                         className="overflow-hidden w-full text-center text-gray-400 text-sm mt-8 max-w-2xl mx-auto"
                     >
                         <div className="pb-8 leading-relaxed">
                             <p>ParaShift implies an impactful shift in technology. We provide thoughtful engineering to scale ideas into thriving products. Keep reading, keep learning, and keep building.</p>
                         </div>
                     </motion.div>
                 )}
             </AnimatePresence>
        </div>

        {/* Bottom Bar */}
        <div className="pt-10 mt-6 border-t border-gray-900 flex flex-col sm:flex-row justify-between items-center text-[13px] text-gray-500 font-medium">
           <p>© {new Date().getFullYear()} Parashift Technologies. All Rights Reserved.</p>
           <p className="mt-4 sm:mt-0"><a href="#" className="hover:text-white transition">Privacy Policy</a></p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
