import { Link } from "react-router-dom";
import Card from "@/shared/ui/Card";
import { Button } from "@/shared/ui/Button";

export default function NotFound() {
  return (
    <div className="flex w-full h-screen items-center justify-center bg-linear-to-br from-main/80 via-main/90 to-main/80">
      <Card className="mx-4 max-w-xl w-full bg-white/95 text-slate-900 shadow-xl p-8 text-center space-y-4">
        <h1 className="text-2xl font-semibold">페이지를 찾을 수 없어요</h1>
        <p className="text-sm text-slate-600">
          요청하신 주소가 존재하지 않거나 이동되었을 수 있습니다.
        </p>
        <Button asChild variant="primary" className="mt-2">
          <Link to="/">홈으로 돌아가기</Link>
        </Button>
      </Card>
    </div>
  );
}
