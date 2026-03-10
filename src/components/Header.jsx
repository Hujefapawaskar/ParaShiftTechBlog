import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 flex items-center justify-between bg-white/60 px-4 py-4 backdrop-blur-xl sm:px-8 lg:px-12 border-b border-gray-200 shadow-sm">
      <div className="flex items-center gap-6">
        {/* Hamburger */}
        <button className="flex flex-col gap-[5px] p-2 transition hover:opacity-75">
          <span className="block h-[2px] w-6 bg-black"></span>
          <span className="block h-[2px] w-6 bg-black"></span>
        </button>
        {/* Logo Text */}
        <Link to="/" className="text-xl font-bold tracking-tight text-black flex items-center gap-2">
           <div className="w-8 h-8 rounded bg-linear-to-br from-[#eb5c37] to-[#e43333] flex items-center justify-center">
              <span className="text-white text-sm font-bold">P</span>
           </div>
           ParaShift
        </Link>
      </div>

      <nav className="hidden items-center gap-8 md:flex">
        <a href="#" className="text-[15px] font-semibold tracking-wide text-black hover:opacity-70 transition">Who We Are</a>
        <a href="#" className="text-[15px] font-semibold tracking-wide text-black hover:opacity-70 transition flex items-center gap-1">
          What We Do
          <svg className="w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
        </a>
        <a href="#" className="text-[15px] font-semibold tracking-wide text-black hover:opacity-70 transition">Work</a>
        <a href="#" className="text-[15px] font-semibold tracking-wide text-black hover:opacity-70 transition">Join Us</a>
        <Link to="/blogs" className="text-[15px] font-semibold tracking-wide text-[#e43333] transition">Blog</Link>
      </nav>

      <div className="flex items-center">
        <button className="hidden sm:block rounded-full bg-black px-6 py-2.5 text-[14px] font-semibold text-white transition hover:bg-gray-800 shadow-md">
          Let's Connect
        </button>
      </div>
    </header>
  );
};

export default Header;
