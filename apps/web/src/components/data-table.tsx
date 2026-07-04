import type { LinkProps } from '@tanstack/react-router';
import type { RowData, Table } from '@tanstack/react-table';

import { Link, useNavigate } from '@tanstack/react-router';
import { flexRender } from '@tanstack/react-table';

import { cn } from '#/lib/utils';
import {
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableHeader,
    Table as TablePrimitive,
    TableRow,
} from '#/components/ui/table';

declare module '@tanstack/react-table' {
    // eslint-disable-next-line @typescript-eslint/consistent-type-definitions, @typescript-eslint/no-unused-vars
    interface ColumnMeta<TData extends RowData, TValue> {
        align?: 'center' | 'right';
        ordinal?: boolean;
        width: string;
    }
}

const LINK_STYLE = { color: 'inherit', display: 'block', textDecoration: 'none' } as const;

type DataTableProps<T> = {
    headerPy?: number;
    px?: number;
    rowLink?: (row: T) => LinkProps | undefined;
    rowPy?: number;
    table: Table<T>;
};

export function DataTable<T>({
    headerPy = 12,
    px = 18,
    rowLink,
    rowPy = 10,
    table,
}: DataTableProps<T>) {
    const navigate = useNavigate();
    const columns = table.getVisibleLeafColumns();
    const headers = table.getHeaderGroups()[0]?.headers ?? [];
    const rows = table.getRowModel().rows;

    return (
        <TableContainer>
            <TablePrimitive>
                <colgroup>
                    {columns.map(column => (
                        <col key={column.id} style={{ width: column.columnDef.meta?.width }} />
                    ))}
                </colgroup>
                <TableHeader>
                    <tr>
                        {headers.map(h => (
                            <TableHead
                                key={h.id}
                                scope="col"
                                style={{
                                    paddingBlock: headerPy,
                                    paddingInline: px,
                                    textAlign: h.column.columnDef.meta?.align ?? 'left',
                                }}
                            >
                                {!h.isPlaceholder && flexRender(h.column.columnDef.header, h.getContext())}
                            </TableHead>
                        ))}
                    </tr>
                </TableHeader>
                <TableBody>
                    {rows.map((row, i) => {
                        const visibleCells = row.getVisibleCells();
                        const link = rowLink?.(row.original);
                        const linkCellIndex = link
                            ? visibleCells.findIndex(cell => !cell.column.columnDef.meta?.ordinal)
                            : -1;

                        return (
                            <TableRow
                                className={cn('f1-row', link && 'f1-row--clickable')}
                                key={row.id}
                                onClick={link ? () => void navigate(link) : undefined}
                            >
                                {visibleCells.map((cell, index) => {
                                    const meta = cell.column.columnDef.meta;
                                    const align = meta?.align ?? 'left';

                                    let content: React.ReactNode;
                                    if (meta?.ordinal) {
                                        content = (
                                            <span className="f1-num f1-text-muted" style={{ display: 'block', fontWeight: 700, textAlign: align }}>
                                                {i + 1}
                                            </span>
                                        );
                                    } else {
                                        content = (
                                            <div style={{ minWidth: 0, textAlign: align }}>
                                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                            </div>
                                        );
                                    }

                                    return (
                                        <TableCell
                                            key={cell.id}
                                            style={{ paddingBlock: rowPy, paddingInline: px, textAlign: align }}
                                        >
                                            {link && index === linkCellIndex
                                                ? (
                                                        <Link
                                                            {...link}
                                                            aria-label="Open details"
                                                            onClick={event => event.stopPropagation()}
                                                            style={LINK_STYLE}
                                                        >
                                                            {content}
                                                        </Link>
                                                    )
                                                : content}
                                        </TableCell>
                                    );
                                })}
                            </TableRow>
                        );
                    })}
                </TableBody>
            </TablePrimitive>
        </TableContainer>
    );
}
