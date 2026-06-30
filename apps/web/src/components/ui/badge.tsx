import type { HTMLAttributes } from 'react';

import { forwardRef } from 'react';

import { cn } from '#/lib/utils';

type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
    variant?: BadgeVariant;
};

type BadgeVariant = 'default' | 'secondary' | 'success';

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
    ({ className, variant = 'default', ...props }, ref) => (
        <span className={cn('ui-badge', `ui-badge--${variant}`, className)} ref={ref} {...props} />
    ),
);

Badge.displayName = 'Badge';
