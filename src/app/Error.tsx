import { Button } from "@/shared/ui/Button";
import Card from "@/shared/ui/Card";
import type { FallbackProps } from "react-error-boundary";

export default function ErrorPage({
  error,
  resetErrorBoundary,
}: FallbackProps) {
  const message =
    error?.message ||
    "알 수 없는 오류가 발생했습니다. 잠시 후 다시 시도해주세요.";

  const handleReload = () => {
    resetErrorBoundary();
    window.location.reload();
  };

  return (
    <div className="flex w-full h-screen items-center justify-center bg-linear-to-br from-main/80 via-main/90 to-main/80">
      <Card className="mx-4 max-w-xl w-full bg-white/95 text-slate-900 shadow-xl p-8 text-center space-y-4">
        <h1 className="text-2xl font-semibold">문제가 발생했어요</h1>
        <p className="text-sm text-slate-600">{message}</p>
        <Button variant="primary" onClick={handleReload}>
          페이지 새로 고침
        </Button>
      </Card>
    </div>
  );
}
