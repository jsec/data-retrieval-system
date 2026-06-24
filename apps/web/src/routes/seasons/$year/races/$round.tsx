import {
    Box,
    Card,
    Grid,
    Group,
    Stack,
    Text,
} from '@mantine/core';
import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute, Link } from '@tanstack/react-router';

import { LineChart } from '#/components/line-chart';
import { DriverAvatar, SectionCard, TeamBar } from '#/components/ui';
import { raceDetailQuery } from '#/data/queries';

export const Route = createFileRoute('/seasons/$year/races/$round')({
    component: RaceDetail,
    loader: async ({ context, params }) => {
        const year = Number(params.year);
        const race = await context.queryClient.ensureQueryData(
            raceDetailQuery(year, Number(params.round)),
        );
        return {
            crumbs: [
                { label: params.year, params: { year: params.year }, to: '/seasons/$year' },
                { label: 'Calendar', params: { year: params.year }, to: '/seasons/$year/calendar' },
                { label: race.name },
            ],
        };
    },
});

const MEDALS = ['#f59f00', '#adb5bd', '#e8590c'];
const RESULT_COLS = '36px 1fr 72px 90px 48px';

function RaceDetail() {
    const { year } = Route.useParams();
    const { round } = Route.useParams();
    const { data } = useSuspenseQuery(raceDetailQuery(Number(year), Number(round)));

    const positionSeries = data.positionLines.map(p => ({ color: p.color, values: p.values }));
    const paceSeries = data.paceLines.map(p => ({ color: p.color, values: p.values }));
    const posLabels = Array.from({ length: 15 }, (_, i) => (i % 4 === 0 ? `L${i * 5 + 1}` : null));
    const paceLabels = Array.from({ length: 24 }, (_, i) => (i % 6 === 0 ? `L${i + 1}` : null));

    const headStats = [
        { label: 'POLE', value: data.pole.short },
        { label: 'FASTEST LAP', value: data.fastestLap.short },
        { label: 'WINNER', value: data.winner.short },
    ];

    return (
        <Stack gap="md">
            <Box
                style={{
                    alignItems: 'center',
                    background: 'linear-gradient(110deg,#16181c,#23262d)',
                    borderRadius: 10,
                    color: '#fff',
                    display: 'flex',
                    justifyContent: 'space-between',
                    padding: '22px 26px',
                }}
            >
                <Box>
                    <Text style={{ color: '#8b919a', fontSize: 12, fontWeight: 700, letterSpacing: '1px' }}>
                        {`ROUND ${data.round} · ${data.year}`}
                    </Text>
                    <Text my={6} style={{ fontSize: 28, fontWeight: 800, letterSpacing: '-0.5px' }}>
                        {data.name}
                    </Text>
                    <Text style={{ color: '#b5bac1', fontSize: 13 }}>
                        {`${data.circuit} · ${data.date} · ${data.laps} laps`}
                    </Text>
                </Box>
                <Group gap={26}>
                    {headStats.map(s => (
                        <Box key={s.label} ta="center">
                            <Text style={{ color: '#8b919a', fontSize: 11, fontWeight: 600 }}>{s.label}</Text>
                            <Text mt={3} style={{ fontSize: 16, fontWeight: 800 }}>
                                {s.value}
                            </Text>
                        </Box>
                    ))}
                </Group>
            </Box>

            <Grid gutter="md">
                {data.results.slice(0, 3).map((r, i) => (
                    <Grid.Col key={r.code} span={{ base: 12, sm: 4 }}>
                        <Link
                            params={{ driverId: r.code, year }}
                            style={{ color: 'inherit', textDecoration: 'none' }}
                            to="/seasons/$year/drivers/$driverId"
                        >
                            <Card
                                className="f1-lift"
                                padding="md"
                                radius="md"
                                style={{ borderTop: `4px solid ${r.driver.color}`, cursor: 'pointer' }}
                                withBorder
                            >
                                <Group gap={14} wrap="nowrap">
                                    <Text style={{ color: MEDALS[i], fontSize: 30, fontWeight: 800 }}>{i + 1}</Text>
                                    <DriverAvatar code={r.code} color={r.driver.color} size={44} />
                                    <Box>
                                        <Text fw={700} style={{ fontSize: 15 }}>
                                            {r.driver.name}
                                        </Text>
                                        <Text c="dimmed" style={{ fontSize: 12 }}>
                                            {r.driver.teamName}
                                        </Text>
                                        <Text className="f1-num" fw={600} mt={2} style={{ fontSize: 12 }}>
                                            {i === 0 ? '1:32:14.882' : r.gap}
                                        </Text>
                                    </Box>
                                </Group>
                            </Card>
                        </Link>
                    </Grid.Col>
                ))}
            </Grid>

            <Grid gutter="md">
                <Grid.Col span={{ base: 12, md: 6 }}>
                    <Card padding="md" radius="md" withBorder>
                        <Text fw={700} style={{ fontSize: 15 }}>
                            Position Changes
                        </Text>
                        <Text c="dimmed" mb={8} size="xs">
                            Track position lap-by-lap · top 5
                        </Text>
                        <LineChart
                            height={240}
                            invertY
                            series={positionSeries}
                            ticks={5}
                            viewHeight={300}
                            viewWidth={560}
                            xLabels={posLabels}
                            yMax={10}
                            yMin={1}
                        />
                    </Card>
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 6 }}>
                    <Card padding="md" radius="md" withBorder>
                        <Text fw={700} style={{ fontSize: 15 }}>
                            Race Pace
                        </Text>
                        <Text c="dimmed" mb={8} size="xs">
                            Lap time (s) · lower is faster
                        </Text>
                        <LineChart
                            height={240}
                            series={paceSeries}
                            ticks={5}
                            viewHeight={300}
                            viewWidth={560}
                            xLabels={paceLabels}
                            yFormat={v => v.toFixed(1)}
                            yMax={82}
                            yMin={77.5}
                        />
                    </Card>
                </Grid.Col>
            </Grid>

            <Grid gutter="md">
                <Grid.Col span={{ base: 12, md: 7.2 }}>
                    <SectionCard padded={false} title="Race Results">
                        <Box
                            c="dimmed"
                            style={{
                                display: 'grid',
                                fontSize: 10.5,
                                fontWeight: 700,
                                gridTemplateColumns: RESULT_COLS,
                                letterSpacing: '0.5px',
                                padding: '0 18px 8px',
                            }}
                        >
                            <span>POS</span>
                            <span>DRIVER</span>
                            <span style={{ textAlign: 'center' }}>GRID</span>
                            <span style={{ textAlign: 'right' }}>GAP</span>
                            <span style={{ textAlign: 'right' }}>PTS</span>
                        </Box>
                        <Box className="f1-scroll" style={{ maxHeight: 430, overflowY: 'auto' }}>
                            {data.results.map(r => (
                                <Link
                                    className="f1-row"
                                    key={r.code}
                                    params={{ driverId: r.code, year }}
                                    style={{
                                        alignItems: 'center',
                                        borderTop: '1px solid var(--mantine-color-default-border)',
                                        color: 'inherit',
                                        display: 'grid',
                                        gridTemplateColumns: RESULT_COLS,
                                        padding: '8px 18px',
                                        textDecoration: 'none',
                                    }}
                                    to="/seasons/$year/drivers/$driverId"
                                >
                                    <Text c="dimmed" className="f1-num" fw={700}>
                                        {r.pos}
                                    </Text>
                                    <Group gap={9} wrap="nowrap">
                                        <TeamBar color={r.driver.color} height={20} />
                                        <Text fw={600} style={{ fontSize: 13 }}>
                                            {r.driver.short}
                                        </Text>
                                    </Group>
                                    <Text c="dimmed" className="f1-num" size="12.5px" ta="center">
                                        {r.grid}
                                    </Text>
                                    <Text className="f1-num" size="12.5px" ta="right">
                                        {r.gap}
                                    </Text>
                                    <Text
                                        c={r.pts > 0 ? undefined : 'gray.4'}
                                        className="f1-num"
                                        fw={700}
                                        ta="right"
                                    >
                                        {r.pts > 0 ? r.pts : '–'}
                                    </Text>
                                </Link>
                            ))}
                        </Box>
                    </SectionCard>
                </Grid.Col>

                <Grid.Col span={{ base: 12, md: 4.8 }}>
                    <Card padding="md" radius="md" withBorder>
                        <Text fw={700} style={{ fontSize: 15 }}>
                            Qualifying vs Race
                        </Text>
                        <Text c="dimmed" mb={14} size="xs">
                            Positions gained or lost on Sunday
                        </Text>
                        {data.results.slice(0, 10).map((r) => {
                            const delta = r.grid - r.pos;
                            const mag = (Math.min(Math.abs(delta), 8) / 8) * 45;
                            const color
                                = delta > 0
                                    ? 'var(--mantine-color-green-6)'
                                    : (delta < 0
                                            ? 'var(--mantine-color-red-6)'
                                            : 'var(--mantine-color-gray-4)');
                            return (
                                <Group gap={10} key={r.code} mb={11} wrap="nowrap">
                                    <Text fw={700} style={{ fontSize: 12, width: 40 }}>
                                        {r.code}
                                    </Text>
                                    <Text c="dimmed" className="f1-num" style={{ fontSize: 11, width: 62 }}>
                                        P
                                        {r.grid}
                                        →P
                                        {r.pos}
                                    </Text>
                                    <Box style={{ flex: 1, height: 14, position: 'relative' }}>
                                        <Box
                                            style={{
                                                background: 'var(--mantine-color-default-border)',
                                                bottom: 0,
                                                left: '50%',
                                                position: 'absolute',
                                                top: 0,
                                                width: 1,
                                            }}
                                        />
                                        <Box
                                            style={{
                                                background: color,
                                                borderRadius: 3,
                                                height: 8,
                                                left: delta >= 0 ? '50%' : `${50 - mag}%`,
                                                position: 'absolute',
                                                top: 3,
                                                width: `${Math.max(mag, 1)}%`,
                                            }}
                                        />
                                    </Box>
                                    <Text className="f1-num" fw={700} style={{ color, fontSize: 12, textAlign: 'right', width: 34 }}>
                                        {delta > 0 ? `+${delta}` : delta}
                                    </Text>
                                </Group>
                            );
                        })}
                    </Card>
                </Grid.Col>
            </Grid>
        </Stack>
    );
}
