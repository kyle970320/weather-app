declare module "react-error-boundary" {
  import * as React from "react";

  export interface FallbackProps {
    error: Error;
    resetErrorBoundary: () => void;
  }

  export interface ErrorBoundaryProps {
    FallbackComponent: React.ComponentType<FallbackProps>;
    children?: React.ReactNode;
  }

  export class ErrorBoundary extends React.Component<ErrorBoundaryProps> {}
}

