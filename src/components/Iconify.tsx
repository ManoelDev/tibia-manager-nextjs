"use client"

import { ComponentProps, ElementRef, forwardRef } from 'react';
import { Icon } from '@iconify/react';
import { VariantProps, cva } from 'class-variance-authority';
import { cn } from '@/lib/utils';



const buttonVariants = cva(
  "transition-colors", {
  variants: {
    size: {
      xs: "h-2 w-2",
      sm: "h-3 w-3",
      md: "h-4 w-4",
      lg: "h-9 w-9",
      xg: "h-10 w-10",
    },
  },
  defaultVariants: {
    size: "md",
  },
}
)


export interface IconiFyProps extends ComponentProps<typeof Icon>, VariantProps<typeof buttonVariants> { }

export const IconiFy = forwardRef<ElementRef<typeof Icon>, IconiFyProps>(({ className, size, ...props }: IconiFyProps, ref) => {
  return (
    <Icon {...props} className={cn(buttonVariants({ size, className }))} />
  );
});

IconiFy.displayName = 'IconiFy';