import type { ReactNode } from 'react';

import { Box, Card, Group, SimpleGrid, Stack, Text, Title } from '@mantine/core';
import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute, Link } from '@tanstack/react-router';

import { COMPLETED, CURRENT_YEAR } from '#/data/fixtures';
import { circuitsQuery } from '#/data/queries';

export const Route = createFileRoute('/circuits/')({
    component: Circuits,
    loader: async ({ context }) => {
        await context.queryClient.ensureQueryData(circuitsQuery(CURRENT_YEAR));
        return { crumbs: [{ label: 'Circuits' }] };
    },
});

function Circuits() {
    const { data: circuits } = useSuspenseQuery(circuitsQuery(CURRENT_YEAR));
    const year = String(CURRENT_YEAR);

    return (
        <Stack gap="md">
            <Box>
                <Title order={1} style={{ fontSize: 28 }}>
                    Circuits
                </Title>
                <Text c="dimmed" mt={4} size="13px">
                    {`${CURRENT_YEAR} championship venues`}
                </Text>
            </Box>

            <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="md">
                {circuits.map((c) => {
                    const done = c.round <= COMPLETED;
                    const card = (
                        <Card className={done ? 'f1-lift' : undefined} h="100%" padding="md" radius="md" withBorder>
                            <Group justify="space-between" mb={10}>
                                <Text c="dimmed" fw={700} style={{ fontSize: 11 }}>
                                    {`ROUND ${c.round}`}
                                </Text>
                                <Text fw={800} style={{ color: '#e8002d', fontSize: 11 }}>
                                    {c.code}
                                </Text>
                            </Group>
                            <Box style={{ alignItems: 'center', display: 'flex', height: 120, justifyContent: 'center' }}>
                                <svg style={{ height: '100%', width: '100%' }} viewBox="0 0 200 120">
                                    <path
                                        d={c.path}
                                        fill="none"
                                        stroke="var(--mantine-color-gray-8)"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={3.5}
                                    />
                                </svg>
                            </Box>
                            <Text fw={700} mt={6} style={{ fontSize: 15 }}>
                                {c.name}
                            </Text>
                            <Text c="dimmed" style={{ fontSize: 12 }}>
                                {c.country}
                            </Text>
                            <Group
                                gap={16}
                                mt={10}
                                pt={10}
                                style={{ borderTop: '1px solid var(--mantine-color-default-border)' }}
                            >
                                <CircuitStat label="LENGTH" value={c.length} />
                                <CircuitStat label="CORNERS" value={c.corners} />
                                <CircuitStat label="LAPS" value={c.laps} />
                            </Group>
                        </Card>
                    );
                    return done ? (
                        <Link
                            key={c.code}
                            params={{ round: String(c.round), year }}
                            style={{ color: 'inherit', textDecoration: 'none' }}
                            to="/seasons/$year/races/$round"
                        >
                            {card}
                        </Link>
                    ) : (
                        <Box key={c.code}>{card}</Box>
                    );
                })}
            </SimpleGrid>
        </Stack>
    );
}

function CircuitStat({ label, value }: { label: string; value: ReactNode }) {
    return (
        <Box>
            <Text className="f1-num" fw={800} style={{ fontSize: 13 }}>
                {value}
            </Text>
            <Text c="dimmed" style={{ fontSize: 10 }}>
                {label}
            </Text>
        </Box>
    );
}
