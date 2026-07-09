import type { ComponentProps } from 'react';

import { cn } from '#/lib/utils';

type BadgeProps = ComponentProps<'span'> & {
    variant?: BadgeVariant;
};

type BadgeVariant = 'default' | 'secondary' | 'success';

export const Badge = ({ className, variant = 'default', ...props }: BadgeProps) => (
    <span className={cn('ui-badge', `ui-badge--${variant}`, className)} {...props} />
);
