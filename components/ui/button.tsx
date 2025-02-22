import * as React from 'react';
import { VariantProps, cva } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-xl text-sm font-normal transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-gray-50 dark:ring-offset-gray-900',
  {
    variants: {
      variant: {
        default:
          'bg-blue-500 text-white hover:bg-blue-600 shadow-md dark:bg-blue-600 dark:hover:bg-blue-700',
        outline:
          'border border-gray-300 text-gray-600 hover:bg-gray-200/20 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800/20',
      },
      size: {
        default: 'h-10 px-6 py-2',
        sm: 'h-9 px-4 rounded-xl',
        lg: 'h-11 px-8 rounded-xl',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn('glass', buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
