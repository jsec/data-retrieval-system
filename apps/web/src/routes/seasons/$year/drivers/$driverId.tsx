import { Box, Card, Group, SimpleGrid, Stack, Text } from '@mantine/core';
import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute, Link } from '@tanstack/react-router';

import { LineChart, roundLabels } from '#/components/line-chart';
import { MiniStat } from '#/components/ui';
import { driverSeasonQuery } from '#/data/queries';

export const Route = createFileRoute('/seasons/$year/drivers/$driverId')({
    component: DriverSeason,
    loader: async ({ context, params }) => {
        const detail = await context.queryClient.ensureQueryData(
            driverSeasonQuery(Number(params.year), params.driverId),
        );
        return {
            crumbs: [
                { label: params.year, params: { year: params.year }, to: '/seasons/$year' },
                { label: detail.driver.name },
            ],
        };
    },
});

const COLS = '44px 1fr 70px 70px 70px 60px';

function DriverSeason() {
    const { year } = Route.useParams();
    const { driverId } = Route.useParams();
    const { data } = useSuspenseQuery(driverSeasonQuery(Number(year), driverId));
    const { driver, pos } = data;

    return (
        <Stack gap="md">
            <Box
                style={{
                    alignItems: 'center',
                    background: `linear-gradient(110deg, ${driver.color}, ${driver.colorDark})`,
                    borderRadius: 10,
                    color: '#fff',
                    display: 'flex',
                    gap: 24,
                    overflow: 'hidden',
                    padding: '24px 28px',
                    position: 'relative',
                }}
            >
                <Box
                    style={{
                        fontSize: 140,
                        fontWeight: 800,
                        lineHeight: 0.8,
                        opacity: 0.18,
                        position: 'absolute',
                        right: 24,
                        top: '50%',
                        transform: 'translateY(-50%)',
                    }}
                >
                    {driver.number}
                </Box>
                <Box
                    style={{
                        alignItems: 'center',
                        background: 'rgba(255,255,255,.18)',
                        border: '2px solid rgba(255,255,255,.5)',
                        borderRadius: '50%',
                        display: 'flex',
                        flexShrink: 0,
                        fontSize: 24,
                        fontWeight: 800,
                        height: 78,
                        justifyContent: 'center',
                        width: 78,
                    }}
                >
                    {driver.code}
                </Box>
                <Box style={{ paddingRight: 130, zIndex: 1 }}>
                    <Text style={{ fontSize: 12, fontWeight: 700, letterSpacing: '1px', opacity: 0.85 }}>
                        {`${driver.teamName} · #${driver.number}`}
                    </Text>
                    <Text style={{ fontSize: 30, fontWeight: 800, letterSpacing: '-0.6px', whiteSpace: 'nowrap' }}>
                        {driver.name}
                    </Text>
                    <Text style={{ fontSize: 13, opacity: 0.9 }}>
                        {`${driver.country} · Championship P${pos}`}
                    </Text>
                </Box>
            </Box>

            <SimpleGrid cols={{ base: 3, md: 6 }} spacing="sm">
                <MiniStat label="POINTS" value={driver.points} />
                <MiniStat label="WINS" value={driver.wins} />
                <MiniStat label="PODIUMS" value={driver.podiums} />
                <MiniStat label="POLES" value={driver.poles} />
                <MiniStat label="STANDING" value={`P${pos}`} />
                <MiniStat label="CAR NO." value={`#${driver.number}`} />
            </SimpleGrid>

            <SimpleGrid cols={{ base: 1, md: 2 }} spacing="md">
                <Card padding="md" radius="md" withBorder>
                    <Text fw={700} mb={8} style={{ fontSize: 15 }}>
                        Points Progression
                    </Text>
                    <LineChart
                        height={200}
                        series={[{ color: driver.color, values: data.progression }]}
                        ticks={5}
                        viewHeight={260}
                        viewWidth={520}
                        xLabels={roundLabels(data.progression.length, 2)}
                        yMax={data.pointsMax}
                        yMin={0}
                    />
                </Card>
                <Card padding="md" radius="md" withBorder>
                    <Text fw={700} mb={10} style={{ fontSize: 15 }}>
                        Finishing Positions
                    </Text>
                    <Group align="flex-end" gap={6} h={180} wrap="nowrap">
                        {data.finishes.map((f) => (
                            <Box
                                key={f.round}
                                style={{
                                    alignItems: 'center',
                                    display: 'flex',
                                    flex: 1,
                                    flexDirection: 'column',
                                    height: '100%',
                                    justifyContent: 'flex-end',
                                }}
                            >
                                <Text className="f1-num" fw={700} mb={3} style={{ color: 'var(--mantine-color-gray-7)', fontSize: 10 }}>
                                    {f.pos}
                                </Text>
                                <Box
                                    style={{
                                        background: f.color,
                                        borderRadius: '4px 4px 0 0',
                                        height: `${(100 - ((f.pos - 1) / 19) * 100) * 0.9}%`,
                                        maxWidth: 26,
                                        width: '100%',
                                    }}
                                />
                                <Text c="dimmed" mt={4} style={{ fontSize: 9.5 }}>
                                    {f.round}
                                </Text>
                            </Box>
                        ))}
                    </Group>
                </Card>
            </SimpleGrid>

            <Card padding={0} radius="md" withBorder>
                <Text fw={700} px={18} py={15} style={{ fontSize: 15 }}>
                    Race-by-Race Results
                </Text>
                <Box
                    c="dimmed"
                    style={{
                        display: 'grid',
                        fontSize: 10.5,
                        fontWeight: 700,
                        gridTemplateColumns: COLS,
                        letterSpacing: '0.5px',
                        padding: '0 18px 8px',
                    }}
                >
                    <span>RND</span>
                    <span>GRAND PRIX</span>
                    <span style={{ textAlign: 'center' }}>GRID</span>
                    <span style={{ textAlign: 'center' }}>FINISH</span>
                    <span style={{ textAlign: 'center' }}>STATUS</span>
                    <span style={{ textAlign: 'right' }}>PTS</span>
                </Box>
                {data.races.map((r) => (
                    <Link
                        className="f1-row"
                        key={r.round}
                        params={{ round: String(r.round), year }}
                        style={{
                            alignItems: 'center',
                            borderTop: '1px solid var(--mantine-color-default-border)',
                            color: 'inherit',
                            display: 'grid',
                            gridTemplateColumns: COLS,
                            padding: '9px 18px',
                            textDecoration: 'none',
                        }}
                        to="/seasons/$year/races/$round"
                    >
                        <Text c="dimmed" className="f1-num" fw={700}>
                            {r.round}
                        </Text>
                        <Text fw={600} style={{ fontSize: 13 }}>
                            {r.gp}
                        </Text>
                        <Text c="dimmed" className="f1-num" ta="center">
                            {r.grid}
                        </Text>
                        <Text className="f1-num" fw={800} ta="center">
                            {r.finish}
                        </Text>
                        <Text fw={700} style={{ color: r.statusColor, fontSize: 11, textAlign: 'center' }}>
                            {r.status}
                        </Text>
                        <Text className="f1-num" fw={700} ta="right">
                            {r.pts > 0 ? r.pts : '–'}
                        </Text>
                    </Link>
                ))}
            </Card>
        </Stack>
    );
}
