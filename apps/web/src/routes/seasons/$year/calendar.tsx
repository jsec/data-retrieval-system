import { Box, Card, Group, Stack, Text, Title } from '@mantine/core';
import { CaretRightIcon } from '@phosphor-icons/react';
import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute, Link } from '@tanstack/react-router';

import { getSeasonDriver, TOTAL_ROUNDS } from '#/data/fixtures';
import { calendarQuery } from '#/data/queries';

export const Route = createFileRoute('/seasons/$year/calendar')({
    component: Calendar,
    loader: async ({ context, params }) => {
        await context.queryClient.ensureQueryData(calendarQuery(Number(params.year)));
        return {
            crumbs: [
                { label: params.year, params: { year: params.year }, to: '/seasons/$year' },
                { label: 'Calendar' },
            ],
        };
    },
});

function Calendar() {
    const { year } = Route.useParams();
    const { data } = useSuspenseQuery(calendarQuery(Number(year)));

    return (
        <Stack gap="md">
            <Box>
                <Title order={1} style={{ fontSize: 28 }}>
                    {`${year} Race Calendar`}
                </Title>
                <Text c="dimmed" mt={4} size="13px">
                    {`${data.completed} of ${TOTAL_ROUNDS} rounds completed`}
                </Text>
            </Box>

            <Stack gap={9}>
                {data.calendar.map((r) => {
                    const done = r.round <= data.completed;
                    const next = r.round === data.completed + 1;
                    const winner = r.winner ? getSeasonDriver(r.winner) : null;
                    const row = (
                        <Card className={done ? 'f1-row' : undefined} padding={0} radius="md" withBorder>
                            <Group gap={18} px={20} py={14} wrap="nowrap">
                                <Text
                                    className="f1-num"
                                    fw={800}
                                    style={{ color: 'var(--mantine-color-gray-3)', fontSize: 20, width: 42 }}
                                >
                                    {r.round}
                                </Text>
                                <Box
                                    style={{
                                        alignItems: 'center',
                                        background: 'light-dark(var(--mantine-color-gray-0), var(--mantine-color-dark-6))',
                                        borderRadius: 6,
                                        color: 'var(--mantine-color-gray-7)',
                                        display: 'flex',
                                        fontSize: 13,
                                        fontWeight: 800,
                                        height: 40,
                                        justifyContent: 'center',
                                        width: 54,
                                    }}
                                >
                                    {r.code}
                                </Box>
                                <Box style={{ flex: 1, minWidth: 0 }}>
                                    <Text fw={700} style={{ fontSize: 15 }}>
                                        {r.name}
                                    </Text>
                                    <Text c="dimmed" style={{ fontSize: 12 }}>
                                        {r.circuit}
                                    </Text>
                                </Box>
                                <Text c="dimmed" style={{ fontSize: 12.5, width: 120 }}>
                                    {r.date}
                                </Text>
                                <Group gap={9} style={{ width: 200 }} wrap="nowrap">
                                    {done && winner ? (
                                        <>
                                            <Text c="dimmed" fw={600} style={{ fontSize: 11 }}>
                                                WINNER
                                            </Text>
                                            <Box style={{ background: winner.color, borderRadius: 2, height: 20, width: 4 }} />
                                            <Text fw={600} style={{ fontSize: 13 }}>
                                                {winner.short}
                                            </Text>
                                        </>
                                    ) : (
                                        <Text c="blue.6" fw={700} style={{ fontSize: 12 }}>
                                            {next ? 'UP NEXT' : 'Scheduled'}
                                        </Text>
                                    )}
                                </Group>
                                <CaretRightIcon color="var(--mantine-color-gray-4)" size={15} />
                            </Group>
                        </Card>
                    );
                    return done ? (
                        <Link
                            key={r.round}
                            params={{ round: String(r.round), year }}
                            style={{ color: 'inherit', textDecoration: 'none' }}
                            to="/seasons/$year/races/$round"
                        >
                            {row}
                        </Link>
                    ) : (
                        <Box key={r.round}>{row}</Box>
                    );
                })}
            </Stack>
        </Stack>
    );
}
