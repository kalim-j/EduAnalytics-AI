'use client';
import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  glassmorphism?: boolean;
}

function Card({
  children,
  className,
  hover = true,
  glassmorphism = false,
}: CardProps) {
  return (
    <div
      className={cn(
        `
          rounded-2xl p-6 transition-all duration-300
          border border-gray-200
        `,
        glassmorphism && `
          bg-white/70 backdrop-blur-xl border-white/30
          shadow-sm
        `,
        !glassmorphism && `
          bg-white shadow-sm
        `,
        hover && `
          hover:shadow-lg hover:-translate-y-1
        `,
        className
      )}
    >
      {children}
    </div>
  );
}

export default Card;
export { Card };
