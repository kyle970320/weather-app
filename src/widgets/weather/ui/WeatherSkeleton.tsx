// import { Card } from "@/shared/ui/card";
import Card from "@/shared/ui/Card";
import Skeleton from "@/shared/ui/Skeleton";
// import { Skeleton } from "@/shared/ui/skeleton";

export default function WeatherSkeleton() {
  return (
    <div className="mt-8 space-y-6">
      <Card className="flex flex-col items-center gap-6">
        {/* 주소 + 현재 기온 */}
        <div className="flex flex-col items-center gap-2">
          {/* 주소 */}
          <Skeleton className="h-7 w-48 rounded-md" />

          <div className="flex items-center justify-between">
            <div className="flex flex-col items-center gap-2">
              {/* 현재 기온 */}
              <Skeleton className="h-12 w-24 rounded-md" />

              {/* 최고 / 최저 */}
              <Skeleton className="h-5 w-40 rounded-md" />
            </div>
          </div>
        </div>

        {/* 바람 / 습도 / 강수형태 */}
        <Card className="bg-white/5 p-0 shadow-xl">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="rounded-xl p-3 text-center space-y-2">
                <Skeleton className="h-5 w-5 mx-auto rounded-full" />
                <Skeleton className="h-4 w-12 mx-auto rounded-md" />
                <Skeleton className="h-5 w-16 mx-auto rounded-md" />
              </div>
            ))}
          </div>
        </Card>

        {/* 시간대별 기온 */}
        <Card className="bg-white/5 shadow-xl w-full">
          <Skeleton className="h-6 w-32 mb-4 rounded-md" />

          <div className="grid grid-cols-3 md:grid-cols-9 gap-4">
            {Array.from({ length: 9 }).map((_, i) => (
              <div key={i} className="text-center space-y-2">
                <Skeleton className="h-4 w-8 mx-auto rounded-md" />
                <Skeleton className="h-5 w-10 mx-auto rounded-md" />
              </div>
            ))}
          </div>
        </Card>
      </Card>
    </div>
  );
}
