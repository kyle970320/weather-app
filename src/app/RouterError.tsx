import { useRouteError, isRouteErrorResponse } from "react-router-dom";
import NotFound from "./NotFound";
import ErrorPage from "./Error";

export default function RouteErrorPage() {
  const error = useRouteError();

  if (isRouteErrorResponse(error) && error.status === 404) {
    return <NotFound />;
  }

  return <ErrorPage error={error as Error} resetErrorBoundary={() => {}} />;
}
