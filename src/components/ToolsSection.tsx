import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import riskDashboardImg from "@/assets/tool-risk-dashboard.png";
import hospitalMapImg from "@/assets/tool-hospital-map.png";

const Tool3DCard = ({
  children,
  index,
}: {
  children: React.ReactNode;
  index: number;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x, y });
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4, delay: index * 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => { setIsHovered(false); setMousePos({ x: 0, y: 0 }); }}
      className="rounded-3xl p-8 pb-0 flex flex-col overflow-hidden cursor-default"
      style={{
        background: "linear-gradient(180deg, hsl(214 40% 95%) 0%, hsl(214 50% 90%) 100%)",
        transform: isHovered
          ? `perspective(800px) rotateY(${mousePos.x * 8}deg) rotateX(${-mousePos.y * 8}deg)`
          : "perspective(800px) rotateY(0deg) rotateX(0deg)",
        transition: isHovered ? "transform 0.1s ease-out" : "transform 0.4s ease-out",
      }}
    >
      {children}
    </motion.div>
  );
};

const ToolsSection = ({ onTryNow }: { onTryNow?: () => void }) => {
  const headingRef = useRef<HTMLDivElement>(null);
  const inView = useInView(headingRef, { once: true, margin: "-100px" });

  return (
    <section className="py-16 md:py-24 px-4 gradient-section">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          ref={headingRef}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="section-heading text-center mb-16"
        >
          Tools that just make sense
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-6">
          <Tool3DCard index={0}>
            <div className="flex items-center justify-center py-6 animate-float">
              <img
                src={riskDashboardImg}
                alt="Health Risk Analytics Dashboard"
                className="w-4/5 h-auto drop-shadow-lg"
                decoding="async"
              />
            </div>
            <h3 className="text-xl md:text-2xl font-bold text-foreground font-heading leading-snug">
              Predictive Health Risk Forecaster
            </h3>
            <p className="text-sm text-muted-foreground font-body mt-2 mb-4 leading-relaxed">
              Track and analyze health metrics over time to predict potential
              risks before they become critical — powered by AI pattern
              recognition.
            </p>
            <button onClick={onTryNow} className="btn-primary-hero text-sm mb-8">Try Now</button>
          </Tool3DCard>

          <Tool3DCard index={1}>
            <div className="flex items-center justify-center py-6 animate-float-delayed">
              <img
                src={hospitalMapImg}
                alt="Nearby Hospitals and Clinics Map"
                className="w-4/5 h-auto drop-shadow-lg"
                decoding="async"
              />
            </div>
            <h3 className="text-xl md:text-2xl font-bold text-foreground font-heading leading-snug">
              Location-Based Healthcare Finder
            </h3>
            <p className="text-sm text-muted-foreground font-body mt-2 mb-4 leading-relaxed">
              Instantly discover the nearest hospitals, clinics, and pharmacies
              based on your real-time location — with route guidance and
              estimated travel times.
            </p>
            <button onClick={onTryNow} className="btn-primary-hero text-sm mb-8">Try Now</button>
          </Tool3DCard>
        </div>
      </div>
    </section>
  );
};

export default ToolsSection;
