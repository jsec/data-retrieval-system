import type { LinkProps } from '@tanstack/react-router';
import type { RowData, Table } from '@tanstack/react-table';

import { Box, Table as MantineTable, Text } from '@mantine/core';
import { Link, useNavigate } from '@tanstack/react-router';
import { flexRender } from '@tanstack/react-table';

declare module '@tanstack/react-table' {
    // eslint-disable-next-line @typescript-eslint/consistent-type-definitions, @typescript-eslint/no-unused-vars
    interface ColumnMeta<TData extends RowData, TValue> {
        align?: 'center' | 'right';
        ordinal?: boolean;
        width: string;
    }
}

const HEADER_BG = 'light-dark(var(--mantine-color-gray-0), var(--mantine-color-dark-6))';
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
        <MantineTable.ScrollContainer minWidth={720} type="native">
            <MantineTable
                highlightOnHover
                horizontalSpacing={px}
                layout="fixed"
                verticalSpacing={rowPy}
            >
                <colgroup>
                    {columns.map(column => (
                        <col key={column.id} style={{ width: column.columnDef.meta?.width }} />
                    ))}
                </colgroup>
                <MantineTable.Thead bg={HEADER_BG}>
                    <MantineTable.Tr>
                        {headers.map(h => (
                            <MantineTable.Th
                                key={h.id}
                                scope="col"
                                style={{
                                    color: 'var(--mantine-color-dimmed)',
                                    fontSize: 10.5,
                                    fontWeight: 700,
                                    letterSpacing: '0.5px',
                                    paddingBlock: headerPy,
                                    textAlign: h.column.columnDef.meta?.align ?? 'left',
                                }}
                            >
                                {h.isPlaceholder
                                    ? null
                                    : flexRender(h.column.columnDef.header, h.getContext())}
                            </MantineTable.Th>
                        ))}
                    </MantineTable.Tr>
                </MantineTable.Thead>
                <MantineTable.Tbody>
                    {rows.map((row, i) => {
                        const visibleCells = row.getVisibleCells();
                        const link = rowLink?.(row.original);
                        const linkCellIndex = link
                            ? visibleCells.findIndex(cell => !cell.column.columnDef.meta?.ordinal)
                            : -1;

                        return (
                            <MantineTable.Tr
                                aria-label={link ? 'Open details' : undefined}
                                className={link ? 'f1-row f1-row--clickable' : 'f1-row'}
                                key={row.id}
                                onClick={link ? () => void navigate(link) : undefined}
                            >
                                {visibleCells.map((cell, index) => {
                                    const meta = cell.column.columnDef.meta;
                                    const align = meta?.align ?? 'left';
                                    const content = meta?.ordinal
                                        ? (
                                                <Text c="dimmed" className="f1-num" fw={700} style={{ textAlign: align }}>
                                                    {i + 1}
                                                </Text>
                                            )
                                        : (
                                                <Box style={{ minWidth: 0, textAlign: align }}>
                                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                                </Box>
                                            );

                                    return (
                                        <MantineTable.Td key={cell.id} style={{ minWidth: 0, textAlign: align }}>
                                            {link && index === linkCellIndex
                                                ? (
                                                        <Link
                                                            {...link}
                                                            onClick={event => event.stopPropagation()}
                                                            style={LINK_STYLE}
                                                        >
                                                            {content}
                                                        </Link>
                                                    )
                                                : content}
                                        </MantineTable.Td>
                                    );
                                })}
                            </MantineTable.Tr>
                        );
                    })}
                </MantineTable.Tbody>
            </MantineTable>
        </MantineTable.ScrollContainer>
    );
}
