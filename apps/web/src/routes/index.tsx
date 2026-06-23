import {
    ActionIcon,
    AppShell,
    Card,
    Grid,
    Group,
    NavLink,
    Stack,
    Text,
    ThemeIcon,
    Title,
    useMantineColorScheme,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import {
    CalendarBlankIcon,
    DatabaseIcon,
    FlagCheckeredIcon,
    GaugeIcon,
    GearSixIcon,
    ListIcon,
    MapPinIcon,
    MoonIcon,
    SunIcon,
    TrophyIcon,
} from '@phosphor-icons/react';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/')({ component: Home });

const navItems = [
    { icon: GaugeIcon, label: 'Overview' },
    { icon: CalendarBlankIcon, label: 'Seasons' },
    { icon: MapPinIcon, label: 'Circuits' },
    { icon: TrophyIcon, label: 'Drivers' },
    { icon: FlagCheckeredIcon, label: 'Results' },
    { icon: GearSixIcon, label: 'Settings' },
];

const summaryCards = [
    {
        detail: 'Historical race results',
        label: 'Race Results',
        value: '1,124',
    },
    {
        detail: 'F1 circuit history',
        label: 'Circuits',
        value: '77',
    },
    {
        detail: 'Championship seasons',
        label: 'Seasons',
        value: '74',
    },
];

function Home() {
    const [opened, { toggle }] = useDisclosure();
    const { colorScheme, setColorScheme } = useMantineColorScheme();
    const isDark = colorScheme === 'dark';

    return (
        <AppShell
            header={{ height: 64 }}
            navbar={{
                breakpoint: 'sm',
                collapsed: { desktop: false, mobile: !opened },
                width: 280,
            }}
            padding="md"
        >
            <AppShell.Header>
                <Group h="100%" justify="space-between" px="md">
                    <Group gap="sm">
                        <ActionIcon
                            aria-label="Toggle navigation"
                            hiddenFrom="sm"
                            onClick={toggle}
                            variant="subtle"
                        >
                            <ListIcon size={18} />
                        </ActionIcon>
                        <ThemeIcon radius="md" size="lg" variant="filled">
                            <DatabaseIcon size={20} />
                        </ThemeIcon>
                        <div>
                            <Title order={3}>DRS</Title>
                            <Text c="dimmed" size="xs">
                                Data Retrieval System
                            </Text>
                        </div>
                    </Group>
                    <ActionIcon
                        aria-label="Toggle color scheme"
                        onClick={() => {
                            setColorScheme(isDark ? 'light' : 'dark');
                        }}
                        size="lg"
                        variant="subtle"
                    >
                        {isDark ? <SunIcon size={18} /> : <MoonIcon size={18} />}
                    </ActionIcon>
                </Group>
            </AppShell.Header>

            <AppShell.Navbar p="md">
                <Stack gap="xs">
                    {navItems.map((item, index) => (
                        <NavLink
                            active={index === 0}
                            href="#"
                            key={item.label}
                            label={item.label}
                            leftSection={<item.icon size={18} />}
                            variant="light"
                        />
                    ))}
                </Stack>
            </AppShell.Navbar>

            <AppShell.Main>
                <Stack gap="lg">
                    <Group align="flex-start" justify="space-between">
                        <div>
                            <Title order={1}>Placeholder text</Title>
                            <Text c="dimmed" maw={680} mt="sm">
                                Explore seasons, circuits, drivers, and race results from 75+ years of Formula 1.
                            </Text>
                        </div>
                    </Group>

                    <Grid>
                        {summaryCards.map(card => (
                            <Grid.Col key={card.label} span={{ base: 12, md: 4 }}>
                                <Card withBorder>
                                    <Text c="dimmed" fw={600} size="sm">
                                        {card.label}
                                    </Text>
                                    <Title mt="xs" order={2}>
                                        {card.value}
                                    </Title>
                                    <Text c="dimmed" mt="xs" size="sm">
                                        {card.detail}
                                    </Text>
                                </Card>
                            </Grid.Col>
                        ))}
                    </Grid>
                </Stack>
            </AppShell.Main>
        </AppShell>
    );
}
