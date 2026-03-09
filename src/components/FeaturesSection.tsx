import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Brain, AlertTriangle, Pill } from "lucide-react";
import symptomImg from "@/assets/feature-symptom.png";
import emergencyImg from "@/assets/feature-emergency.png";
import drugImg from "@/assets/feature-drug.png";

const chatbotFeatures = [
  {
    label: "AI Symptom Intelligence",
    title: "Enter symptoms via chat or form — AI suggests possible diseases with risk levels",
    description: "Focused on preventive guidance, not replacing doctors.",
    image: symptomImg,
  },
  {
    label: "Smart Emergency Response Advisor",
    title: "Detects critical symptoms, sends alerts & recommends nearest hospitals and ambulances",
    description: "Every second counts in emergencies.",
    image: emergencyImg,
  },
  {
    label: "Medical Drug Conflict Detector",
    title: "Enter medicines — AI detects unsafe interactions, optimal timings & dosages",
    description: "Never risk a dangerous combination.",
    image: drugImg,
  },
];

const FeatureCard = ({ feature, index }: { feature: typeof chatbotFeatures[0]; index: number }) => {
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
      <span
        className="text-sm text-muted-foreground font-body mb-3 tracking-wide inline-block animate-float"
        style={{ animationDelay: `${index * 0.6}s` }}
      >
        {feature.label}
      </span>
      <h3 className="text-xl md:text-2xl font-bold text-foreground font-heading leading-snug mb-8">
        {feature.title}
      </h3>
      <div className="mt-auto rounded-t-2xl overflow-hidden shadow-lg bg-card">
        <img
          src={feature.image}
          alt={feature.label}
          className="w-full h-auto object-cover"
          loading="eager"
          decoding="async"
        />
      </div>
    </motion.div>
  );
};

const FeaturesSection = ({ onTryNow }: { onTryNow?: () => void }) => {
  const headingRef = useRef<HTMLDivElement>(null);
  const inView = useInView(headingRef, { once: true, margin: "-100px" });

  return (
    <section id="features" className="py-16 md:py-24 px-4 gradient-section">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          ref={headingRef}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="section-heading text-center mb-4"
        >
          Intelligent tools for smarter healthcare
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="section-subheading text-center mb-6"
        >
          Three AI-powered chatbot modules working together to keep you safe
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="flex justify-center mb-14"
        >
          <button
            onClick={onTryNow}
            className="btn-primary-hero text-sm"
          >
            Try Now
          </button>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {chatbotFeatures.map((feature, i) => (
            <FeatureCard key={feature.label} feature={feature} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;