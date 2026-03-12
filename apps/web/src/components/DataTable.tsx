'use client'

import { useId, useMemo, useState } from 'react'

import {
    ChevronDownIcon,
    ChevronLeftIcon,
    ChevronRightIcon,
    ChevronUpIcon,
} from 'lucide-react'

import type { Column, ColumnDef, ColumnFiltersState, PaginationState, RowData } from '@tanstack/react-table'
import {
    flexRender,
    getCoreRowModel,
    getFacetedMinMaxValues,
    getFacetedRowModel,
    getPaginationRowModel,
    getFacetedUniqueValues,
    getFilteredRowModel,
    getSortedRowModel,
    useReactTable
} from '@tanstack/react-table'

import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem } from '@/components/ui/pagination'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

import { usePagination } from '@/hooks/use-pagination'

import { cn } from '@/lib/utils'

declare module '@tanstack/react-table' {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    interface ColumnMeta<TData extends RowData, TValue> {
        filterVariant?: 'text' | 'range' | 'select'
    }
}

type TableProps<TData> = {
    data: TData[];
    columns: ColumnDef<TData>[];
}

function DataTable<TData>({ data, columns }: TableProps<TData>) {
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])

    const pageSize = 5

    const [pagination, setPagination] = useState<PaginationState>({
        pageIndex: 0,
        pageSize: pageSize
    })

    const table = useReactTable({
        data,
        columns,
        state: {
            columnFilters,
            pagination
        },
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFacetedRowModel: getFacetedRowModel(),
        getFacetedUniqueValues: getFacetedUniqueValues(),
        getFacetedMinMaxValues: getFacetedMinMaxValues(),
        enableSortingRemoval: false,
        getPaginationRowModel: getPaginationRowModel(),
        onPaginationChange: setPagination
    })

    const { pages, showLeftEllipsis, showRightEllipsis } = usePagination({
        currentPage: table.getState().pagination.pageIndex + 1,
        totalPages: table.getPageCount(),
        paginationItemsToDisplay: 2
    })

    return (
        <div className='w-full'>
            <div className='border-b'>
                <div className='flex flex-col gap-4 p-6'>
                    <span className='text-xl font-semibold'>Filter</span>
                    <div className='grid grid-cols-1 gap-6 max-md:*:last:col-span-full sm:grid-cols-2 md:grid-cols-3'>
                        <Filter column={table.getColumn('role')!} />
                        <Filter column={table.getColumn('plan')!} />
                        <Filter column={table.getColumn('status')!} />
                    </div>
                </div>
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map(headerGroup => (
                            <TableRow key={headerGroup.id} className='h-14 border-t'>
                                {headerGroup.headers.map(header => {
                                    return (
                                        <TableHead
                                            key={header.id}
                                            style={{ width: `${header.getSize()}px` }}
                                            className='text-muted-foreground first:pl-4 last:px-4 last:text-center'
                                        >
                                            {header.isPlaceholder ? null : header.column.getCanSort() ? (
                                                <div
                                                    className={cn(
                                                        header.column.getCanSort() &&
                                                        'flex h-full cursor-pointer items-center justify-between gap-2 select-none'
                                                    )}
                                                    onClick={header.column.getToggleSortingHandler()}
                                                    onKeyDown={e => {
                                                        if (header.column.getCanSort() && (e.key === 'Enter' || e.key === ' ')) {
                                                            e.preventDefault()
                                                            header.column.getToggleSortingHandler()?.(e)
                                                        }
                                                    }}
                                                    tabIndex={header.column.getCanSort() ? 0 : undefined}
                                                >
                                                    {flexRender(header.column.columnDef.header, header.getContext())}
                                                    {{
                                                        asc: <ChevronUpIcon className='shrink-0 opacity-60' size={16} aria-hidden='true' />,
                                                        desc: <ChevronDownIcon className='shrink-0 opacity-60' size={16} aria-hidden='true' />
                                                    }[header.column.getIsSorted() as string] ?? null}
                                                </div>
                                            ) : (
                                                flexRender(header.column.columnDef.header, header.getContext())
                                            )}
                                        </TableHead>
                                    )
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map(row => (
                                <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'} className='hover:bg-transparent'>
                                    {row.getVisibleCells().map(cell => (
                                        <TableCell key={cell.id} className='h-14 first:w-12.5 first:pl-4 last:w-29 last:px-4'>
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className='h-24 text-center'>
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            <div className='flex items-center justify-between gap-3 px-6 py-4 max-sm:flex-col md:max-lg:flex-col'>
                <p className='text-muted-foreground text-sm whitespace-nowrap' aria-live='polite'>
                    Showing{' '}
                    <span>
                        {table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1} to{' '}
                        {Math.min(
                            Math.max(
                                table.getState().pagination.pageIndex * table.getState().pagination.pageSize +
                                table.getState().pagination.pageSize,
                                0
                            ),
                            table.getRowCount()
                        )}
                    </span>{' '}
                    of <span>{table.getRowCount().toString()} entries</span>
                </p>

                <div>
                    <Pagination>
                        <PaginationContent>
                            <PaginationItem>
                                <Button
                                    className='disabled:pointer-events-none disabled:opacity-50'
                                    variant={'ghost'}
                                    onClick={() => table.previousPage()}
                                    disabled={!table.getCanPreviousPage()}
                                    aria-label='Go to previous page'
                                >
                                    <ChevronLeftIcon aria-hidden='true' />
                                    Previous
                                </Button>
                            </PaginationItem>

                            {showLeftEllipsis && (
                                <PaginationItem>
                                    <PaginationEllipsis />
                                </PaginationItem>
                            )}

                            {pages.map(page => {
                                const isActive = page === table.getState().pagination.pageIndex + 1

                                return (
                                    <PaginationItem key={page}>
                                        <Button
                                            size='icon'
                                            className={`${!isActive && 'bg-primary/10 text-primary hover:bg-primary/20 focus-visible:ring-primary/20 dark:focus-visible:ring-primary/40'}`}
                                            onClick={() => table.setPageIndex(page - 1)}
                                            aria-current={isActive ? 'page' : undefined}
                                        >
                                            {page}
                                        </Button>
                                    </PaginationItem>
                                )
                            })}

                            {showRightEllipsis && (
                                <PaginationItem>
                                    <PaginationEllipsis />
                                </PaginationItem>
                            )}

                            <PaginationItem>
                                <Button
                                    className='disabled:pointer-events-none disabled:opacity-50'
                                    variant={'ghost'}
                                    onClick={() => table.nextPage()}
                                    disabled={!table.getCanNextPage()}
                                    aria-label='Go to next page'
                                >
                                    Next
                                    <ChevronRightIcon aria-hidden='true' />
                                </Button>
                            </PaginationItem>
                        </PaginationContent>
                    </Pagination>
                </div>
            </div>
        </div>
    )
}


function Filter({ column }: { column: Column<any, unknown> }) {
    const id = useId()
    const columnFilterValue = column.getFilterValue()
    const { filterVariant } = column.columnDef.meta ?? {}
    const columnHeader = typeof column.columnDef.header === 'string' ? column.columnDef.header : ''

    const sortedUniqueValues = useMemo(() => {
        if (filterVariant === 'range') return []

        const values = Array.from(column.getFacetedUniqueValues().keys())

        const flattenedValues = values.reduce((acc: string[], curr) => {
            if (Array.isArray(curr)) {
                return [...acc, ...curr]
            }

            return [...acc, curr]
        }, [])

        return Array.from(new Set(flattenedValues)).sort()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [column.getFacetedUniqueValues(), filterVariant])

    return (
        <div className='w-full space-y-2'>
            <Label htmlFor={`${id}-select`}>Select {columnHeader}</Label>
            <Select
                value={columnFilterValue?.toString() ?? 'all'}
                onValueChange={value => {
                    column.setFilterValue(value === 'all' ? undefined : value)
                }}
            >
                <SelectTrigger id={`${id}-select`} className='w-full capitalize'>
                    <SelectValue placeholder={`Select ${columnHeader}`} />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value='all'>All</SelectItem>
                    {sortedUniqueValues.map(value => (
                        <SelectItem key={String(value)} value={String(value)} className='capitalize'>
                            {String(value)}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    )
}


export default DataTable;
