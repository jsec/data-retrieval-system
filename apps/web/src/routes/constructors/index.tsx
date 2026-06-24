import type { AllTimeConstructor } from '#/data/types';

import { Box, Card, Group, Progress, Stack, Text, Title } from '@mantine/core';
import { TrophyIcon } from '@phosphor-icons/react';
import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { useMemo, useState } from 'react';

import { GOLD, Pill } from '#/components/ui';
import { constructorsIndexQuery } from '#/data/queries';

export const Route = createFileRoute('/constructors/')({
    component: Constructors,
    loader: async ({ context }) => {
        await context.queryClient.ensureQueryData(constructorsIndexQuery());
        return { crumbs: [{ label: 'Constructors' }] };
    },
});

const COLS = '34px minmax(160px,1.2fr) 94px 62px minmax(96px,1fr) 56px 72px';

type Sort = 'titles' | 'wins' | 'poles' | 'podiums';

const SORTS: { key: Sort; label: string }[] = [
    { key: 'titles', label: 'Titles' },
    { key: 'wins', label: 'Wins' },
    { key: 'poles', label: 'Poles' },
    { key: 'podiums', label: 'Podiums' },
];

const SORTERS: Record<Sort, (a: AllTimeConstructor, b: AllTimeConstructor) => number> = {
    podiums: (a, b) => b.podiums - a.podiums,
    poles: (a, b) => b.poles - a.poles,
    titles: (a, b) => b.titles - a.titles || b.wins - a.wins,
    wins: (a, b) => b.wins - a.wins,
};

function Constructors() {
    const { data } = useSuspenseQuery(constructorsIndexQuery());
    const [sort, setSort] = useState<Sort>('titles');

    const rows = useMemo(() => data.slice().sort(SORTERS[sort]), [data, sort]);
    const maxWins = Math.max(...rows.map((c) => c.wins));

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
                    {SORTS.map((s) => (
                        <Pill active={sort === s.key} key={s.key} onClick={() => setSort(s.key)} variant="subtle">
                            {s.label}
                        </Pill>
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
                        padding: '12px 20px',
                    }}
                >
                    <span>#</span>
                    <span>CONSTRUCTOR</span>
                    <span>YEARS</span>
                    <span style={{ textAlign: 'center' }}>TITLES</span>
                    <span>WINS</span>
                    <span style={{ textAlign: 'center' }}>POLES</span>
                    <span style={{ textAlign: 'center' }}>PODIUMS</span>
                </Box>
                {rows.map((c, i) => (
                    <Box
                        className="f1-row"
                        key={c.name}
                        style={{
                            alignItems: 'center',
                            borderTop: '1px solid var(--mantine-color-default-border)',
                            display: 'grid',
                            gridTemplateColumns: COLS,
                            padding: '11px 20px',
                        }}
                    >
                        <Text className="f1-num" fw={700} style={{ color: 'var(--mantine-color-gray-4)', fontSize: 12 }}>
                            {i + 1}
                        </Text>
                        <Group gap={11} wrap="nowrap">
                            <Box style={{ background: c.color, borderRadius: 3, flexShrink: 0, height: 26, width: 6 }} />
                            <Text fw={700} style={{ fontSize: 14, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                {c.name}
                            </Text>
                            {c.active ? (
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
                            ) : null}
                        </Group>
                        <Text c="dimmed" className="f1-num" style={{ fontSize: 12.5 }}>
                            {c.years}
                        </Text>
                        <Group gap={0} justify="center">
                            {c.titles > 0 ? (
                                <Group gap={3} style={{ color: GOLD, fontSize: 13, fontWeight: 800 }} wrap="nowrap">
                                    <TrophyIcon size={12} weight="fill" />
                                    {c.titles}
                                </Group>
                            ) : null}
                        </Group>
                        <Group gap={10} wrap="nowrap">
                            <Text className="f1-num" fw={800} style={{ fontSize: 13.5, width: 34 }}>
                                {c.wins}
                            </Text>
                            <Progress
                                radius="xl"
                                size={6}
                                style={{ flex: 1, maxWidth: 150 }}
                                styles={{ section: { background: c.color } }}
                                value={(c.wins / maxWins) * 100}
                            />
                        </Group>
                        <Text c="dimmed" className="f1-num" ta="center">
                            {c.poles}
                        </Text>
                        <Text c="dimmed" className="f1-num" ta="center">
                            {c.podiums}
                        </Text>
                    </Box>
                ))}
            </Card>
        </Stack>
    );
}
