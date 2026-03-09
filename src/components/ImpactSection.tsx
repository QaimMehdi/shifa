import { useState, useCallback, useEffect } from "react";
import { motion } from "framer-motion";
import { Heart, Shield, Pill } from "lucide-react";
import bgImg from "@/assets/impact-bg.jpg";
import uiPreventive from "@/assets/ui-preventive.png";
import uiEmergency from "@/assets/ui-emergency.png";
import uiSafety from "@/assets/ui-safety.png";

const images = [uiPreventive, uiEmergency, uiSafety];

const tabs = [
  {
    id: "preventive",
    icon: Heart,
    label: "Preventive Healthcare",
    description:
      "Empowering communities with AI-driven symptom analysis and early disease detection — helping people take action before it's too late.",
  },
  {
    id: "emergency",
    icon: Shield,
    label: "Community Safety",
    description:
      "Real-time emergency detection and instant hospital recommendations ensure no critical moment is wasted — saving lives across communities.",
  },
  {
    id: "safety",
    icon: Pill,
    label: "Accessible Medicine",
    description:
      "Making drug safety knowledge available to everyone — detecting harmful interactions and guiding optimal dosages regardless of background.",
  },
];

const ImpactSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    images.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  const handleTab = useCallback(
    (i: number) => {
      if (i !== activeIndex) setActiveIndex(i);
    },
    [activeIndex]
  );

  return (
    <section className="py-16 md:py-28 px-4 gradient-section">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="section-heading text-center mb-16"
        >
          See the impact. Feel the difference
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-8 items-start">
          {/* Left: Static background + vertical strip of all images */}
          <div className="relative rounded-3xl overflow-hidden aspect-square">
            <img
              src={bgImg}
              alt=""
              className="absolute inset-0 w-full h-full object-cover"
              aria-hidden="true"
            />

            {/* All images stacked, only active one visible via opacity */}
            {images.map((src, i) => (
              <img
                key={i}
                src={src}
                alt={tabs[i].label}
                className="absolute inset-0 w-full h-full object-contain p-2 drop-shadow-2xl transition-opacity duration-200 ease-out"
                style={{ opacity: i === activeIndex ? 1 : 0 }}
                draggable={false}
              />
            ))}
          </div>

          {/* Right: Tab buttons */}
          <div className="flex flex-col gap-4">
            {tabs.map((tab, i) => {
              const Icon = tab.icon;
              const isActive = i === activeIndex;

              return (
                <motion.button
                  key={tab.id}
                  onClick={() => handleTab(i)}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className={`text-left rounded-2xl p-6 transition-colors duration-200 cursor-pointer ${
                    isActive
                      ? "bg-primary text-primary-foreground shadow-lg"
                      : "bg-accent/60 text-foreground hover:bg-accent"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                        isActive ? "bg-primary-foreground/20" : "bg-primary/10"
                      }`}
                    >
                      <Icon
                        className={`w-5 h-5 ${
                          isActive ? "text-primary-foreground" : "text-primary"
                        }`}
                      />
                    </div>
                    <h3 className="text-lg font-bold font-heading">
                      {tab.label}
                    </h3>
                  </div>

                  <div
                    className="overflow-hidden transition-all duration-200"
                    style={{
                      maxHeight: isActive ? "200px" : "0px",
                      opacity: isActive ? 1 : 0,
                    }}
                  >
                    <p
                      className="text-sm leading-relaxed mt-3"
                      style={{ fontFamily: "var(--font-body)" }}
                    >
                      {tab.description}
                    </p>
                  </div>
                </motion.button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ImpactSection;
