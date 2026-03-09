import { motion } from "framer-motion";
import {
  Navigation,
  Building2,
  Heart,
  Stethoscope,
  Baby,
  Eye,
  Brain,
  Activity,
} from "lucide-react";

interface Hospital {
  id: number;
  name: string;
  distance: number;
  hasER: boolean;
  icon: string;
}

interface NearbyCareMapProps {
  hospitals: Hospital[];
  hoveredId: number | null;
}

const iconMap: Record<string, React.ElementType> = {
  building2: Building2,
  heart: Heart,
  stethoscope: Stethoscope,
  baby: Baby,
  eye: Eye,
  brain: Brain,
  activity: Activity,
};

const pinPositions = [
  { left: "24%", top: "34%" },
  { left: "62%", top: "24%" },
  { left: "36%", top: "66%" },
  { left: "74%", top: "52%" },
  { left: "16%", top: "58%" },
  { left: "82%", top: "34%" },
  { left: "50%", top: "78%" },
];

const userPos = { left: "50%", top: "48%" };

const NearbyCareMap = ({ hospitals, hoveredId }: NearbyCareMapProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="relative h-52 sm:h-60 rounded-xl overflow-hidden bg-muted/60"
      style={{
        border: "1px solid hsl(var(--border) / 0.6)",
      }}
    >
      {/* Subtle topographic texture */}
      <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
        {/* Organic curved roads — not a grid */}
        <path d="M0,40% Q25%,35% 50%,42% T100%,38%" fill="none" stroke="hsl(var(--foreground))" strokeWidth="1.5" opacity="0.06" />
        <path d="M0,60% Q30%,55% 55%,62% T100%,58%" fill="none" stroke="hsl(var(--foreground))" strokeWidth="1" opacity="0.05" />
        <path d="M20%,0 Q22%,30% 18%,50% T24%,100%" fill="none" stroke="hsl(var(--foreground))" strokeWidth="1" opacity="0.05" />
        <path d="M50%,0 Q48%,25% 52%,50% T50%,100%" fill="none" stroke="hsl(var(--foreground))" strokeWidth="1.5" opacity="0.06" />
        <path d="M78%,0 Q80%,30% 76%,60% T80%,100%" fill="none" stroke="hsl(var(--foreground))" strokeWidth="1" opacity="0.04" />
        {/* Subtle block shapes */}
        <rect x="28%" y="30%" width="8%" height="6%" rx="3" fill="hsl(var(--foreground))" opacity="0.02" />
        <rect x="58%" y="54%" width="10%" height="7%" rx="3" fill="hsl(var(--foreground))" opacity="0.02" />
        <rect x="12%" y="44%" width="6%" height="8%" rx="3" fill="hsl(var(--foreground))" opacity="0.015" />
        {/* Water body */}
        <ellipse cx="85%" cy="72%" rx="12%" ry="16%" fill="hsl(var(--primary))" opacity="0.03" />
      </svg>

      {/* Route line only for hovered hospital */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" xmlns="http://www.w3.org/2000/svg">
        {hospitals.slice(0, 7).map((h, i) => {
          const pos = pinPositions[i];
          if (!pos || hoveredId !== h.id) return null;
          return (
            <line
              key={h.id}
              x1={userPos.left}
              y1={userPos.top}
              x2={pos.left}
              y2={pos.top}
              stroke="hsl(var(--primary))"
              strokeWidth="1.5"
              strokeDasharray="4 3"
              opacity="0.35"
            >
              <animate
                attributeName="stroke-dashoffset"
                from="14"
                to="0"
                dur="1s"
                repeatCount="indefinite"
              />
            </line>
          );
        })}
      </svg>

      {/* Hospital pins */}
      {hospitals.slice(0, 7).map((h, i) => {
        const pos = pinPositions[i];
        if (!pos) return null;
        const isHovered = hoveredId === h.id;
        const IconComp = iconMap[h.icon] || Building2;
        return (
          <motion.div
            key={h.id}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: i * 0.04, type: "spring", stiffness: 400, damping: 20 }}
            className="absolute flex flex-col items-center"
            style={pos}
          >
            <motion.div
              animate={{ scale: isHovered ? 1.15 : 1 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
              className={`w-7 h-7 rounded-full flex items-center justify-center transition-shadow duration-300 ${
                h.hasER
                  ? "bg-destructive text-destructive-foreground"
                  : "bg-foreground text-background"
              } ${isHovered ? "shadow-md" : "shadow-sm"}`}
            >
              <IconComp className="w-3 h-3" />
            </motion.div>
            {isHovered && (
              <motion.div
                initial={{ opacity: 0, y: -2 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-1 px-2 py-0.5 rounded bg-foreground text-background"
              >
                <p className="text-[9px] font-body font-medium whitespace-nowrap">{h.distance} km</p>
              </motion.div>
            )}
          </motion.div>
        );
      })}

      {/* User location — clean, minimal */}
      <div
        className="absolute z-20"
        style={{ left: userPos.left, top: userPos.top, transform: "translate(-50%, -50%)" }}
      >
        <span className="absolute -inset-2 rounded-full bg-primary/10 animate-[pulse_3s_ease-in-out_infinite]" />
        <span className="relative block w-3 h-3 rounded-full bg-primary ring-2 ring-card" />
      </div>

      {/* Bottom bar */}
      <div className="absolute bottom-0 inset-x-0 flex items-center justify-between px-4 py-2.5 bg-card/90 backdrop-blur-sm border-t border-border/40">
        <span className="flex items-center gap-1.5 text-[10px] font-body text-muted-foreground tracking-wide uppercase">
          <Navigation className="w-3 h-3" />
          Map preview
        </span>
        <div className="flex items-center gap-3 text-[10px] font-body text-muted-foreground">
          <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-destructive" /> ER</span>
          <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-foreground" /> Clinic</span>
        </div>
      </div>
    </motion.div>
  );
};

export default NearbyCareMap;
