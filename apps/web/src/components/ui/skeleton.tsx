import { cn } from '@/lib/utils';

function Skeleton({ className, ...props }: Readonly<React.ComponentProps<'div'>>) {
    return (
        <div
            className={cn('bg-accent animate-pulse rounded-md', className)}
            data-slot="skeleton"
            {...props}
        />
    );
}

export { Skeleton };
