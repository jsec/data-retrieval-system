import type { ReactNode } from 'react';

import {
    Box,
    Card,
    Group,
    Stack,
    Text,
    TextInput,
    Title,
    UnstyledButton,
} from '@mantine/core';
import { CaretRightIcon, MagnifyingGlassIcon } from '@phosphor-icons/react';
import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute, Link } from '@tanstack/react-router';
import { useMemo, useState } from 'react';

import type { AllTimeDriver } from '#/data/types';

import { DriverAvatar, TrophyCount } from '#/components/ui';
import { allTimeDriversQuery } from '#/data/queries';

export const Route = createFileRoute('/drivers/')({
    component: DriversIndex,
    loader: async ({ context }) => {
        await context.queryClient.ensureQueryData(allTimeDriversQuery());
        return { crumbs: [{ label: 'Drivers' }] };
    },
});

const COLS = '34px minmax(150px,1fr) 86px 56px 52px 52px 70px 54px';

type Filter = 'active' | 'all' | 'champions';
type Sort = 'name' | 'poles' | 'starts' | 'titles' | 'wins';

const FILTERS: { key: Filter; label: string }[] = [
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

const SORTERS: Record<Sort, (a: AllTimeDriver, b: AllTimeDriver) => number> = {
    name: (a, b) => a.name.localeCompare(b.name),
    poles: (a, b) => b.poles - a.poles,
    starts: (a, b) => b.starts - a.starts,
    titles: (a, b) => b.titles - a.titles || b.wins - a.wins,
    wins: (a, b) => b.wins - a.wins || b.podiums - a.podiums,
};

function Chip({
    active,
    children,
    onClick,
    variant,
}: {
    active: boolean;
    children: ReactNode;
    onClick: () => void;
    variant: 'solid' | 'subtle';
}) {
    const solid = variant === 'solid';
    return (
        <UnstyledButton
            onClick={onClick}
            style={{
                background: active
                    ? (solid
                            ? 'var(--mantine-color-gray-9)'
                            : 'var(--mantine-color-blue-0)')
                    : (solid
                            ? 'var(--mantine-color-body)'
                            : 'transparent'),
                border: solid ? '1px solid var(--mantine-color-default-border)' : 'none',
                borderColor: active && solid ? 'var(--mantine-color-gray-9)' : undefined,
                borderRadius: solid ? 8 : 7,
                color: active
                    ? (solid
                            ? '#fff'
                            : 'var(--mantine-color-blue-7)')
                    : 'var(--mantine-color-dimmed)',
                fontSize: solid ? 12.5 : 12,
                fontWeight: 600,
                padding: solid ? '7px 14px' : '6px 11px',
            }}
        >
            {children}
        </UnstyledButton>
    );
}

function DriversIndex() {
    const { data: drivers } = useSuspenseQuery(allTimeDriversQuery());
    const [search, setSearch] = useState('');
    const [filter, setFilter] = useState<Filter>('all');
    const [sort, setSort] = useState<Sort>('titles');

    const rows = useMemo(() => {
        const q = search.trim().toLowerCase();
        let arr = drivers.filter(
            d => !q || d.name.toLowerCase().includes(q) || d.nat.toLowerCase().includes(q),
        );
        if (filter === 'champions') arr = arr.filter(d => d.titles > 0);
        else if (filter === 'active') arr = arr.filter(d => d.active);
        return [...arr].sort(SORTERS[sort]);
    }, [drivers, search, filter, sort]);

    return (
        <Stack gap="md">
            <Box>
                <Title order={1} style={{ fontSize: 28 }}>
                    Drivers
                </Title>
                <Text c="dimmed" mt={4} size="13px">
                    {'All-time index · career statistics across every season · '}
                    <Text component="span" fw={700}>
                        {rows.length}
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
                    {FILTERS.map(f => (
                        <Chip active={filter === f.key} key={f.key} onClick={() => setFilter(f.key)} variant="solid">
                            {f.label}
                        </Chip>
                    ))}
                </Group>
                <Box style={{ flex: 1 }} />
                <Group align="center" gap={4}>
                    <Text c="dimmed" fw={600} mr={4} style={{ fontSize: 11 }}>
                        SORT
                    </Text>
                    {SORTS.map(s => (
                        <Chip active={sort === s.key} key={s.key} onClick={() => setSort(s.key)} variant="subtle">
                            {s.label}
                        </Chip>
                    ))}
                </Group>
            </Group>

            <Card padding={0} radius="md" withBorder>
                <Box
                    bg="light-dark(var(--mantine-color-gray-0), var(--mantine-color-dark-6))"
                    c="dimmed"
                    style={{
                        display: 'grid',
                        fontSize: 10.5,
                        fontWeight: 700,
                        gridTemplateColumns: COLS,
                        letterSpacing: '0.5px',
                        padding: '12px 18px',
                    }}
                >
                    <span>#</span>
                    <span>DRIVER</span>
                    <span>YEARS</span>
                    <span style={{ textAlign: 'center' }}>STARTS</span>
                    <span style={{ textAlign: 'center' }}>WINS</span>
                    <span style={{ textAlign: 'center' }}>POLES</span>
                    <span style={{ textAlign: 'center' }}>PODIUMS</span>
                    <span style={{ textAlign: 'center' }}>TITLES</span>
                </Box>
                {rows.map((d, i) => (
                    <Link
                        className="f1-row"
                        key={d.id}
                        params={{ driverId: String(d.id) }}
                        style={{
                            alignItems: 'center',
                            borderTop: '1px solid var(--mantine-color-default-border)',
                            color: 'inherit',
                            display: 'grid',
                            gridTemplateColumns: COLS,
                            padding: '10px 18px',
                            textDecoration: 'none',
                        }}
                        to="/drivers/$driverId"
                    >
                        <Text c="dimmed" className="f1-num" fw={700} style={{ fontSize: 12 }}>
                            {i + 1}
                        </Text>
                        <Group gap={11} wrap="nowrap">
                            <DriverAvatar code={d.code} color={d.color} />
                            <Text fw={600} style={{ fontSize: 13.5, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                {d.name}
                            </Text>
                            <CaretRightIcon color="var(--mantine-color-gray-5)" size={13} />
                        </Group>
                        <Text c="dimmed" className="f1-num" style={{ fontSize: 12.5 }}>
                            {d.years}
                        </Text>
                        <Text c="dimmed" className="f1-num" ta="center">
                            {d.starts}
                        </Text>
                        <Text className="f1-num" fw={700} ta="center">
                            {d.wins}
                        </Text>
                        <Text c="dimmed" className="f1-num" ta="center">
                            {d.poles}
                        </Text>
                        <Text c="dimmed" className="f1-num" ta="center">
                            {d.podiums}
                        </Text>
                        <Group gap={0} justify="center">
                            <TrophyCount count={d.titles} />
                        </Group>
                    </Link>
                ))}
            </Card>
        </Stack>
    );
}
