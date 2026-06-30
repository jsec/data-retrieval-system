import type { HTMLAttributes } from 'react';

import { forwardRef } from 'react';

import { cn } from '#/lib/utils';

export const Card = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
    ({ className, ...props }, ref) => (
        <div className={cn('ui-card', className)} ref={ref} {...props} />
    ),
);

Card.displayName = 'Card';

export const CardHeader = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
    ({ className, ...props }, ref) => (
        <div className={cn('ui-card-header', className)} ref={ref} {...props} />
    ),
);

CardHeader.displayName = 'CardHeader';

export const CardTitle = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
    ({ className, ...props }, ref) => (
        <div className={cn('ui-card-title', className)} ref={ref} {...props} />
    ),
);

CardTitle.displayName = 'CardTitle';

export const CardDescription = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
    ({ className, ...props }, ref) => (
        <div className={cn('ui-card-description', className)} ref={ref} {...props} />
    ),
);

CardDescription.displayName = 'CardDescription';

export const CardContent = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
    ({ className, ...props }, ref) => (
        <div className={cn('ui-card-content', className)} ref={ref} {...props} />
    ),
);

CardContent.displayName = 'CardContent';
