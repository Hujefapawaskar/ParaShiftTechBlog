import { AnimatePresence, motion } from "framer-motion";
import { useLocation } from "react-router-dom";
import MoveToTopButton from "./MoveToTopButton";
import Header from "./Header";
import Footer from "./Footer";

const Layout = ({ children }) => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <>
        <Header />
        <motion.main
          key={location.pathname}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="min-h-screen"
        >
          {children}
        </motion.main>
        <Footer />
        <MoveToTopButton />
      </>
    </AnimatePresence>
  );
};

export default Layout;