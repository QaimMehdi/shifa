import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const Navbar = ({ onTryNow }: { onTryNow?: () => void }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="fixed top-4 inset-x-0 mx-auto z-50 w-[95%] max-w-5xl"
    >
      <nav className="nav-glass rounded-full px-8 py-4 flex items-center justify-between relative">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2">
          <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
            <circle cx="16" cy="16" r="14" fill="hsl(var(--primary))" opacity="0.15" />
            <path d="M16 8v16M8 16h16" stroke="hsl(var(--primary))" strokeWidth="3" strokeLinecap="round" />
          </svg>
          <span className="font-heading font-bold text-xl text-foreground">Shifa</span>
        </a>

        {/* Desktop Nav - Centered */}
        <div className="hidden md:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
          <button onClick={onTryNow} className="text-sm text-foreground hover:text-primary transition-colors font-body relative">
            AI<span className="absolute -top-1.5 right--1 text-[7px] leading-none" style={{ color: "hsl(45, 100%, 50%)" }}>✦</span>
          </button>
          <button onClick={() => navigate("/nearby-care")} className="text-sm text-foreground hover:text-primary transition-colors font-body">Nearby Care</button>
          <a href="#features" className="text-sm text-foreground hover:text-primary transition-colors font-body">Features</a>
          <a href="#about" className="text-sm text-foreground hover:text-primary transition-colors font-body">About</a>
        </div>

        {/* CTA */}
        <button onClick={() => navigate("/signup")} className="hidden md:block btn-nav">Get Started</button>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-foreground"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mt-2 nav-glass rounded-2xl p-6 flex flex-col gap-4 md:hidden"
          >
            <button onClick={() => { onTryNow?.(); setMobileOpen(false); }} className="text-sm text-muted-foreground hover:text-foreground transition-colors relative inline-flex">AI<span className="absolute -top-1.5 -right-1 text-[7px] leading-none" style={{ color: "hsl(45, 100%, 50%)" }}>✦</span></button>
            <button onClick={() => { navigate("/nearby-care"); setMobileOpen(false); }} className="text-sm text-muted-foreground hover:text-foreground transition-colors">Nearby Care</button>
            <a href="#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Features</a>
            <a href="#about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">About</a>
            <button onClick={() => { navigate("/signup"); setMobileOpen(false); }} className="btn-primary-hero text-sm py-3">Get Started</button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Navbar;