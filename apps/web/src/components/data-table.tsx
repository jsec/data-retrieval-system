'use client';

import type { Column, ColumnDef, ColumnFiltersState, PaginationState, RowData } from '@tanstack/react-table';

import {
    flexRender,
    getCoreRowModel,
    getFacetedMinMaxValues,
    getFacetedRowModel,
    getFacetedUniqueValues,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from '@tanstack/react-table';
import {
    ChevronDownIcon,
    ChevronLeftIcon,
    ChevronRightIcon,
    ChevronUpIcon,
} from 'lucide-react';
import { useId, useMemo, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem } from '@/components/ui/pagination';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { usePagination } from '@/hooks/use-pagination';
import { cn } from '@/lib/utils';

declare module '@tanstack/react-table' {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    type ColumnMeta<TData extends RowData, TValue> = {
        filterVariant?: 'range' | 'select' | 'text';
    };
}

type TableProps<TData> = {
    columns: ColumnDef<TData>[];
    data: TData[];
};

function DataTable<TData>({ columns, data }: Readonly<TableProps<TData>>) {
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

    const pageSize = 5;

    const [pagination, setPagination] = useState<PaginationState>({
        pageIndex: 0,
        pageSize: pageSize,
    });

    const table = useReactTable({
        columns,
        data,
        enableSortingRemoval: false,
        getCoreRowModel: getCoreRowModel(),
        getFacetedMinMaxValues: getFacetedMinMaxValues(),
        getFacetedRowModel: getFacetedRowModel(),
        getFacetedUniqueValues: getFacetedUniqueValues(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        onColumnFiltersChange: setColumnFilters,
        onPaginationChange: setPagination,
        state: {
            columnFilters,
            pagination,
        },
    });

    const { pages, showLeftEllipsis, showRightEllipsis } = usePagination({
        currentPage: table.getState().pagination.pageIndex + 1,
        paginationItemsToDisplay: 2,
        totalPages: table.getPageCount(),
    });

    return (
        <div className="w-full">
            <div className="border-b">
                <div className="flex flex-col gap-4 p-6">
                    <span className="text-xl font-semibold">Filter</span>
                    <div className="grid grid-cols-1 gap-6 max-md:*:last:col-span-full sm:grid-cols-2 md:grid-cols-3">
                        <Filter column={table.getColumn('role')!} />
                        <Filter column={table.getColumn('plan')!} />
                        <Filter column={table.getColumn('status')!} />
                    </div>
                </div>
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map(headerGroup => (
                            <TableRow className="h-14 border-t" key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead
                                            className="text-muted-foreground first:pl-4 last:px-4 last:text-center"
                                            key={header.id}
                                            style={{ width: `${header.getSize()}px` }}
                                        >
                                            {header.isPlaceholder
                                                ? null
                                                : (header.column.getCanSort()
                                                        ? (
                                                                <div
                                                                    className={cn(
                                                                        header.column.getCanSort()
                                                                        && 'flex h-full cursor-pointer items-center justify-between gap-2 select-none',
                                                                    )}
                                                                    onClick={header.column.getToggleSortingHandler()}
                                                                    onKeyDown={(e) => {
                                                                        if (header.column.getCanSort() && (e.key === 'Enter' || e.key === ' ')) {
                                                                            e.preventDefault();
                                                                            header.column.getToggleSortingHandler()?.(e);
                                                                        }
                                                                    }}
                                                                    tabIndex={header.column.getCanSort() ? 0 : undefined}
                                                                >
                                                                    {flexRender(header.column.columnDef.header, header.getContext())}
                                                                    {{
                                                                        asc: <ChevronUpIcon aria-hidden="true" className="shrink-0 opacity-60" size={16} />,
                                                                        desc: <ChevronDownIcon aria-hidden="true" className="shrink-0 opacity-60" size={16} />,
                                                                    }[header.column.getIsSorted() as string] ?? null}
                                                                </div>
                                                            )
                                                        : (
                                                                flexRender(header.column.columnDef.header, header.getContext())
                                                            ))}
                                        </TableHead>
                                    );
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length
                            ? (
                                    table.getRowModel().rows.map(row => (
                                        <TableRow className="hover:bg-transparent" data-state={row.getIsSelected() && 'selected'} key={row.id}>
                                            {row.getVisibleCells().map(cell => (
                                                <TableCell className="h-14 first:w-12.5 first:pl-4 last:w-29 last:px-4" key={cell.id}>
                                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                                </TableCell>
                                            ))}
                                        </TableRow>
                                    ))
                                )
                            : (
                                    <TableRow>
                                        <TableCell className="h-24 text-center" colSpan={columns.length}>
                                            No results.
                                        </TableCell>
                                    </TableRow>
                                )}
                    </TableBody>
                </Table>
            </div>

            <div className="flex items-center justify-between gap-3 px-6 py-4 max-sm:flex-col md:max-lg:flex-col">
                <p aria-live="polite" className="text-muted-foreground text-sm whitespace-nowrap">
                    Showing
                    {' '}
                    <span>
                        {table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1}
                        {' '}
                        to
                        {' '}
                        {Math.min(
                            Math.max(
                                table.getState().pagination.pageIndex * table.getState().pagination.pageSize
                                + table.getState().pagination.pageSize,
                                0,
                            ),
                            table.getRowCount(),
                        )}
                    </span>
                    {' '}
                    of
                    {' '}
                    <span>
                        {table.getRowCount().toString()}
                        {' '}
                        entries
                    </span>
                </p>

                <div>
                    <Pagination>
                        <PaginationContent>
                            <PaginationItem>
                                <Button
                                    aria-label="Go to previous page"
                                    className="disabled:pointer-events-none disabled:opacity-50"
                                    disabled={!table.getCanPreviousPage()}
                                    onClick={() => table.previousPage()}
                                    variant="ghost"
                                >
                                    <ChevronLeftIcon aria-hidden="true" />
                                    Previous
                                </Button>
                            </PaginationItem>

                            {showLeftEllipsis && (
                                <PaginationItem>
                                    <PaginationEllipsis />
                                </PaginationItem>
                            )}

                            {pages.map((page) => {
                                const isActive = page === table.getState().pagination.pageIndex + 1;

                                return (
                                    <PaginationItem key={page}>
                                        <Button
                                            aria-current={isActive ? 'page' : undefined}
                                            className={`${!isActive && 'bg-primary/10 text-primary hover:bg-primary/20 focus-visible:ring-primary/20 dark:focus-visible:ring-primary/40'}`}
                                            onClick={() => table.setPageIndex(page - 1)}
                                            size="icon"
                                        >
                                            {page}
                                        </Button>
                                    </PaginationItem>
                                );
                            })}

                            {showRightEllipsis && (
                                <PaginationItem>
                                    <PaginationEllipsis />
                                </PaginationItem>
                            )}

                            <PaginationItem>
                                <Button
                                    aria-label="Go to next page"
                                    className="disabled:pointer-events-none disabled:opacity-50"
                                    disabled={!table.getCanNextPage()}
                                    onClick={() => table.nextPage()}
                                    variant="ghost"
                                >
                                    Next
                                    <ChevronRightIcon aria-hidden="true" />
                                </Button>
                            </PaginationItem>
                        </PaginationContent>
                    </Pagination>
                </div>
            </div>
        </div>
    );
}

function Filter<TData>({ column }: Readonly<{ column: Column<TData, unknown> }>) {
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

export default DataTable;
