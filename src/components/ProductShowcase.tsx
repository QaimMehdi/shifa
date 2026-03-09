import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import dashboardImg from "@/assets/dashboard-mockup.png";

const ProductShowcase = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 0.3, 0.55, 0.7], ["60%", "20%", "5%", "0%"]);
  const rotate = useTransform(scrollYProgress, [0, 0.3, 0.55, 0.7], [6, 3, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.3, 0.55, 0.7], [0.88, 0.94, 0.98, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.4, 1], [0, 0.6, 1, 1]);

  return (
    <section ref={ref} className="px-4 md:px-8 pb-16 md:pb-24 gradient-hero">
      <div className="max-w-6xl mx-auto">
        {/* Contained blue div with rounded corners */}
        <div
          className="rounded-3xl overflow-hidden pt-16 md:pt-24 px-6 md:px-12"
          style={{
            background:
              "linear-gradient(180deg, hsl(207 100% 55%) 0%, hsl(207 85% 62%) 60%, hsl(210 60% 82%) 100%)",
          }}
        >
          <motion.div
            style={{ y, rotate, scale, opacity }}
            className="rounded-t-2xl overflow-hidden shadow-[0_-10px_60px_-15px_rgba(0,0,0,0.2)] border border-white/20 border-b-0"
          >
            <img
              src={dashboardImg}
              alt="Shifa AI dashboard showing symptom analysis and health insights"
              className="w-full h-auto block"
              loading="eager"
              decoding="async"
              fetchPriority="high"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ProductShowcase;
