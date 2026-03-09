import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  MapPin,
  Search,
  Building2,
  Stethoscope,
  Baby,
  Heart,
  Eye,
  Brain,
  ChevronDown,
  Locate,
} from "lucide-react";

import NearbyCareMap from "@/components/nearby/NearbyCareMap";
import HospitalCard from "@/components/nearby/HospitalCard";
import NearbySkeleton from "@/components/nearby/NearbySkeleton";
import EmptyState from "@/components/nearby/EmptyState";

const specialties = [
  { id: "all", label: "All", icon: Building2 },
  { id: "emergency", label: "Emergency", icon: Heart },
  { id: "general", label: "General", icon: Stethoscope },
  { id: "pediatrics", label: "Pediatrics", icon: Baby },
  { id: "cardiology", label: "Cardiology", icon: Heart },
  { id: "ophthalmology", label: "Eye Care", icon: Eye },
  { id: "neurology", label: "Neurology", icon: Brain },
];

const hospitals = [
  {
    id: 1, name: "City General Hospital", type: "General Hospital",
    specialty: ["emergency", "general", "cardiology"], distance: 1.2, eta: "4 min",
    rating: 4.5, reviews: 342, address: "123 Medical Blvd, Downtown",
    phone: "+92 21 111 2233", hours: "24/7 Emergency", isOpen: true, hasER: true, icon: "building2",
  },
  {
    id: 2, name: "Al-Shifa Medical Complex", type: "Multi-Specialty",
    specialty: ["general", "cardiology", "neurology", "ophthalmology"], distance: 2.3, eta: "8 min",
    rating: 4.7, reviews: 518, address: "45 Health Avenue, Sector 7",
    phone: "+92 21 222 4455", hours: "24/7", isOpen: true, hasER: true, icon: "activity",
  },
  {
    id: 3, name: "Children's Care Hospital", type: "Pediatric Center",
    specialty: ["pediatrics"], distance: 3.1, eta: "10 min",
    rating: 4.8, reviews: 276, address: "78 Kids Lane, Garden Town",
    phone: "+92 21 333 6677", hours: "8 AM – 10 PM", isOpen: true, hasER: false, icon: "baby",
  },
  {
    id: 4, name: "Heart & Vascular Institute", type: "Cardiac Specialty",
    specialty: ["cardiology", "emergency"], distance: 4.1, eta: "12 min",
    rating: 4.6, reviews: 189, address: "22 Pulse Road, Medical District",
    phone: "+92 21 444 8899", hours: "24/7 Cardiac ER", isOpen: true, hasER: true, icon: "heart",
  },
  {
    id: 5, name: "Vision Eye Clinic", type: "Ophthalmology",
    specialty: ["ophthalmology"], distance: 1.8, eta: "6 min",
    rating: 4.3, reviews: 124, address: "90 Clear View St, Block 4",
    phone: "+92 21 555 1122", hours: "9 AM – 6 PM", isOpen: false, hasER: false, icon: "eye",
  },
  {
    id: 6, name: "Neuro Care Center", type: "Neurology Clinic",
    specialty: ["neurology", "general"], distance: 5.4, eta: "18 min",
    rating: 4.4, reviews: 97, address: "15 Brain Way, University Road",
    phone: "+92 21 666 3344", hours: "8 AM – 8 PM", isOpen: true, hasER: false, icon: "brain",
  },
  {
    id: 7, name: "Community Health Clinic", type: "Walk-in Clinic",
    specialty: ["general"], distance: 0.8, eta: "3 min",
    rating: 4.1, reviews: 203, address: "5 Wellness Street, Block 2",
    phone: "+92 21 777 5566", hours: "7 AM – 11 PM", isOpen: true, hasER: false, icon: "stethoscope",
  },
];

