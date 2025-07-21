import { Skeleton } from "@/components/ui/skeleton";

interface LoadingSkeletonProps {
  variant?: "card" | "list" | "table" | "profile";
  count?: number;
}

export function LoadingSkeleton({
  variant = "card",
  count = 1,
}: LoadingSkeletonProps) {
  // Render a completely flat structure based on variant
  if (variant === "card") {
    return (
      <div className="w-full">
        {Array.from({ length: count }).map((_, index) => (
          <div
            key={`card-skeleton-${index}`}
            className="mb-4 rounded-lg border p-4"
          >
            <Skeleton className="h-40 w-full rounded-md" />
            <div className="mt-4 space-y-2">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-4 w-5/6" />
            </div>
            <div className="mt-6 flex items-center justify-between">
              <Skeleton className="h-8 w-24 rounded-full" />
              <Skeleton className="h-8 w-8 rounded-full" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (variant === "list") {
    return (
      <div className="w-full">
        {Array.from({ length: count }).map((_, index) => (
          <div key={`list-skeleton-${index}`} className="mb-4 space-y-3">
            <div className="flex items-center space-x-4">
              <Skeleton className="h-12 w-12 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-[250px]" />
                <Skeleton className="h-4 w-[200px]" />
              </div>
            </div>
            <Skeleton className="h-[1px] w-full" />
          </div>
        ))}
      </div>
    );
  }

  if (variant === "table") {
    return (
      <div className="w-full">
        {Array.from({ length: count }).map((_, index) => (
          <div
            key={`table-skeleton-${index}`}
            className="mb-4 w-full overflow-hidden rounded-lg border"
          >
            <div className="bg-muted/50 p-4">
              <div className="flex items-center justify-between">
                <Skeleton className="h-8 w-[200px]" />
                <Skeleton className="h-8 w-[100px]" />
              </div>
            </div>
            <div className="p-4">
              <div className="flex items-center justify-between py-2">
                <Skeleton className="h-4 w-[40%]" />
                <Skeleton className="h-4 w-[20%]" />
                <Skeleton className="h-4 w-[15%]" />
                <Skeleton className="h-8 w-[10%] rounded-md" />
              </div>
              <div className="flex items-center justify-between py-2">
                <Skeleton className="h-4 w-[40%]" />
                <Skeleton className="h-4 w-[20%]" />
                <Skeleton className="h-4 w-[15%]" />
                <Skeleton className="h-8 w-[10%] rounded-md" />
              </div>
              <div className="flex items-center justify-between py-2">
                <Skeleton className="h-4 w-[40%]" />
                <Skeleton className="h-4 w-[20%]" />
                <Skeleton className="h-4 w-[15%]" />
                <Skeleton className="h-8 w-[10%] rounded-md" />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (variant === "profile") {
    return (
      <div className="w-full">
        {Array.from({ length: count }).map((_, index) => (
          <div key={`profile-skeleton-${index}`} className="mb-4 space-y-8">
            <div className="flex flex-col items-center space-y-4">
              <Skeleton className="h-24 w-24 rounded-full" />
              <Skeleton className="h-6 w-[180px]" />
              <Skeleton className="h-4 w-[120px]" />
            </div>
            <div className="space-y-4">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>
            <div className="grid grid-cols-3 gap-4">
              <Skeleton className="h-20 rounded-md" />
              <Skeleton className="h-20 rounded-md" />
              <Skeleton className="h-20 rounded-md" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  // Default fallback
  return (
    <div className="w-full">
      {Array.from({ length: count }).map((_, index) => (
        <Skeleton
          key={`default-skeleton-${index}`}
          className="mb-4 h-20 w-full"
        />
      ))}
    </div>
  );
}
