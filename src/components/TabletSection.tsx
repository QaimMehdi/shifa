import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import tabletImg from "@/assets/tablet-mockup.png";

const TabletSection = () => {
  const navigate = useNavigate();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end end"],
  });

  // Tablet rises from below as user scrolls, then settles at bottom
  const y = useTransform(scrollYProgress, [0, 0.4, 0.7, 1], ["80%", "30%", "5%", "0%"]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.85, 0.95, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.5], [0, 0.6, 1]);

  return (
    <section ref={ref} id="about" className="relative gradient-cta">
      {/* Text content */}
      <div className="py-16 md:py-32 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="section-heading mb-4"
          >
            Your AI health companion
            <br />
            starts here
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="section-subheading mb-8"
          >
            Preventive care, emergency guidance, and drug safety — all in one platform. Try Shifa today.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <button onClick={() => navigate("/signup")} className="btn-primary-hero">Get Started Free</button>
          </motion.div>
        </div>
      </div>

      {/* Sticky tablet container with matching gradient backdrop */}
      <div className="h-[80vh] relative">
        <div className="sticky bottom-0 h-[80vh] flex items-end justify-center overflow-hidden">
          <motion.div
            style={{ y, scale, opacity }}
            className="w-full max-w-4xl mx-auto px-4 relative"
          >
            {/* Gradient backdrop matching the original photo's blue-white tones */}
            <div
              className="absolute inset-0 rounded-t-3xl -z-10"
              style={{
                background: "radial-gradient(ellipse at center 30%, hsl(207 60% 85%) 0%, hsl(210 45% 92%) 40%, hsl(214 40% 95%) 70%, transparent 100%)",
              }}
            />
            <img
              src={tabletImg}
              alt="Shifa AI platform displayed on a tablet device"
              className="w-full rounded-t-3xl relative z-10"
              loading="lazy"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default TabletSection;