const NearbyCare = () => {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"distance" | "rating">("distance");
  const [showSort, setShowSort] = useState(false);
  const [hoveredHospital, setHoveredHospital] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 150);
    return () => clearTimeout(timer);
  }, []);

  const filtered = hospitals
    .filter((h) => {
      const matchesFilter = activeFilter === "all" || h.specialty.includes(activeFilter);
      const matchesSearch =
        !searchQuery.trim() ||
        h.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        h.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
        h.address.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesFilter && matchesSearch;
    })
    .sort((a, b) => (sortBy === "distance" ? a.distance - b.distance : b.rating - a.rating));

  const clearFilters = () => {
    setActiveFilter("all");
    setSearchQuery("");
  };

  if (isLoading) return <NearbySkeleton />;

  return (
    <div className="min-h-screen bg-background">
      {/* Header — solid, no glassmorphism */}
      <header className="sticky top-0 z-40 bg-card border-b border-border/60">
        <div className="max-w-3xl mx-auto px-5 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate("/")}
              className="w-8 h-8 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <div>
              <h1 className="text-sm font-heading font-semibold text-foreground tracking-tight">Nearby Care</h1>
              <p className="text-[11px] text-muted-foreground font-body">Hospitals & clinics near you</p>
            </div>
          </div>
          <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border/60 text-foreground/70 text-[11px] font-body font-medium hover:bg-muted transition-colors">
            <Locate className="w-3 h-3" />
            <span className="hidden sm:inline">My Location</span>
          </button>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-5 py-6 space-y-5">
        {/* Search + Sort */}
        <div className="flex items-center gap-2.5">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground/60" />
            <input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search hospitals, clinics..."
              className="w-full text-[13px] font-body bg-card border border-border/60 rounded-lg pl-9 pr-4 py-2.5 text-foreground placeholder:text-muted-foreground/50 outline-none focus:border-foreground/20 transition-colors"
            />
          </div>
          <div className="relative">
            <button
              onClick={() => setShowSort(!showSort)}
              className="flex items-center gap-1 px-3 py-2.5 rounded-lg bg-card border border-border/60 text-[13px] font-body text-foreground hover:bg-muted transition-colors"
            >
              <span className="hidden sm:inline text-muted-foreground">{sortBy === "distance" ? "Nearest" : "Top Rated"}</span>
              <ChevronDown className="w-3 h-3 text-muted-foreground" />
            </button>
            <AnimatePresence>
              {showSort && (
                <motion.div
                  initial={{ opacity: 0, y: 2 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 2 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 top-full mt-1.5 bg-card border border-border/60 rounded-lg py-1 min-w-[130px] z-10"
                  style={{ boxShadow: "0 4px 12px hsl(var(--foreground) / 0.06)" }}
                >
                  {(["distance", "rating"] as const).map((val) => (
                    <button
                      key={val}
                      onClick={() => { setSortBy(val); setShowSort(false); }}
                      className={`w-full text-left px-3 py-1.5 text-[12px] font-body hover:bg-muted transition-colors ${
                        sortBy === val ? "text-foreground font-medium" : "text-muted-foreground"
                      }`}
                    >
                      {val === "distance" ? "Nearest First" : "Top Rated"}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Specialty chips — understated */}
        <div className="flex gap-1.5 overflow-x-auto pb-0.5 scrollbar-hide">
          {specialties.map((s) => (
            <button
              key={s.id}
              onClick={() => setActiveFilter(s.id)}
              className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-[11px] font-body font-medium whitespace-nowrap transition-all shrink-0 ${
                activeFilter === s.id
                  ? "bg-foreground text-background"
                  : "bg-transparent border border-border/50 text-muted-foreground hover:text-foreground hover:border-border"
              }`}
            >
              <s.icon className="w-3 h-3" />
              {s.label}
            </button>
          ))}
        </div>

        {/* Map */}
        <NearbyCareMap
          hospitals={filtered.map((h) => ({
            id: h.id, name: h.name, distance: h.distance, hasER: h.hasER, icon: h.icon,
          }))}
          hoveredId={hoveredHospital}
        />

        {/* Count */}
        <p className="text-[11px] text-muted-foreground font-body tracking-wide">
          <span className="font-medium text-foreground">{filtered.length}</span> {filtered.length === 1 ? "facility" : "facilities"} near you
        </p>

        {/* Hospital list */}
        <div className="space-y-2.5">
          {filtered.map((hospital, i) => (
            <HospitalCard
              key={hospital.id}
              hospital={hospital}
              index={i}
              onHover={setHoveredHospital}
            />
          ))}
          {filtered.length === 0 && <EmptyState onClearFilters={clearFilters} />}
        </div>

        {/* Disclaimer */}
        <p className="text-[9px] text-muted-foreground/50 text-center font-body pt-4 pb-6 tracking-wide uppercase">
          Demo data · Distances approximate · Call to confirm
        </p>
      </main>
    </div>
  );
};

export default NearbyCare;
