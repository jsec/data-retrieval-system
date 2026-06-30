import type { ButtonHTMLAttributes } from 'react';

import { forwardRef } from 'react';

import { cn } from '#/lib/utils';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    size?: ButtonSize;
    variant?: ButtonVariant;
};

type ButtonSize = 'default' | 'icon' | 'sm';
type ButtonVariant = 'default' | 'ghost' | 'outline' | 'secondary' | 'subtle';

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, size = 'default', variant = 'default', ...props }, ref) => (
        <button
            className={cn('ui-button', `ui-button--${variant}`, `ui-button--${size}`, className)}
            ref={ref}
            {...props}
        />
    ),
);

Button.displayName = 'Button';
