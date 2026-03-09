import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import LogoTicker from "./LogoTicker";

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <section className="gradient-hero pt-32 pb-8 md:pt-40 md:pb-12 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.05 }}
          className="text-5xl md:text-7xl font-extrabold tracking-tight text-foreground leading-[1.1] font-heading"
        >
          AI-Powered Smart{" "}
          <br className="hidden md:block" />
          Healthcare Platform
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.12 }}
          className="mt-6 text-lg md:text-xl text-muted-foreground max-w-xl mx-auto font-body"
        >
          Intelligent symptom analysis, drug safety checks, and emergency guidance — all powered by AI. Your health companion starts here.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.18 }}
          className="mt-10"
        >
          <button onClick={() => navigate("/signup")} className="btn-primary-hero">Get Started Free</button>
        </motion.div>
      </div>

      <div className="mt-12">
        <LogoTicker />
      </div>
    </section>
  );
};

export default HeroSection;
