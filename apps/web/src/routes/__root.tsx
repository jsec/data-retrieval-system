import type { Icon } from '@phosphor-icons/react';
import type { QueryClient } from '@tanstack/react-query';

import {
    ChartPieSliceIcon,
    ClockCounterClockwiseIcon,
    FlagCheckeredIcon,
    MapTrifoldIcon,
    MoonIcon,
    SidebarSimpleIcon,
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
import { useState } from 'react';

import { Breadcrumbs } from '#/components/breadcrumbs';
import { Button } from '#/components/ui/button';
import { COMPLETED, CURRENT_YEAR, TOTAL_ROUNDS } from '#/data/fixtures';
import { useTheme } from '#/lib/theme';
import { cn } from '#/lib/utils';

type MyRouterContext = {
    queryClient: QueryClient;
};

type NavItem = {
    icon: Icon;
    label: string;
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

const isActive = (pathname: string, item: NavItem): boolean => {
    if (item.to === '/seasons') return pathname === '/seasons';
    return item.match.some(m => pathname === m || pathname.startsWith(m + '/'));
};

const progressPct = Math.round((COMPLETED / TOTAL_ROUNDS) * 100);

const RootLayout = () => {
    const [collapsed, setCollapsed] = useState(false);
    const { resolvedTheme, toggleTheme } = useTheme();
    const pathname = useRouterState({ select: s => s.location.pathname });

    return (
        <div className="f1-app">
            <nav className="f1-sidebar" data-collapsed={collapsed}>
                <div className="f1-brand">
                    <div className="f1-brand-mark">
                        <FlagCheckeredIcon color="#fff" size={19} weight="bold" />
                    </div>
                    <div className="f1-brand-text">
                        <div className="f1-brand-title">
                            DRS
                        </div>
                        <div className="f1-brand-subtitle">
                            F1 ANALYTICS
                        </div>
                    </div>
                </div>

                <div className="f1-nav-list">
                    {navItems.map((item) => {
                        const active = isActive(pathname, item);
                        return (
                            <Link
                                className={cn('f1-nav-item', active && 'f1-nav-item--active')}
                                key={item.label}
                                params={item.params}
                                title={collapsed ? item.label : undefined}
                                to={item.to}
                            >
                                <item.icon size={18} weight={active ? 'fill' : 'regular'} />
                                <span className="f1-nav-label">{item.label}</span>
                            </Link>
                        );
                    })}
                </div>

                <div className="f1-season-progress">
                    <div className="f1-season-progress-label">
                        {`${CURRENT_YEAR} SEASON`}
                    </div>
                    <div className="f1-season-progress-value">
                        <span className="f1-num f1-display f1-season-progress-count">
                            {COMPLETED}
                        </span>
                        <span className="f1-season-progress-total">
                            {`/ ${TOTAL_ROUNDS} rounds`}
                        </span>
                    </div>
                    <div className="f1-progress-track">
                        <div className="f1-progress-fill" style={{ width: `${progressPct}%` }} />
                    </div>
                </div>

            </nav>

            <div className="f1-main">
                <header className="f1-header">
                    <Button
                        aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
                        onClick={() => setCollapsed(c => !c)}
                        size="icon"
                        variant="ghost"
                    >
                        <SidebarSimpleIcon size={18} />
                    </Button>
                    <Breadcrumbs />
                    <div className="f1-toolbar-spacer" />
                    <Button
                        aria-label="Toggle color scheme"
                        onClick={toggleTheme}
                        size="icon"
                        variant="outline"
                    >
                        {resolvedTheme === 'dark' ? <SunIcon size={18} /> : <MoonIcon size={18} />}
                    </Button>
                </header>

                <main className="f1-scroll f1-content">
                    <div className="f1-content-inner">
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    );
};

export const Route = createRootRouteWithContext<MyRouterContext>()({
    component: RootLayout,
});
