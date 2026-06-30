import type { InputHTMLAttributes } from 'react';

import { forwardRef } from 'react';

import { cn } from '#/lib/utils';

export const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(
    ({ className, ...props }, ref) => (
        <input className={cn('ui-input', className)} ref={ref} {...props} />
    ),
);

Input.displayName = 'Input';

export const InputGroup = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
    ({ className, ...props }, ref) => (
        <div className={cn('ui-input-group', className)} ref={ref} {...props} />
    ),
);

InputGroup.displayName = 'InputGroup';
