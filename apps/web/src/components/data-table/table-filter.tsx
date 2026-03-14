import type { Column } from '@tanstack/react-table';

import { useId, useMemo } from 'react';

import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

declare module '@tanstack/react-table' {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    type ColumnMeta<TData extends RowData, TValue> = {
        filterVariant?: 'range' | 'select' | 'text';
    };
}

export function TableFilter<TData>({ column }: Readonly<{ column: Column<TData, unknown> }>) {
    const id = useId();
    const columnFilterValue = column.getFilterValue();
    const { filterVariant } = column.columnDef.meta ?? {};
    const columnHeader = typeof column.columnDef.header === 'string' ? column.columnDef.header : '';

    const sortedUniqueValues = useMemo(() => {
        if (filterVariant === 'range') return [];

        const values = [...column.getFacetedUniqueValues().keys()];

        const flattenedValues: string[] = [];
        for (const curr of values) {
            if (Array.isArray(curr)) {
                flattenedValues.push(...curr);
            } else {
                flattenedValues.push(curr);
            }
        }

        return [...new Set(flattenedValues)].toSorted();
    }, [column.getFacetedUniqueValues(), filterVariant]);

    return (
        <div className="w-full space-y-2">
            <Label htmlFor={`${id}-select`}>
                Select
                {columnHeader}
            </Label>
            <Select
                onValueChange={(value) => {
                    column.setFilterValue(value === 'all' ? undefined : value);
                }}
                value={columnFilterValue?.toString() ?? 'all'}
            >
                <SelectTrigger className="w-full capitalize" id={`${id}-select`}>
                    <SelectValue placeholder={`Select ${columnHeader}`} />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    {sortedUniqueValues.map(value => (
                        <SelectItem className="capitalize" key={String(value)} value={String(value)}>
                            {String(value)}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    );
}
