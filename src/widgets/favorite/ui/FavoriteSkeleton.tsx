import Card from "@/shared/ui/Card";
import Skeleton from "@/shared/ui/Skeleton";

export default function FavoriteSkeleton() {
  return (
    <Card className="p-4 bg-white/25 rounded-2xl text-white shadow-xl">
      {/* 제목 + 버튼 영역 */}
      <div className="flex h-15 items-center justify-between mb-3">
        <Skeleton className="h-6 w-32 rounded-md" />
        <div className="flex gap-1">
          <Skeleton className="h-4 w-4 rounded" />
          <Skeleton className="h-4 w-4 rounded" />
        </div>
      </div>

      {/* 주소 */}
      <div className="mb-3">
        <Skeleton className="h-4 w-40 rounded-md" />
      </div>

      {/* 캐릭터 + 기온 영역 */}
      <div className="flex items-center justify-between gap-2">
        {/* CharacterCanvas 영역 */}
        <Skeleton className="w-[100px] h-[100px] rounded-md" />

        {/* 기온 정보 */}
        <div className="flex flex-col items-end justify-end gap-2">
          <Skeleton className="h-9 w-16 rounded-md" />
          <Skeleton className="h-4 w-20 rounded-md" />
        </div>
      </div>
    </Card>
  );
}
