import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/blogs", { replace: true });
    }, 5000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="mx-auto flex min-h-[60vh] w-full max-w-3xl flex-col items-center justify-center px-4 text-center">
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-violet-300">404</p>
      <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-100 sm:text-4xl">
        Page not found
      </h1>
      <p className="mt-3 max-w-md text-sm text-slate-300 sm:text-base">
        The page you’re looking for doesn’t exist. Redirecting you to the main page...
      </p>
      <Link
        to="/blogs"
        className="mt-6 rounded-full border border-violet-300/40 bg-violet-500/25 px-5 py-2 text-sm font-semibold text-violet-100 transition hover:bg-violet-700"
      >
        Go to Main Page
      </Link>
    </div>
  );
};

export default NotFound;
