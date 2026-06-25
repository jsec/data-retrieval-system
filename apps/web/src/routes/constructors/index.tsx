import type { SortingFn, SortingState } from '@tanstack/react-table';

import { Box, Card, Group, Progress, Stack, Text, Title } from '@mantine/core';
import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import {
    createColumnHelper,
    getCoreRowModel,
    getSortedRowModel,
    useReactTable,
} from '@tanstack/react-table';
import { useMemo, useState } from 'react';

import type { AllTimeConstructor } from '#/data/types';

import { DataTable } from '#/components/data-table';
import { Pill, TrophyCount } from '#/components/ui';
import { constructorsIndexQuery } from '#/data/queries';

export const Route = createFileRoute('/constructors/')({
    component: Constructors,
    loader: async ({ context }) => {
        await context.queryClient.ensureQueryData(constructorsIndexQuery());
        return { crumbs: [{ label: 'Constructors' }] };
    },
});

type Sort = 'podiums' | 'poles' | 'titles' | 'wins';

const SORTS: { key: Sort; label: string }[] = [
    { key: 'titles', label: 'Titles' },
    { key: 'wins', label: 'Wins' },
    { key: 'poles', label: 'Poles' },
    { key: 'podiums', label: 'Podiums' },
];

const byTitles: SortingFn<AllTimeConstructor> = (a, b) =>
    a.original.titles - b.original.titles || a.original.wins - b.original.wins;

const ch = createColumnHelper<AllTimeConstructor>();

function Constructors() {
    const { data } = useSuspenseQuery(constructorsIndexQuery());
    const [sort, setSort] = useState<Sort>('titles');

    const maxWins = useMemo(() => Math.max(...data.map(c => c.wins)), [data]);

    const columns = useMemo(
        () => [
            ch.display({ header: '#', id: 'rank', meta: { ordinal: true, width: '4%' } }),
            ch.accessor('name', {
                cell: (info) => {
                    const c = info.row.original;
                    return (
                        <Group gap={11} wrap="nowrap">
                            <Box style={{ background: c.color, borderRadius: 3, flexShrink: 0, height: 26, width: 6 }} />
                            <Text fw={700} style={{ fontSize: 14, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                {c.name}
                            </Text>
                            {c.active
                                ? (
                                        <Text
                                            span
                                            style={{
                                                background: 'var(--mantine-color-green-0)',
                                                borderRadius: 4,
                                                color: 'var(--mantine-color-green-7)',
                                                flexShrink: 0,
                                                fontSize: 9.5,
                                                fontWeight: 700,
                                                letterSpacing: '0.5px',
                                                padding: '2px 6px',
                                            }}
                                        >
                                            ACTIVE
                                        </Text>
                                    )
                                : null}
                        </Group>
                    );
                },
                header: 'CONSTRUCTOR',
                meta: { width: '38%' },
            }),
            ch.accessor('years', {
                cell: info => (
                    <Text c="dimmed" className="f1-num" style={{ fontSize: 12.5 }}>
                        {info.getValue()}
                    </Text>
                ),
                header: 'YEARS',
                meta: { width: '10%' },
            }),
            ch.accessor('titles', {
                cell: info => (
                    <Group gap={0} justify="center">
                        <TrophyCount count={info.getValue()} size={12} />
                    </Group>
                ),
                header: 'TITLES',
                id: 'titles',
                meta: { align: 'center', width: '9%' },
                sortingFn: byTitles,
            }),
            ch.accessor('wins', {
                cell: info => (
                    <Group gap={10} wrap="nowrap">
                        <Text className="f1-num" fw={800} style={{ fontSize: 13.5, width: 34 }}>
                            {info.getValue()}
                        </Text>
                        <Progress
                            radius="xl"
                            size={6}
                            style={{ flex: 1, maxWidth: 150 }}
                            styles={{ section: { background: info.row.original.color } }}
                            value={(info.getValue() / maxWins) * 100}
                        />
                    </Group>
                ),
                header: 'WINS',
                id: 'wins',
                meta: { width: '23%' },
            }),
            ch.accessor('poles', {
                cell: info => (
                    <Text c="dimmed" className="f1-num">
                        {info.getValue()}
                    </Text>
                ),
                header: 'POLES',
                meta: { align: 'center', width: '8%' },
            }),
            ch.accessor('podiums', {
                cell: info => (
                    <Text c="dimmed" className="f1-num">
                        {info.getValue()}
                    </Text>
                ),
                header: 'PODIUMS',
                meta: { align: 'center', width: '8%' },
            }),
        ],
        [maxWins],
    );

    const sorting: SortingState = [{ desc: true, id: sort }];

    const table = useReactTable({
        columns,
        data,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        state: { sorting },
    });

    return (
        <Stack gap="md">
            <Group align="flex-end" justify="space-between">
                <Box>
                    <Title order={1} style={{ fontSize: 28 }}>
                        Constructors
                    </Title>
                    <Text c="dimmed" mt={4} size="13px">
                        All-time index · Constructors&apos; Championships and records since 1958
                    </Text>
                </Box>
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
                <DataTable px={20} table={table} />
            </Card>
        </Stack>
    );
}
