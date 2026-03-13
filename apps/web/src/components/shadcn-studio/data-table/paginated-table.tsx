import type { ColumnDef, PaginationState, SortingState } from '@tanstack/react-table';

import {
    flexRender,
    getCoreRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from '@tanstack/react-table';
import {
    ChevronDownIcon,
    ChevronFirstIcon,
    ChevronLastIcon,
    ChevronLeftIcon,
    ChevronRightIcon,
    ChevronUpIcon,
} from 'lucide-react';
import { useEffect, useId, useState } from 'react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Pagination, PaginationContent, PaginationItem } from '@/components/ui/pagination';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { cn } from '@/lib/utils';

type Item = {
    availability: 'In Stock' | 'Limited' | 'Out of Stock';
    price: string;
    product_name: string;
};

const columns: ColumnDef<Item>[] = [
    {
        cell: ({ row }) => (
            <Checkbox
                aria-label="Select row"
                checked={row.getIsSelected()}
                onCheckedChange={value => row.toggleSelected(!!value)}
            />
        ),
        enableSorting: false,
        header: ({ table }) => (
            <Checkbox
                aria-label="Select all"
                checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate')}
                onCheckedChange={value => table.toggleAllPageRowsSelected(!!value)}
            />
        ),
        id: 'select',
        size: 28,
    },
    {
        accessorKey: 'product_name',
        cell: ({ row }) => <div className="font-medium">{row.getValue('product_name')}</div>,
        header: 'Product Name',
    },
    {
        accessorKey: 'price',
        cell: ({ row }) => <div className="font-medium">{row.getValue('price')}</div>,
        header: 'Price',
    },
    {
        accessorKey: 'availability',
        cell: ({ row }) => {
            const availability = row.getValue('availability') as string;

            const styles = {
                'In Stock':
                    'bg-green-600/10 text-green-600 focus-visible:ring-green-600/20 dark:bg-green-400/10 dark:text-green-400 dark:focus-visible:ring-green-400/40 [a&]:hover:bg-green-600/5 dark:[a&]:hover:bg-green-400/5',
                'Limited':
                    'bg-amber-600/10 text-amber-600 focus-visible:ring-amber-600/20 dark:bg-amber-400/10 dark:text-amber-400 dark:focus-visible:ring-amber-400/40 [a&]:hover:bg-amber-600/5 dark:[a&]:hover:bg-amber-400/5',
                'Out of Stock':
                    'bg-destructive/10 [a&]:hover:bg-destructive/5 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 text-destructive',
            }[availability];

            return (
                <Badge className={(cn('border-none focus-visible:outline-none'), styles)}>{row.getValue('availability')}</Badge>
            );
        },
        header: 'Availability',
    },
];

const PaginatedTable = () => {
    const id = useId();

    const [pagination, setPagination] = useState<PaginationState>({
        pageIndex: 0,
        pageSize: 5,
    });

    const [sorting, setSorting] = useState<SortingState>([
        {
            desc: false,
            id: 'product_name',
        },
    ]);

    const [data, setData] = useState<Item[]>([]);

    useEffect(() => {
        async function fetchPosts() {
            const res = await fetch('https://cdn.jsdelivr.net/gh/themeselection/fy-assets/assets/json/mobile-stock.json');

            if (!res.ok) {
                throw new Error('Failed to fetch data');
            }

            const items = await res.json();

            const data = await items.data;

            setData([...data, ...data]);
        }

        fetchPosts();
    }, []);

    const table = useReactTable({
        columns,
        data,
        enableSortingRemoval: false,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        onPaginationChange: setPagination,
        onSortingChange: setSorting,
        state: {
            pagination,
            sorting,
        },
    });

    return (
        <div className="space-y-4 md:w-full">
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map(headerGroup => (
                            <TableRow className="hover:bg-transparent" key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead className="h-11" key={header.id} style={{ width: `${header.getSize()}px` }}>
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
                                        <TableRow data-state={row.getIsSelected() && 'selected'} key={row.id}>
                                            {row.getVisibleCells().map(cell => (
                                                <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
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

            <div className="flex items-center justify-between gap-8">
                <div className="flex items-center gap-3">
                    <Label className="max-sm:sr-only" htmlFor={id}>
                        Rows per page
                    </Label>
                    <Select
                        onValueChange={(value) => {
                            table.setPageSize(Number(value));
                        }}
                        value={table.getState().pagination.pageSize.toString()}
                    >
                        <SelectTrigger className="w-fit whitespace-nowrap" id={id}>
                            <SelectValue placeholder="Select number of results" />
                        </SelectTrigger>
                        <SelectContent className="[&_*[role=option]]:pr-8 [&_*[role=option]]:pl-2 [&_*[role=option]>span]:right-2 [&_*[role=option]>span]:left-auto">
                            {[5, 10, 25, 50].map(pageSize => (
                                <SelectItem key={pageSize} value={pageSize.toString()}>
                                    {pageSize}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                <div className="text-muted-foreground flex grow justify-end text-sm whitespace-nowrap">
                    <p aria-live="polite" className="text-muted-foreground text-sm whitespace-nowrap">
                        <span className="text-foreground">
                            {table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1}
                            -
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
                        <span className="text-foreground">{table.getRowCount().toString()}</span>
                    </p>
                </div>

                <div>
                    <Pagination>
                        <PaginationContent>
                            <PaginationItem>
                                <Button
                                    aria-label="Go to first page"
                                    className="disabled:pointer-events-none disabled:opacity-50"
                                    disabled={!table.getCanPreviousPage()}
                                    onClick={() => table.firstPage()}
                                    size="icon"
                                    variant="outline"
                                >
                                    <ChevronFirstIcon aria-hidden="true" />
                                </Button>
                            </PaginationItem>

                            <PaginationItem>
                                <Button
                                    aria-label="Go to previous page"
                                    className="disabled:pointer-events-none disabled:opacity-50"
                                    disabled={!table.getCanPreviousPage()}
                                    onClick={() => table.previousPage()}
                                    size="icon"
                                    variant="outline"
                                >
                                    <ChevronLeftIcon aria-hidden="true" />
                                </Button>
                            </PaginationItem>

                            <PaginationItem>
                                <Button
                                    aria-label="Go to next page"
                                    className="disabled:pointer-events-none disabled:opacity-50"
                                    disabled={!table.getCanNextPage()}
                                    onClick={() => table.nextPage()}
                                    size="icon"
                                    variant="outline"
                                >
                                    <ChevronRightIcon aria-hidden="true" />
                                </Button>
                            </PaginationItem>

                            <PaginationItem>
                                <Button
                                    aria-label="Go to last page"
                                    className="disabled:pointer-events-none disabled:opacity-50"
                                    disabled={!table.getCanNextPage()}
                                    onClick={() => table.lastPage()}
                                    size="icon"
                                    variant="outline"
                                >
                                    <ChevronLastIcon aria-hidden="true" />
                                </Button>
                            </PaginationItem>
                        </PaginationContent>
                    </Pagination>
                </div>
            </div>
            <p className="text-muted-foreground mt-4 text-center text-sm">Paginated data table </p>
        </div>
    );
};

export default PaginatedTable;
