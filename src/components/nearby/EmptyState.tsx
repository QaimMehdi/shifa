import { motion } from "framer-motion";
import { MapPin } from "lucide-react";

interface EmptyStateProps {
  onClearFilters: () => void;
}

const EmptyState = ({ onClearFilters }: EmptyStateProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col items-center justify-center py-20 px-4"
    >
      <div className="w-14 h-14 rounded-xl bg-muted/60 flex items-center justify-center mb-5">
        <MapPin className="w-5 h-5 text-muted-foreground/50" />
      </div>

      <p className="text-sm font-heading font-semibold text-foreground mb-1 tracking-tight">
        No facilities found
      </p>
      <p className="text-xs text-muted-foreground font-body mb-6 max-w-[240px] text-center leading-relaxed">
        Try adjusting your search or clearing the active filters.
      </p>

      <button
        onClick={onClearFilters}
        className="px-4 py-2 rounded-lg bg-foreground text-background text-xs font-body font-medium hover:bg-foreground/90 transition-colors"
      >
        Clear filters
      </button>
    </motion.div>
  );
};

export default EmptyState;
