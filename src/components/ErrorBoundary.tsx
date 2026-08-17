'use client';
import { ReactNode, useState } from 'react';
import Button from '@/components/ui/button';

interface ErrorBoundaryProps {
  children: ReactNode;
}

export default function ErrorBoundary({ children }: ErrorBoundaryProps) {
  const [error, setError] = useState<Error | null>(null);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8 text-center">
          <div className="text-4xl mb-4">⚠️</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Something went wrong
          </h1>
          <p className="text-gray-600 mb-6">{error.message}</p>
          <Button
            variant="primary"
            onClick={() => {
              setError(null);
              window.location.reload();
            }}
            fullWidth
          >
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  return children;
}
