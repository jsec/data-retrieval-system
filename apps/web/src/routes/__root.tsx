import type { Icon } from '@phosphor-icons/react';
import type { QueryClient } from '@tanstack/react-query';

import {
    ActionIcon,
    AppShell,
    Box,
    Group,
    Progress,
    Stack,
    Text,
    useMantineColorScheme,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import {
    ChartPieSliceIcon,
    ClockCounterClockwiseIcon,
    FlagCheckeredIcon,
    ListIcon,
    ListNumbersIcon,
    MapTrifoldIcon,
    MoonIcon,
    SunIcon,
    UserListIcon,
    WrenchIcon,
} from '@phosphor-icons/react';
import {
    createRootRouteWithContext,
    Link,
    Outlet,
    useRouterState,
} from '@tanstack/react-router';

import { Breadcrumbs } from '#/components/breadcrumbs';
import { COMPLETED, CURRENT_YEAR, TOTAL_ROUNDS } from '#/data/fixtures';

type MyRouterContext = {
    queryClient: QueryClient;
};

export const Route = createRootRouteWithContext<MyRouterContext>()({
    component: RootLayout,
});

type NavItem = {
    icon: Icon;
    label: string;
    /** Path prefixes that should also mark this item active. */
    match: string[];
    params?: Record<string, string>;
    to: string;
};

const year = String(CURRENT_YEAR);

const navItems: NavItem[] = [
    {
        icon: ChartPieSliceIcon,
        label: 'Overview',
        match: ['/seasons/' + year + '/races', '/seasons/' + year],
        params: { year },
        to: '/seasons/$year',
    },
    {
        icon: ClockCounterClockwiseIcon,
        label: 'Seasons',
        match: ['/seasons'],
        to: '/seasons',
    },
    {
        icon: UserListIcon,
        label: 'Drivers',
        match: ['/drivers'],
        to: '/drivers',
    },
    {
        icon: ListNumbersIcon,
        label: 'Standings',
        match: ['/seasons/' + year + '/standings'],
        params: { year },
        to: '/seasons/$year/standings',
    },
    {
        icon: WrenchIcon,
        label: 'Constructors',
        match: ['/constructors'],
        to: '/constructors',
    },
    {
        icon: MapTrifoldIcon,
        label: 'Circuits',
        match: ['/circuits'],
        to: '/circuits',
    },
];

function isActive(pathname: string, item: NavItem): boolean {
    // The "Seasons" index must not steal activation from season-scoped pages.
    if (item.to === '/seasons') return pathname === '/seasons';
    return item.match.some(m => pathname === m || pathname.startsWith(m + '/'));
}

function RootLayout() {
    const [opened, { close, toggle }] = useDisclosure();
    const { colorScheme, toggleColorScheme } = useMantineColorScheme();
    const isDark = colorScheme === 'dark';
    const pathname = useRouterState({ select: s => s.location.pathname });

    return (
        <AppShell
            header={{ height: 60 }}
            navbar={{
                breakpoint: 'sm',
                collapsed: { desktop: false, mobile: !opened },
                width: 232,
            }}
        >
            <AppShell.Navbar className="f1-sidebar" p={0} withBorder={false}>
                <Group gap={11} pb={18} pt={20} px={20} wrap="nowrap">
                    <Box
                        style={{
                            alignItems: 'center',
                            background: '#e8002d',
                            borderRadius: 7,
                            boxShadow: '0 2px 8px rgba(232,0,45,.4)',
                            display: 'flex',
                            height: 32,
                            justifyContent: 'center',
                            width: 32,
                        }}
                    >
                        <FlagCheckeredIcon color="#fff" size={19} weight="bold" />
                    </Box>
                    <Box style={{ lineHeight: 1 }}>
                        <Text c="#fff" style={{ fontSize: 16, fontWeight: 800, letterSpacing: '-0.4px' }}>
                            DRS
                        </Text>
                        <Text mt={2} style={{ color: '#6b7280', fontSize: 10, fontWeight: 600, letterSpacing: '1.5px' }}>
                            F1 ANALYTICS
                        </Text>
                    </Box>
                </Group>

                <Stack gap={2} px={12} style={{ flex: 1 }}>
                    {navItems.map((item) => {
                        const active = isActive(pathname, item);
                        return (
                            <Link
                                key={item.label}
                                onClick={close}
                                params={item.params}
                                style={{
                                    alignItems: 'center',
                                    background: active ? '#e8002d' : 'transparent',
                                    borderRadius: 6,
                                    color: active ? '#fff' : '#c9ccd1',
                                    display: 'flex',
                                    fontSize: 13.5,
                                    fontWeight: 500,
                                    gap: 12,
                                    padding: '10px 12px',
                                    textDecoration: 'none',
                                }}
                                to={item.to}
                            >
                                <item.icon size={18} weight={active ? 'fill' : 'regular'} />
                                <span>{item.label}</span>
                            </Link>
                        );
                    })}
                </Stack>

                <Box m={12} p="14px 16px" style={{ background: '#1e2127', borderRadius: 8 }}>
                    <Text style={{ color: '#6b7280', fontSize: 10, fontWeight: 600, letterSpacing: '1px' }}>
                        {`${CURRENT_YEAR} SEASON`}
                    </Text>
                    <Group align="baseline" gap={6} mt={5}>
                        <Text className="f1-num" style={{ color: '#fff', fontSize: 24, fontWeight: 800 }}>
                            {COMPLETED}
                        </Text>
                        <Text style={{ color: '#8b919a', fontSize: 13 }}>
                            {`/ ${TOTAL_ROUNDS} rounds`}
                        </Text>
                    </Group>
                    <Progress
                        mt={9}
                        radius="xl"
                        size={5}
                        styles={{
                            root: { background: '#2e323a' },
                            section: { background: 'linear-gradient(90deg,#e8002d,#ff5a3c)' },
                        }}
                        value={(COMPLETED / TOTAL_ROUNDS) * 100}
                    />
                </Box>
            </AppShell.Navbar>

            <AppShell.Header>
                <Group gap={16} h="100%" px={28} wrap="nowrap">
                    <ActionIcon
                        aria-label="Toggle navigation"
                        hiddenFrom="sm"
                        onClick={toggle}
                        variant="subtle"
                    >
                        <ListIcon size={18} />
                    </ActionIcon>
                    <Breadcrumbs />
                    <Box style={{ flex: 1 }} />
                    <ActionIcon
                        aria-label="Toggle color scheme"
                        onClick={toggleColorScheme}
                        size="lg"
                        variant="subtle"
                    >
                        {isDark ? <SunIcon size={18} /> : <MoonIcon size={18} />}
                    </ActionIcon>
                </Group>
            </AppShell.Header>

            <AppShell.Main>
                <Box className="f1-scroll" p={28}>
                    <Box maw={1180} mx="auto">
                        <Outlet />
                    </Box>
                </Box>
            </AppShell.Main>
        </AppShell>
    );
}
