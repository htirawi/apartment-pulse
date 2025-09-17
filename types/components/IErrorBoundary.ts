import { ReactNode } from 'react';

export interface IErrorBoundaryProps {
  children?: ReactNode;
  fallback?: ReactNode;
}

export interface IErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}
