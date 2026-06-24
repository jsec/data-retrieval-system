import { Box, Card, Group, Progress, Stack, Text, Title } from '@mantine/core';
import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute, Link } from '@tanstack/react-router';
import { useState } from 'react';

import { Pill, TeamBar } from '#/components/ui';
import { TOTAL_ROUNDS } from '#/data/fixtures';
import { standingsQuery } from '#/data/queries';

export const Route = createFileRoute('/seasons/$year/standings')({
    component: Standings,
    loader: async ({ context, params }) => {
        await context.queryClient.ensureQueryData(standingsQuery(Number(params.year)));
        return {
            crumbs: [
                { label: params.year, params: { year: params.year }, to: '/seasons/$year' },
                { label: 'Standings' },
            ],
        };
    },
});

const COLS = '46px 1fr 130px 70px 80px 80px 80px';

function Standings() {
    const { year } = Route.useParams();
    const { data } = useSuspenseQuery(standingsQuery(Number(year)));
    const [tab, setTab] = useState<'drivers' | 'constructors'>('drivers');

    return (
        <Stack gap="md">
            <Box>
                <Title order={1} style={{ fontSize: 28 }}>
                    Championship Standings
                </Title>
                <Text c="dimmed" mt={4} size="13px">
                    {`After Round ${data.completed} of ${TOTAL_ROUNDS} · ${year} season`}
                </Text>
            </Box>

            <Group gap={8}>
                <Pill active={tab === 'drivers'} onClick={() => setTab('drivers')}>
                    Drivers
                </Pill>
                <Pill active={tab === 'constructors'} onClick={() => setTab('constructors')}>
                    Constructors
                </Pill>
            </Group>

            {tab === 'drivers' ? (
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
                            padding: '13px 20px',
                        }}
                    >
                        <span>POS</span>
                        <span>DRIVER</span>
                        <span>TEAM</span>
                        <span style={{ textAlign: 'center' }}>WINS</span>
                        <span style={{ textAlign: 'center' }}>PODIUMS</span>
                        <span style={{ textAlign: 'center' }}>POLES</span>
                        <span style={{ textAlign: 'right' }}>PTS</span>
                    </Box>
                    {data.drivers.map((d, i) => (
                        <Link
                            className="f1-row"
                            key={d.code}
                            params={{ driverId: d.code, year }}
                            style={{
                                alignItems: 'center',
                                borderTop: '1px solid var(--mantine-color-default-border)',
                                color: 'inherit',
                                display: 'grid',
                                gridTemplateColumns: COLS,
                                padding: '11px 20px',
                                textDecoration: 'none',
                            }}
                            to="/seasons/$year/drivers/$driverId"
                        >
                            <Text c="dimmed" className="f1-num" fw={700}>
                                {i + 1}
                            </Text>
                            <Group gap={11} wrap="nowrap">
                                <TeamBar color={d.color} height={24} />
                                <Text fw={600} style={{ fontSize: 13.5, whiteSpace: 'nowrap' }}>
                                    {d.name}
                                </Text>
                                <Text c="dimmed" fw={700} style={{ fontSize: 11 }}>
                                    {d.code}
                                </Text>
                            </Group>
                            <Text c="dimmed" size="12.5px">
                                {d.teamName}
                            </Text>
                            <Text className="f1-num" ta="center">
                                {d.wins}
                            </Text>
                            <Text className="f1-num" ta="center">
                                {d.podiums}
                            </Text>
                            <Text className="f1-num" ta="center">
                                {d.poles}
                            </Text>
                            <Text className="f1-num" fw={800} ta="right">
                                {d.points}
                            </Text>
                        </Link>
                    ))}
                </Card>
            ) : (
                <Card padding="md" radius="md" withBorder>
                    {data.constructors.map((c) => (
                        <Group
                            gap={16}
                            key={c.key}
                            py={11}
                            style={{ borderTop: '1px solid var(--mantine-color-default-border)' }}
                            wrap="nowrap"
                        >
                            <Text c="dimmed" className="f1-num" fw={800} style={{ width: 26 }}>
                                {c.pos}
                            </Text>
                            <Box style={{ background: c.color, borderRadius: 3, height: 30, width: 10 }} />
                            <Text fw={700} style={{ fontSize: 14, width: 160 }}>
                                {c.name}
                            </Text>
                            <Progress
                                radius="xl"
                                size={9}
                                style={{ flex: 1 }}
                                styles={{ section: { background: c.color } }}
                                value={(c.points / data.maxConstructor) * 100}
                            />
                            <Text className="f1-num" fw={800} style={{ fontSize: 15, textAlign: 'right', width: 60 }}>
                                {c.points}
                            </Text>
                        </Group>
                    ))}
                </Card>
            )}
        </Stack>
    );
}
