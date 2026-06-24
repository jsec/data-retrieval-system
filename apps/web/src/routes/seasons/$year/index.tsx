import {
    Box,
    Card,
    Grid,
    Group,
    Progress,
    SimpleGrid,
    Stack,
    Text,
    Title,
} from '@mantine/core';
import {
    CalendarDotsIcon,
    CrownIcon,
    FlagCheckeredIcon,
    GaugeIcon,
} from '@phosphor-icons/react';
import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute, Link } from '@tanstack/react-router';

import { LineChart, roundLabels } from '#/components/line-chart';
import { SectionCard, StatCard, TeamBar } from '#/components/ui';
import { seasonOverviewQuery } from '#/data/queries';

export const Route = createFileRoute('/seasons/$year/')({
    component: SeasonOverview,
    loader: async ({ context, params }) => {
        const year = Number(params.year);
        await context.queryClient.ensureQueryData(seasonOverviewQuery(year));
        return { crumbs: [{ label: 'Season Overview' }] };
    },
});

const DRIVER_COLS = '34px 1fr 64px 56px 70px';

function SeasonOverview() {
    const { year } = Route.useParams();
    const { data } = useSuspenseQuery(seasonOverviewQuery(Number(year)));
    const maxConstructor = data.constructors[0]?.points || 1;
    const topDrivers = data.drivers.slice(0, 8);

    const progressionSeries = data.progression.map(p => ({ color: p.color, values: p.values }));
    const xLabels = roundLabels(data.completed + 1, 2);
    xLabels[0] = 'Start';

    return (
        <Stack gap="md">
            <Group align="flex-end" justify="space-between">
                <Box>
                    <Text c="dimmed" fw={700} style={{ fontSize: 12, letterSpacing: '1.5px' }}>
                        FIA FORMULA 1 WORLD CHAMPIONSHIP
                    </Text>
                    <Title mt={6} order={1}>
                        {`${data.year} Season Overview`}
                    </Title>
                </Box>
                <Box ta="right">
                    <Text c="dimmed" size="xs">
                        Last round
                    </Text>
                    <Text fw={700} style={{ fontSize: 15 }}>
                        {data.lastRaceName}
                    </Text>
                </Box>
            </Group>

            <SimpleGrid cols={{ base: 2, md: 4 }} spacing="md">
                <StatCard
                    accent="#e8002d"
                    icon={<FlagCheckeredIcon size={15} weight="fill" />}
                    label="Round"
                    sub="season progress"
                    value={`${data.completed} / ${data.totalRounds}`}
                />
                <StatCard
                    accent="var(--mantine-color-yellow-6)"
                    icon={<CrownIcon size={15} weight="fill" />}
                    label="Championship Leader"
                    sub={`${data.leader.points} pts`}
                    value={data.leader.short}
                />
                <StatCard
                    accent="var(--mantine-color-blue-6)"
                    icon={<GaugeIcon size={15} weight="fill" />}
                    label="Lead Margin"
                    sub={`over ${data.runnerUp.short}`}
                    value={`+${data.leader.points - data.runnerUp.points}`}
                />
                <StatCard
                    accent="var(--mantine-color-teal-7)"
                    icon={<CalendarDotsIcon size={15} />}
                    label="Next Race"
                    sub={data.nextRace.name}
                    value={data.nextRace.code}
                />
            </SimpleGrid>

            <Grid gutter="md">
                <Grid.Col span={{ base: 12, md: 7.2 }}>
                    <SectionCard
                        action={(
                            <Link
                                params={{ year }}
                                style={{
                                    color: 'var(--mantine-color-blue-6)',
                                    fontSize: 12,
                                    fontWeight: 600,
                                    textDecoration: 'none',
                                }}
                                to="/seasons/$year/standings"
                            >
                                View full table →
                            </Link>
                        )}
                        padded={false}
                        title="Drivers' Championship"
                    >
                        <Box
                            c="dimmed"
                            style={{
                                display: 'grid',
                                fontSize: 10.5,
                                fontWeight: 700,
                                gridTemplateColumns: DRIVER_COLS,
                                letterSpacing: '0.5px',
                                padding: '0 18px 7px',
                            }}
                        >
                            <span>POS</span>
                            <span>DRIVER</span>
                            <span style={{ textAlign: 'right' }}>PTS</span>
                            <span style={{ textAlign: 'center' }}>WINS</span>
                            <span style={{ textAlign: 'right' }}>GAP</span>
                        </Box>
                        {topDrivers.map((d, i) => (
                            <Link
                                className="f1-row"
                                key={d.code}
                                params={{ driverId: d.code, year }}
                                style={{
                                    alignItems: 'center',
                                    borderTop: '1px solid var(--mantine-color-default-border)',
                                    color: 'inherit',
                                    display: 'grid',
                                    gridTemplateColumns: DRIVER_COLS,
                                    padding: '9px 18px',
                                    textDecoration: 'none',
                                }}
                                to="/seasons/$year/drivers/$driverId"
                            >
                                <Text c="dimmed" className="f1-num" fw={700}>
                                    {i + 1}
                                </Text>
                                <Group gap={11} wrap="nowrap">
                                    <TeamBar color={d.color} />
                                    <Box style={{ minWidth: 0 }}>
                                        <Text fw={600} style={{ fontSize: 13.5, whiteSpace: 'nowrap' }}>
                                            {d.short}
                                        </Text>
                                        <Text c="dimmed" style={{ fontSize: 11 }}>
                                            {d.teamName}
                                        </Text>
                                    </Box>
                                </Group>
                                <Text className="f1-num" fw={800} ta="right">
                                    {d.points}
                                </Text>
                                <Text c="dimmed" className="f1-num" ta="center">
                                    {d.wins}
                                </Text>
                                <Text c="dimmed" className="f1-num" size="12.5px" ta="right">
                                    {i === 0 ? '—' : `-${data.leader.points - d.points}`}
                                </Text>
                            </Link>
                        ))}
                    </SectionCard>
                </Grid.Col>

                <Grid.Col span={{ base: 12, md: 4.8 }}>
                    <SectionCard
                        action={(
                            <Link
                                style={{
                                    color: 'var(--mantine-color-blue-6)',
                                    fontSize: 12,
                                    fontWeight: 600,
                                    textDecoration: 'none',
                                }}
                                to="/constructors"
                            >
                                Compare →
                            </Link>
                        )}
                        padded={false}
                        title="Constructors"
                    >
                        {data.constructors.map(c => (
                            <Box
                                key={c.key}
                                style={{
                                    borderTop: '1px solid var(--mantine-color-default-border)',
                                    padding: '8px 18px',
                                }}
                            >
                                <Group justify="space-between" mb={5} wrap="nowrap">
                                    <Group gap={9} wrap="nowrap">
                                        <Text c="dimmed" className="f1-num" fw={700} style={{ fontSize: 11, textAlign: 'center', width: 18 }}>
                                            {c.pos}
                                        </Text>
                                        <Text fw={600} style={{ fontSize: 13 }}>
                                            {c.name}
                                        </Text>
                                    </Group>
                                    <Text className="f1-num" fw={800} style={{ fontSize: 13 }}>
                                        {c.points}
                                    </Text>
                                </Group>
                                <Box ml={27}>
                                    <Progress
                                        radius="xl"
                                        size={5}
                                        styles={{ section: { background: c.color } }}
                                        value={(c.points / maxConstructor) * 100}
                                    />
                                </Box>
                            </Box>
                        ))}
                    </SectionCard>
                </Grid.Col>
            </Grid>

            <Card padding="md" radius="md" withBorder>
                <Group align="flex-start" justify="space-between" mb={6}>
                    <Box>
                        <Text fw={700} style={{ fontSize: 15 }}>
                            Championship Points Progression
                        </Text>
                        <Text c="dimmed" mt={2} size="xs">
                            Cumulative points after each round · top 6 drivers
                        </Text>
                    </Box>
                    <Group gap={14}>
                        {data.progression.map(l => (
                            <Group gap={6} key={l.code} style={{ fontSize: 12, fontWeight: 600 }} wrap="nowrap">
                                <Box style={{ background: l.color, borderRadius: 2, height: 3, width: 11 }} />
                                {l.code}
                            </Group>
                        ))}
                    </Group>
                </Group>
                <LineChart
                    height={280}
                    series={progressionSeries}
                    ticks={6}
                    viewHeight={300}
                    viewWidth={1100}
                    xLabels={xLabels}
                    yMax={250}
                    yMin={0}
                />
            </Card>

            <SectionCard
                action={(
                    <Link
                        params={{ year }}
                        style={{
                            color: 'var(--mantine-color-blue-6)',
                            fontSize: 12,
                            fontWeight: 600,
                            textDecoration: 'none',
                        }}
                        to="/seasons/$year/calendar"
                    >
                        Full calendar →
                    </Link>
                )}
                title={`${data.year} Calendar`}
            >
                <SimpleGrid cols={{ base: 4, lg: 8, sm: 6 }} spacing={9}>
                    {data.calendar.map((r) => {
                        const done = r.round <= data.completed;
                        const next = r.round === data.completed + 1;
                        const winner = r.winner ? data.drivers.find(d => d.code === r.winner) : null;
                        const cell = (
                            <Box
                                className={done ? 'f1-lift' : undefined}
                                style={{
                                    background: done
                                        ? 'var(--mantine-color-body)'
                                        : (next
                                                ? 'var(--mantine-color-blue-0)'
                                                : 'light-dark(var(--mantine-color-gray-0), var(--mantine-color-dark-6))'),
                                    border: `1px solid ${next ? 'var(--mantine-color-blue-3)' : 'var(--mantine-color-default-border)'}`,
                                    borderRadius: 7,
                                    cursor: done ? 'pointer' : 'default',
                                    padding: '9px 10px',
                                }}
                            >
                                <Text c="dimmed" className="f1-num" fw={700} style={{ fontSize: 10 }}>
                                    R
                                    {r.round}
                                </Text>
                                <Text fw={700} mt={2} style={{ fontSize: 12.5 }}>
                                    {r.code}
                                </Text>
                                <Text c="dimmed" mt={1} style={{ fontSize: 10.5 }}>
                                    {r.date}
                                </Text>
                                <Box
                                    mt={7}
                                    style={{
                                        background: winner ? winner.color : 'var(--mantine-color-default-border)',
                                        borderRadius: 2,
                                        height: 3,
                                    }}
                                />
                            </Box>
                        );
                        return done
                            ? (
                                    <Link
                                        key={r.round}
                                        params={{ round: String(r.round), year }}
                                        style={{ textDecoration: 'none' }}
                                        to="/seasons/$year/races/$round"
                                    >
                                        {cell}
                                    </Link>
                                )
                            : (
                                    <Box key={r.round}>{cell}</Box>
                                );
                    })}
                </SimpleGrid>
            </SectionCard>
        </Stack>
    );
}
