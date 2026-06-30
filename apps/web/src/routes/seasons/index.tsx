import type { ListSeasonsResponse } from '@drs/contracts';

import { Box, Card, Group, Stack, Text, Title } from '@mantine/core';
import { TrophyIcon } from '@phosphor-icons/react';
import { queryOptions, useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute, Link } from '@tanstack/react-router';

import { TeamBar } from '#/components/ui';
import { api } from '#/lib/query/api';

export const Route = createFileRoute('/seasons/')({
    component: Seasons,
    loader: async () => {
        return { crumbs: [{ label: 'Seasons' }] };
    },
});

const COLS = '90px 80px 1fr 1fr 110px';

function Seasons() {
    const { data: seasons } = useSuspenseQuery(
        queryOptions({
            queryFn: () => api.get('seasons').json<ListSeasonsResponse>(),
            queryKey: ['seasons'],
        }),
    );

    console.log('seasons:', seasons);

    return (
        <Stack gap="md">
            <Box>
                <Title order={1} style={{ fontSize: 28 }}>
                    Seasons
                </Title>
                <Text c="dimmed" mt={4} size="13px">
                    Browse championship seasons and their outcomes
                </Text>
            </Box>

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
                        padding: '13px 22px',
                    }}
                >
                    <span>SEASON</span>
                    <span style={{ textAlign: 'center' }}>RACES</span>
                    <span>WORLD CHAMPION</span>
                    <span>CONSTRUCTORS&apos; CHAMPION</span>
                </Box>
                {seasons.map((s) => {
                    return (
                        <Link
                            className="f1-row"
                            key={s.season}
                            params={{ year: String(s.season) }}
                            style={{
                                alignItems: 'center',
                                borderTop: '1px solid var(--mantine-color-default-border)',
                                color: 'inherit',
                                display: 'grid',
                                gridTemplateColumns: COLS,
                                padding: '14px 22px',
                                textDecoration: 'none',
                            }}
                            to="/seasons/$year"
                        >
                            <Text className="f1-num" fw={800} style={{ fontSize: 20, letterSpacing: '-0.5px' }}>
                                {s.season}
                            </Text>
                            <Text c="dimmed" className="f1-num" fw={700} ta="center">
                                {s.raceCount}
                            </Text>
                            <Group gap={10} wrap="nowrap">
                                <TrophyIcon color="var(--mantine-color-yellow-6)" size={15} weight="fill" />
                                <TeamBar color="black" height={22} />
                                <Text fw={600} style={{ fontSize: 14 }}>
                                    {s.wdc.name}
                                </Text>
                            </Group>
                            <Group gap={10} wrap="nowrap">
                                <Box style={{ background: 'black', borderRadius: 3, height: 14, width: 14 }} />
                                {s.wcc && (
                                    <Text fw={600} style={{ fontSize: 14 }}>
                                        {s.wcc.name}
                                    </Text>
                                )}
                            </Group>
                        </Link>
                    );
                })}
            </Card>
        </Stack>
    );
}
