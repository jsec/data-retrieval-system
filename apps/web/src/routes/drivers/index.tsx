import type { FilterFn, SortingFn, SortingState } from '@tanstack/react-table';
import type { ReactNode } from 'react';

import { Box, Card, Group, Stack, Text, TextInput, Title } from '@mantine/core';
import { CaretRightIcon, MagnifyingGlassIcon } from '@phosphor-icons/react';
import { rankItem } from '@tanstack/match-sorter-utils';
import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import {
    createColumnHelper,
    getCoreRowModel,
    getFilteredRowModel,
    getSortedRowModel,
    useReactTable,
} from '@tanstack/react-table';
import { useCallback, useDeferredValue, useMemo, useState } from 'react';

import type { AllTimeDriver } from '#/data/types';

import { DataTable } from '#/components/data-table';
import { DriverAvatar, Pill, TrophyCount } from '#/components/ui';
import { allTimeDriversQuery } from '#/data/queries';

export const Route = createFileRoute('/drivers/')({
    component: DriversIndex,
    loader: async ({ context }) => {
        await context.queryClient.ensureQueryData(allTimeDriversQuery());
        return { crumbs: [{ label: 'Drivers' }] };
    },
});

type Category = 'active' | 'all' | 'champions';
type Sort = 'name' | 'poles' | 'starts' | 'titles' | 'wins';

const CATEGORIES: { key: Category; label: string }[] = [
    { key: 'all', label: 'All drivers' },
    { key: 'champions', label: 'World Champions' },
    { key: 'active', label: 'Active' },
];

const SORTS: { key: Sort; label: string }[] = [
    { key: 'titles', label: 'Titles' },
    { key: 'wins', label: 'Wins' },
    { key: 'poles', label: 'Poles' },
    { key: 'starts', label: 'Starts' },
    { key: 'name', label: 'Name' },
];

const byTitles: SortingFn<AllTimeDriver> = (a, b) =>
    a.original.titles - b.original.titles || a.original.wins - b.original.wins;
const byWins: SortingFn<AllTimeDriver> = (a, b) =>
    a.original.wins - b.original.wins || a.original.podiums - b.original.podiums;

const fuzzy: FilterFn<AllTimeDriver> = (row, _columnId, value, addMeta) => {
    const ranked = rankItem(`${row.original.name} ${row.original.nat}`, value as string);
    addMeta({ itemRank: ranked });
    return ranked.passed;
};

const ch = createColumnHelper<AllTimeDriver>();
const coreRowModel = getCoreRowModel<AllTimeDriver>();
const filteredRowModel = getFilteredRowModel<AllTimeDriver>();
const sortedRowModel = getSortedRowModel<AllTimeDriver>();

const DimNum = ({ children }: { children: ReactNode }) => (
    <Text c="dimmed" className="f1-num">
        {children}
    </Text>
);

const columns = [
    ch.display({ header: '#', id: 'rank', meta: { ordinal: true, width: '4%' } }),
    ch.accessor('name', {
        cell: (info) => {
            const d = info.row.original;
            return (
                <Group gap={11} wrap="nowrap">
                    <DriverAvatar code={d.code} color={d.color} />
                    <Text fw={600} style={{ fontSize: 13.5, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {d.name}
                    </Text>
                    <CaretRightIcon color="var(--mantine-color-gray-5)" size={13} />
                </Group>
            );
        },
        header: 'DRIVER',
        id: 'name',
        meta: { width: '45%' },
        sortingFn: 'text',
    }),
    ch.accessor('years', {
        cell: info => (
            <Text c="dimmed" className="f1-num" style={{ fontSize: 12.5 }}>
                {info.getValue()}
            </Text>
        ),
        header: 'YEARS',
        meta: { width: '11%' },
    }),
    ch.accessor('starts', {
        cell: info => <DimNum>{info.getValue()}</DimNum>,
        header: 'STARTS',
        meta: { align: 'center', width: '8%' },
    }),
    ch.accessor('wins', {
        cell: info => (
            <Text className="f1-num" fw={700}>
                {info.getValue()}
            </Text>
        ),
        header: 'WINS',
        id: 'wins',
        meta: { align: 'center', width: '7%' },
        sortingFn: byWins,
    }),
    ch.accessor('poles', {
        cell: info => <DimNum>{info.getValue()}</DimNum>,
        header: 'POLES',
        meta: { align: 'center', width: '7%' },
    }),
    ch.accessor('podiums', {
        cell: info => <DimNum>{info.getValue()}</DimNum>,
        header: 'PODIUMS',
        meta: { align: 'center', width: '10%' },
    }),
    ch.accessor('titles', {
        cell: info => (
            <Group gap={0} justify="center">
                <TrophyCount count={info.getValue()} />
            </Group>
        ),
        header: 'TITLES',
        id: 'titles',
        meta: { align: 'center', width: '8%' },
        sortingFn: byTitles,
    }),
];

function DriversIndex() {
    const { data: drivers } = useSuspenseQuery(allTimeDriversQuery());
    const [category, setCategory] = useState<Category>('all');
    const [sort, setSort] = useState<Sort>('titles');
    const [search, setSearch] = useState('');
    const deferredSearch = useDeferredValue(search);

    const data = useMemo(
        () =>
            drivers.filter(
                d =>
                    category === 'all'
                    || (category === 'champions' ? d.titles > 0 : d.active),
            ),
        [drivers, category],
    );

    const sorting: SortingState = useMemo(
        () => [{ desc: sort !== 'name', id: sort }],
        [sort],
    );

    const table = useReactTable({
        columns,
        data,
        getCoreRowModel: coreRowModel,
        getFilteredRowModel: filteredRowModel,
        getSortedRowModel: sortedRowModel,
        globalFilterFn: fuzzy,
        state: { globalFilter: deferredSearch, sorting },
    });

    const shown = table.getRowModel().rows.length;
    const getDriverLink = useCallback(
        (d: AllTimeDriver) => ({ params: { driverId: String(d.id) }, to: '/drivers/$driverId' }) as const,
        [],
    );

    return (
        <Stack gap="md">
            <Box>
                <Title order={1} style={{ fontSize: 28 }}>
                    Drivers
                </Title>
                <Text c="dimmed" mt={4} size="13px">
                    {'All-time index · career statistics across every season · '}
                    <Text component="span" fw={700}>
                        {shown}
                    </Text>
                    {` of ${drivers.length} shown`}
                </Text>
            </Box>

            <Group align="center" gap={12} wrap="wrap">
                <TextInput
                    leftSection={<MagnifyingGlassIcon size={15} />}
                    onChange={e => setSearch(e.currentTarget.value)}
                    placeholder="Search name or nationality…"
                    radius="md"
                    value={search}
                    w={260}
                />
                <Group gap={6}>
                    {CATEGORIES.map(c => (
                        <Pill active={category === c.key} key={c.key} onClick={() => setCategory(c.key)}>
                            {c.label}
                        </Pill>
                    ))}
                </Group>
                <Box style={{ flex: 1 }} />
                <Group align="center" gap={4}>
                    <Text c="dimmed" fw={600} mr={4} style={{ fontSize: 11 }}>
                        SORT
                    </Text>
                    {SORTS.map(s => (
                        <Pill active={sort === s.key} key={s.key} onClick={() => setSort(s.key)} variant="subtle">
                            {s.label}
                        </Pill>
                    ))}
                </Group>
            </Group>

            <Card padding={0} radius="md" withBorder>
                <DataTable
                    rowLink={getDriverLink}
                    table={table}
                />
            </Card>
        </Stack>
    );
}
