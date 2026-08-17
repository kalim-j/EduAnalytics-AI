'use client';
export default function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center">
      <div className="relative w-12 h-12">
        <div className="absolute inset-0 border-4 border-gray-200 rounded-full" />
        <div className="absolute inset-0 border-4 border-purple-600 rounded-full border-t-transparent animate-spin" />
      </div>
    </div>
  );
}
