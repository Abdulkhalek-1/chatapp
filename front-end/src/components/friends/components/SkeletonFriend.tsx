import { Skeleton } from "@/components/ui/skeleton";

export default function SkeletonFriend() {
  return (
    <div
      className={`w-full flex items-center gap-3 transition  rounded-lg px-2 py-2`}
    >
      <Skeleton className="w-16 h-12 rounded-[50%]" />
      <div className="w-full flex justify-between px-2">
        <div>
          <Skeleton className="h-6 w-56" />
        </div>
      </div>
    </div>
  );
}
