'use client';
import { ReactNode, ButtonHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  fullWidth?: boolean;
}

function Button({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  fullWidth = false,
  className,
  disabled,
  ...props
}: ButtonProps) {
  const baseClasses = `
    inline-flex items-center justify-center
    font-semibold rounded-lg transition-all duration-200
    disabled:opacity-50 disabled:cursor-not-allowed
    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500
  `;

  const variantClasses = {
    primary: `
      bg-gradient-to-r from-purple-600 to-blue-600 text-white
      hover:shadow-lg hover:from-purple-700 hover:to-blue-700
      active:scale-95
    `,
    secondary: `
      bg-purple-100 text-purple-900
      hover:bg-purple-200
      active:scale-95
    `,
    ghost: `
      text-purple-600 hover:bg-purple-50
      active:bg-purple-100
    `,
    outline: `
      border-2 border-purple-600 text-purple-600
      hover:bg-purple-50
      active:scale-95
    `,
  };

  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2.5 text-base',
    lg: 'px-6 py-3 text-lg',
  };

  return (
    <button
      className={cn(
        baseClasses,
        variantClasses[variant],
        sizeClasses[size],
        fullWidth && 'w-full',
        className
      )}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <>
          <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
          Loading...
        </>
      ) : (
        children
      )}
    </button>
  );
}

export default Button;
export { Button };
