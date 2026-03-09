import { Skeleton } from "@/components/ui/skeleton";

const NearbySkeleton = () => {
  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 bg-card border-b border-border/60">
        <div className="max-w-3xl mx-auto px-5 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Skeleton className="w-8 h-8 rounded-lg" />
            <div className="space-y-1.5">
              <Skeleton className="w-24 h-3.5 rounded" />
              <Skeleton className="w-36 h-2.5 rounded" />
            </div>
          </div>
          <Skeleton className="w-20 h-7 rounded-lg" />
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-5 py-6 space-y-5">
        <div className="flex gap-3">
          <Skeleton className="flex-1 h-10 rounded-lg" />
          <Skeleton className="w-20 h-10 rounded-lg" />
        </div>

        <div className="flex gap-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="w-20 h-7 rounded-lg shrink-0" />
          ))}
        </div>

        <Skeleton className="h-52 sm:h-60 rounded-xl" />

        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="rounded-xl p-4 bg-card border border-border/40">
            <div className="flex gap-3.5">
              <Skeleton className="w-10 h-10 rounded-lg shrink-0" />
              <div className="flex-1 space-y-3">
                <div>
                  <Skeleton className="w-40 h-3.5 rounded mb-1.5" />
                  <Skeleton className="w-24 h-2.5 rounded" />
                </div>
                <div className="flex gap-3">
                  <Skeleton className="w-16 h-2.5 rounded" />
                  <Skeleton className="w-14 h-2.5 rounded" />
                  <Skeleton className="w-20 h-2.5 rounded" />
                </div>
                <div className="pt-3 border-t border-border/30 flex justify-between">
                  <Skeleton className="w-36 h-2.5 rounded" />
                  <div className="flex gap-1.5">
                    <Skeleton className="w-7 h-7 rounded-lg" />
                    <Skeleton className="w-7 h-7 rounded-lg" />
                    <Skeleton className="w-7 h-7 rounded-lg" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </main>
    </div>
  );
};

export default NearbySkeleton;
