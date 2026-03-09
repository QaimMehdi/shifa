import { motion } from "framer-motion";
import {
  MapPin,
  Phone,
  Clock,
  Star,
  Navigation,
  ArrowUpRight,
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
  type: string;
  specialty: string[];
  distance: number;
  eta: string;
  rating: number;
  reviews: number;
  address: string;
  phone: string;
  hours: string;
  isOpen: boolean;
  hasER: boolean;
  icon: string;
}

interface HospitalCardProps {
  hospital: Hospital;
  index: number;
  onHover: (id: number | null) => void;
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

const HospitalCard = ({ hospital, index, onHover }: HospitalCardProps) => {
  const IconComp = iconMap[hospital.icon] || Building2;

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.03, duration: 0.25, ease: "easeOut" }}
      onMouseEnter={() => onHover(hospital.id)}
      onMouseLeave={() => onHover(null)}
      className="group bg-card rounded-xl border border-border/60 p-4 sm:p-5 transition-all duration-200 hover:border-border"
      style={{
        boxShadow: "0 1px 3px hsl(var(--foreground) / 0.04)",
      }}
    >
      <div className="flex items-start gap-3.5">
        {/* Icon — monochrome, minimal */}
        <div className="w-10 h-10 rounded-lg bg-muted/80 flex items-center justify-center shrink-0">
          <IconComp className="w-4 h-4 text-foreground/70" />
        </div>

        <div className="flex-1 min-w-0">
          {/* Top row */}
          <div className="flex items-start justify-between gap-2">
            <div>
              <h3 className="text-[13px] font-heading font-semibold text-foreground leading-snug tracking-tight">
                {hospital.name}
              </h3>
              <p className="text-[11px] text-muted-foreground font-body mt-0.5">{hospital.type}</p>
            </div>
            <div className="flex items-center gap-1.5 shrink-0">
              {hospital.hasER && (
                <span className="px-1.5 py-px rounded bg-destructive/8 text-destructive text-[9px] font-body font-semibold uppercase tracking-wider">
                  ER
                </span>
              )}
              <span className="flex items-center gap-1 text-[10px] font-body text-muted-foreground">
                <span className="relative flex h-1.5 w-1.5">
                  {hospital.isOpen && (
                    <span className="animate-[ping_2s_ease-in-out_infinite] absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-50" />
                  )}
                  <span className={`relative inline-flex rounded-full h-1.5 w-1.5 ${hospital.isOpen ? "bg-emerald-500" : "bg-muted-foreground/30"}`} />
                </span>
                <span className={hospital.isOpen ? "text-emerald-600" : "text-muted-foreground/60"}>
                  {hospital.isOpen ? "Open" : "Closed"}
                </span>
              </span>
            </div>
          </div>

          {/* Stats — clean horizontal layout */}
          <div className="flex items-center gap-3 mt-2.5 text-[11px] text-muted-foreground font-body">
            <span className="flex items-center gap-1">
              <Navigation className="w-3 h-3 text-foreground/40" />
              <span className="font-medium text-foreground">{hospital.distance} km</span>
              <span>· {hospital.eta}</span>
            </span>
            <span className="flex items-center gap-1">
              <Star className="w-3 h-3 text-foreground/40 fill-foreground/40" />
              <span className="font-medium text-foreground">{hospital.rating}</span>
              <span>({hospital.reviews})</span>
            </span>
            <span className="hidden sm:flex items-center gap-1">
              <Clock className="w-3 h-3 text-foreground/30" />
              {hospital.hours}
            </span>
          </div>

          {/* Bottom row */}
          <div className="flex items-center justify-between mt-3 pt-3 border-t border-border/40">
            <span className="flex items-center gap-1 text-[11px] text-muted-foreground font-body">
              <MapPin className="w-3 h-3 shrink-0 text-foreground/30" />
              <span className="truncate max-w-[180px] sm:max-w-[280px]">{hospital.address}</span>
            </span>
            <div className="flex items-center gap-1.5 shrink-0">
              <a
                href={`tel:${hospital.phone}`}
                className="w-7 h-7 rounded-lg bg-muted/60 flex items-center justify-center text-foreground/50 hover:text-foreground hover:bg-muted transition-colors"
                title="Call"
              >
                <Phone className="w-3 h-3" />
              </a>
              <button
                className="w-7 h-7 rounded-lg bg-muted/60 flex items-center justify-center text-foreground/50 hover:text-foreground hover:bg-muted transition-colors"
                title="Directions"
              >
                <Navigation className="w-3 h-3" />
              </button>
              <button
                className="w-7 h-7 rounded-lg bg-foreground text-background flex items-center justify-center hover:bg-foreground/90 transition-colors"
                title="View details"
              >
                <ArrowUpRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default HospitalCard;
