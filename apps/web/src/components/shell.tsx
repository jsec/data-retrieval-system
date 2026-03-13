import type { ComponentType } from 'react';

import { Link, Outlet } from '@tanstack/react-router';
import {
    AudioWaveformIcon,
    CalendarIcon,
    ChevronRightIcon,
    CircleUserIcon,
    FlagIcon,
    SearchIcon,
    WrenchIcon,
} from 'lucide-react';

import LogoSvg from '@/assets/svg/logo';
import SearchDialog from '@/components/shadcn-studio/blocks/dialog-search';
import ProfileDropdown from '@/components/shadcn-studio/blocks/dropdown-profile';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Separator } from '@/components/ui/separator';
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuBadge,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
    SidebarProvider,
    SidebarTrigger,
} from '@/components/ui/sidebar';

import { ThemeToggle } from './theme-toggle';

type MenuItem = (
    | { badge?: never; items: MenuSubItem[]; linkTo?: never }
    | {
        badge?: string;
        items?: never;
        linkTo: string;
    }
    ) & {
        icon: ComponentType;
        label: string;
    };

type MenuSubItem = {
    badge?: string;
    label: string;
    linkTo: string;
};

const pages: MenuItem[] = [
    {
        icon: CalendarIcon,
        label: 'Seasons',
        linkTo: '/seasons',
    },
    {
        icon: CircleUserIcon,
        label: 'Drivers',
        linkTo: '/drivers',
    },
    {
        icon: WrenchIcon,
        label: 'Constructors',
        linkTo: '/constructors',
    },
    {
        icon: AudioWaveformIcon,
        label: 'Circuits',
        linkTo: '/circuits',
    },
    {
        icon: FlagIcon,
        label: 'Races',
        linkTo: '/races',
    },
];

const SidebarGroupedMenuItems = ({ data, groupLabel }: Readonly<{ data: MenuItem[]; groupLabel?: string }>) => {
    return (
        <SidebarGroup>
            {groupLabel && <SidebarGroupLabel>{groupLabel}</SidebarGroupLabel>}
            <SidebarGroupContent>
                <SidebarMenu>
                    {data.map(item =>
                        item.items
                            ? (
                                    <Collapsible className="group/collapsible" key={item.label}>
                                        <SidebarMenuItem>
                                            <CollapsibleTrigger asChild>
                                                <SidebarMenuButton tooltip={item.label}>
                                                    <item.icon />
                                                    <span>{item.label}</span>
                                                    <ChevronRightIcon className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                                                </SidebarMenuButton>
                                            </CollapsibleTrigger>
                                            <CollapsibleContent>
                                                <SidebarMenuSub>
                                                    {item.items.map(subItem => (
                                                        <SidebarMenuSubItem key={subItem.label}>
                                                            <SidebarMenuSubButton asChild className="justify-between">
                                                                <a href={subItem.linkTo}>
                                                                    {subItem.label}
                                                                    {subItem.badge && (
                                                                        <span className="bg-primary/10 flex h-5 min-w-5 items-center justify-center rounded-full text-xs">
                                                                            {subItem.badge}
                                                                        </span>
                                                                    )}
                                                                </a>
                                                            </SidebarMenuSubButton>
                                                        </SidebarMenuSubItem>
                                                    ))}
                                                </SidebarMenuSub>
                                            </CollapsibleContent>
                                        </SidebarMenuItem>
                                    </Collapsible>
                                )
                            : (
                                    <SidebarMenuItem key={item.label}>
                                        <SidebarMenuButton asChild tooltip={item.label}>
                                            <Link to={item.linkTo}>
                                                <item.icon />
                                                <span>{item.label}</span>
                                            </Link>
                                        </SidebarMenuButton>
                                        {item.badge && <SidebarMenuBadge className="bg-primary/10 rounded-full">{item.badge}</SidebarMenuBadge>}
                                    </SidebarMenuItem>
                                ),
                    )}
                </SidebarMenu>
            </SidebarGroupContent>
        </SidebarGroup>
    );
};

const ApplicationShell = () => {
    return (
        <div className="flex min-h-dvh w-full">
            <SidebarProvider>
                <Sidebar collapsible="icon">
                    <SidebarHeader>
                        <SidebarMenu>
                            <SidebarMenuItem>
                                <SidebarMenuButton asChild className="gap-2.5 !bg-transparent [&>svg]:size-8" size="lg">
                                    <a href="#">
                                        <LogoSvg className="[&_rect]:fill-sidebar [&_rect:first-child]:fill-primary" />
                                        <div className="flex flex-col items-start">
                                            <span className="text-lg font-semibold">DRS</span>
                                            <span className="text-xs font-light">Data Retrieval System</span>
                                        </div>
                                    </a>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarHeader>
                    <SidebarContent>
                        <SidebarGroupedMenuItems data={pages} />
                    </SidebarContent>
                </Sidebar>
                <div className="flex flex-1 flex-col">
                    <header className="before:bg-background/60 sticky top-0 z-50 before:absolute before:inset-0 before:mask-[linear-gradient(var(--card),var(--card)_18%,transparent_100%)] before:backdrop-blur-md">
                        <div className="bg-card relative z-51 mx-auto mt-3 flex w-[calc(100%-2rem)] max-w-[calc(1280px-3rem)] items-center justify-between rounded-xl border px-6 py-2 sm:w-[calc(100%-3rem)]">
                            <div className="flex items-center gap-1.5 sm:gap-4">
                                <SidebarTrigger className="[&_svg]:!size-5" />
                                <Separator className="hidden !h-4 sm:block" orientation="vertical" />
                                <SearchDialog
                                    trigger={(
                                        <>
                                            <Button className="hidden !bg-transparent px-1 py-0 font-normal sm:block" variant="ghost">
                                                <div className="text-muted-foreground hidden items-center gap-1.5 text-sm sm:flex">
                                                    <SearchIcon />
                                                    <span>Type to search...</span>
                                                </div>
                                            </Button>
                                            <Button className="sm:hidden" size="icon" variant="ghost">
                                                <SearchIcon />
                                                <span className="sr-only">Search</span>
                                            </Button>
                                        </>
                                    )}
                                />
                            </div>
                            <div className="flex items-center gap-1.5">
                                <ThemeToggle />
                                <ProfileDropdown
                                    trigger={(
                                        <Button className="size-9.5" size="icon" variant="ghost">
                                            <Avatar className="size-9.5 rounded-md">
                                                <AvatarImage src="https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-1.png" />
                                                <AvatarFallback>JD</AvatarFallback>
                                            </Avatar>
                                        </Button>
                                    )}
                                />
                            </div>
                        </div>
                    </header>
                    <main className="mx-auto size-full max-w-7xl flex-1 px-4 py-6 sm:px-6">
                        <Card className="h-250 shadow-none">
                            <CardContent className="h-full">
                                <Outlet />
                            </CardContent>
                        </Card>
                    </main>
                    <footer>
                        <div className="text-muted-foreground mx-auto flex size-full max-w-7xl items-center justify-between gap-3 px-4 py-3 max-sm:flex-col sm:gap-6 sm:px-6">
                            bleh
                        </div>
                    </footer>
                </div>
            </SidebarProvider>
        </div>
    );
};

export default ApplicationShell;
