import type { HTMLAttributes, TableHTMLAttributes, TdHTMLAttributes, ThHTMLAttributes } from 'react';

import { forwardRef } from 'react';

import { cn } from '#/lib/utils';

export const TableContainer = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
    ({ className, ...props }, ref) => (
        <div className={cn('ui-table-container', className)} ref={ref} {...props} />
    ),
);

TableContainer.displayName = 'TableContainer';

export const Table = forwardRef<HTMLTableElement, TableHTMLAttributes<HTMLTableElement>>(
    ({ className, ...props }, ref) => (
        <table className={cn('ui-table', className)} ref={ref} {...props} />
    ),
);

Table.displayName = 'Table';

export const TableHeader = forwardRef<HTMLTableSectionElement, HTMLAttributes<HTMLTableSectionElement>>(
    ({ className, ...props }, ref) => (
        <thead className={cn('ui-table-header', className)} ref={ref} {...props} />
    ),
);

TableHeader.displayName = 'TableHeader';

export const TableBody = forwardRef<HTMLTableSectionElement, HTMLAttributes<HTMLTableSectionElement>>(
    ({ className, ...props }, ref) => (
        <tbody className={className} ref={ref} {...props} />
    ),
);

TableBody.displayName = 'TableBody';

export const TableRow = forwardRef<HTMLTableRowElement, HTMLAttributes<HTMLTableRowElement>>(
    ({ className, ...props }, ref) => (
        <tr className={cn('ui-table-row', className)} ref={ref} {...props} />
    ),
);

TableRow.displayName = 'TableRow';

export const TableHead = forwardRef<HTMLTableCellElement, ThHTMLAttributes<HTMLTableCellElement>>(
    ({ className, ...props }, ref) => (
        <th className={cn('ui-table-head', className)} ref={ref} {...props} />
    ),
);

TableHead.displayName = 'TableHead';

export const TableCell = forwardRef<HTMLTableCellElement, TdHTMLAttributes<HTMLTableCellElement>>(
    ({ className, ...props }, ref) => (
        <td className={cn('ui-table-cell', className)} ref={ref} {...props} />
    ),
);

TableCell.displayName = 'TableCell';
