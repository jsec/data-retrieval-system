import {
    Box,
    Card,
    Group,
    SimpleGrid,
    Stack,
    Text,
} from '@mantine/core';
import { CaretRightIcon, TrophyIcon } from '@phosphor-icons/react';
import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute, Link } from '@tanstack/react-router';

import { GOLD, MiniStat } from '#/components/ui';
import { CURRENT_YEAR } from '#/data/fixtures';
import { driverCareerQuery } from '#/data/queries';

export const Route = createFileRoute('/drivers/$driverId')({
    component: DriverCareer,
    loader: async ({ context, params }) => {
        const { driver } = await context.queryClient.ensureQueryData(
            driverCareerQuery(Number(params.driverId)),
        );
        return {
            crumbs: [{ label: 'Drivers', to: '/drivers' }, { label: driver.name }],
        };
    },
});

const COLS = '84px 1fr 64px 60px 78px 60px 80px 24px';

function DriverCareer() {
    const { driverId } = Route.useParams();
    const { data } = useSuspenseQuery(driverCareerQuery(Number(driverId)));
    const { driver, seasons } = data;

    return (
        <Stack gap="md">
            <Box
                style={{
                    alignItems: 'center',
                    background: `linear-gradient(120deg, ${driver.color}, #16181c)`,
                    borderRadius: 10,
                    color: '#fff',
                    display: 'flex',
                    gap: 22,
                    padding: '24px 28px',
                }}
            >
                <Box
                    style={{
                        alignItems: 'center',
                        background: 'rgba(255,255,255,.16)',
                        border: '2px solid rgba(255,255,255,.45)',
                        borderRadius: '50%',
                        display: 'flex',
                        flexShrink: 0,
                        fontSize: 21,
                        fontWeight: 800,
                        height: 70,
                        justifyContent: 'center',
                        width: 70,
                    }}
                >
                    {driver.code}
                </Box>
                <Box>
                    <Group gap={10}>
                        <Text style={{ fontSize: 30, fontWeight: 800, letterSpacing: '-0.6px' }}>
                            {driver.name}
                        </Text>
                        {driver.titles > 0
                            ? (
                                    <Group
                                        gap={4}
                                        style={{
                                            background: 'rgba(255,255,255,.18)',
                                            borderRadius: 20,
                                            fontSize: 13,
                                            fontWeight: 800,
                                            padding: '4px 10px',
                                        }}
                                        wrap="nowrap"
                                    >
                                        <TrophyIcon size={13} weight="fill" />
                                        World Champion
                                    </Group>
                                )
                            : null}
                    </Group>
                    <Text mt={5} style={{ fontSize: 13, opacity: 0.9 }}>
                        {`${driver.nat} · ${driver.years} · Career summary`}
                    </Text>
                </Box>
            </Box>

            <SimpleGrid cols={{ base: 3, md: 6 }} spacing="sm">
                <MiniStat label="SEASONS" value={seasons.length} />
                <MiniStat label="STARTS" value={driver.starts} />
                <MiniStat label="WINS" value={driver.wins} />
                <MiniStat label="POLES" value={driver.poles} />
                <MiniStat label="PODIUMS" value={driver.podiums} />
                <MiniStat label="TITLES" value={driver.titles} />
            </SimpleGrid>

            <Card padding={0} radius="md" withBorder>
                <Group justify="space-between" px={20} py={15}>
                    <Text fw={700} style={{ fontSize: 15 }}>
                        Seasons
                    </Text>
                    <Text c="dimmed" size="xs">
                        Select a season to open its full dashboard
                    </Text>
                </Group>
                <Box
                    c="dimmed"
                    style={{
                        display: 'grid',
                        fontSize: 10.5,
                        fontWeight: 700,
                        gridTemplateColumns: COLS,
                        letterSpacing: '0.5px',
                        padding: '0 20px 8px',
                    }}
                >
                    <span>SEASON</span>
                    <span>CHAMPIONSHIP</span>
                    <span style={{ textAlign: 'center' }}>STARTS</span>
                    <span style={{ textAlign: 'center' }}>WINS</span>
                    <span style={{ textAlign: 'center' }}>PODIUMS</span>
                    <span style={{ textAlign: 'center' }}>POLES</span>
                    <span style={{ textAlign: 'right' }}>POINTS</span>
                    <span />
                </Box>
                {seasons.map((s) => {
                    const posColor
                        = s.pos === 1
                            ? GOLD
                            : (s.pos <= 3
                                    ? 'var(--mantine-color-gray-9)'
                                    : 'var(--mantine-color-gray-6)');
                    return (
                        <Link
                            className="f1-row"
                            key={s.year}
                            params={{ year: String(Math.min(s.year, CURRENT_YEAR)) }}
                            style={{
                                alignItems: 'center',
                                background: s.champ ? 'rgba(199,145,0,.07)' : undefined,
                                borderTop: '1px solid var(--mantine-color-default-border)',
                                color: 'inherit',
                                display: 'grid',
                                gridTemplateColumns: COLS,
                                padding: '11px 20px',
                                textDecoration: 'none',
                            }}
                            to="/seasons/$year"
                        >
                            <Text className="f1-num" fw={800} style={{ fontSize: 16, letterSpacing: '-0.4px' }}>
                                {s.year}
                            </Text>
                            <Group gap={9} wrap="nowrap">
                                <Text className="f1-num" fw={700} style={{ color: posColor, fontSize: 13.5 }}>
                                    {s.posLabel}
                                </Text>
                                {s.champ ? <TrophyIcon color={GOLD} size={12} weight="fill" /> : null}
                                {s.label
                                    ? (
                                            <Text c="dimmed" fw={600} style={{ fontSize: 12 }}>
                                                {s.label}
                                            </Text>
                                        )
                                    : null}
                            </Group>
                            <Text c="dimmed" className="f1-num" ta="center">
                                {s.starts}
                            </Text>
                            <Text className="f1-num" fw={700} ta="center">
                                {s.wins}
                            </Text>
                            <Text c="dimmed" className="f1-num" ta="center">
                                {s.podiums}
                            </Text>
                            <Text c="dimmed" className="f1-num" ta="center">
                                {s.poles}
                            </Text>
                            <Text className="f1-num" fw={700} ta="right">
                                {s.points}
                            </Text>
                            <CaretRightIcon color="var(--mantine-color-gray-5)" size={14} />
                        </Link>
                    );
                })}
            </Card>
        </Stack>
    );
}
