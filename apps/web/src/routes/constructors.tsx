import type { ColumnDef } from '@tanstack/react-table';

import { createFileRoute } from '@tanstack/react-router';
import { Badge, BrushIcon, CrownIcon, EllipsisVerticalIcon, EyeIcon, PencilLineIcon, PencilRulerIcon, Trash2Icon, UserRoundIcon } from 'lucide-react';

import DataTable from '@/components/data-table';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';

type Item = {
    avatar: string;
    billing: 'auto-debit' | 'manual-cash' | 'manual-paypal';
    email: string;
    fallback: string;
    id: string;
    plan: 'basic' | 'company' | 'enterprise' | 'team';
    role: 'admin' | 'author' | 'editor' | 'maintainer' | 'subscriber';
    status: 'active' | 'inactive' | 'pending';
    user: string;
};

const RowActions = () => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <div className="flex">
                    <Button aria-label="Edit item" className="rounded-full p-2" size="icon" variant="ghost">
                        <EllipsisVerticalIcon aria-hidden="true" className="size-4.5" />
                    </Button>
                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
                <DropdownMenuGroup>
                    <DropdownMenuItem>
                        <span>Edit</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <span>Duplicate</span>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

const userData: Item[] = [
    {
        avatar: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-1.png',
        billing: 'auto-debit',
        email: 'jack.alfredo@shadcnstudio.com',
        fallback: 'JA',
        id: '1',
        plan: 'enterprise',
        role: 'maintainer',
        status: 'active',
        user: 'Jack Alfredo',
    },
    {
        avatar: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-2.png',
        billing: 'auto-debit',
        email: 'sarah.mitchell@company.com',
        fallback: 'SM',
        id: '2',
        plan: 'enterprise',
        role: 'admin',
        status: 'active',
        user: 'Sarah Mitchell',
    },
    {
        avatar: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-3.png',
        billing: 'manual-paypal',
        email: 'robert.chen@startup.io',
        fallback: 'RC',
        id: '3',
        plan: 'team',
        role: 'editor',
        status: 'pending',
        user: 'Robert Chen',
    },
    {
        avatar: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-4.png',
        billing: 'manual-cash',
        email: 'emily.wilson@freelance.com',
        fallback: 'EW',
        id: '4',
        plan: 'basic',
        role: 'author',
        status: 'inactive',
        user: 'Emily Wilson',
    },
    {
        avatar: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-5.png',
        billing: 'auto-debit',
        email: 'david.garcia@agency.net',
        fallback: 'DG',
        id: '5',
        plan: 'company',
        role: 'subscriber',
        status: 'active',
        user: 'David Garcia',
    },
    {
        avatar: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-6.png',
        billing: 'manual-paypal',
        email: 'lisa.thompson@design.co',
        fallback: 'LT',
        id: '6',
        plan: 'team',
        role: 'editor',
        status: 'active',
        user: 'Lisa Thompson',
    },
    {
        avatar: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-7.png',
        billing: 'auto-debit',
        email: 'michael.anderson@tech.com',
        fallback: 'MA',
        id: '7',
        plan: 'enterprise',
        role: 'maintainer',
        status: 'pending',
        user: 'Michael Anderson',
    },
    {
        avatar: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-8.png',
        billing: 'manual-cash',
        email: 'jessica.rodriguez@startup.com',
        fallback: 'JR',
        id: '8',
        plan: 'basic',
        role: 'author',
        status: 'active',
        user: 'Jessica Rodriguez',
    },
    {
        avatar: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-9.png',
        billing: 'auto-debit',
        email: 'chris.brown@corporate.org',
        fallback: 'CB',
        id: '9',
        plan: 'company',
        role: 'admin',
        status: 'inactive',
        user: 'Christopher Brown',
    },
    {
        avatar: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-10.png',
        billing: 'manual-paypal',
        email: 'amanda.davis@marketing.io',
        fallback: 'AD',
        id: '10',
        plan: 'basic',
        role: 'subscriber',
        status: 'active',
        user: 'Amanda Davis',
    },
    {
        avatar: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-11.png',
        billing: 'auto-debit',
        email: 'james.johnson@development.com',
        fallback: 'JJ',
        id: '11',
        plan: 'team',
        role: 'maintainer',
        status: 'pending',
        user: 'James Johnson',
    },
    {
        avatar: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-12.png',
        billing: 'manual-cash',
        email: 'maria.williams@creative.net',
        fallback: 'MW',
        id: '12',
        plan: 'company',
        role: 'editor',
        status: 'active',
        user: 'Maria Williams',
    },
    {
        avatar: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-13.png',
        billing: 'auto-debit',
        email: 'ryan.taylor@studio.com',
        fallback: 'RT',
        id: '13',
        plan: 'enterprise',
        role: 'author',
        status: 'inactive',
        user: 'Ryan Taylor',
    },
    {
        avatar: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-14.png',
        billing: 'manual-paypal',
        email: 'nicole.kim@digital.agency',
        fallback: 'NK',
        id: '14',
        plan: 'team',
        role: 'subscriber',
        status: 'active',
        user: 'Nicole Kim',
    },
    {
        avatar: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-15.png',
        billing: 'auto-debit',
        email: 'andrew.lee@consulting.biz',
        fallback: 'AL',
        id: '15',
        plan: 'enterprise',
        role: 'admin',
        status: 'pending',
        user: 'Andrew Lee',
    },
    {
        avatar: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-16.png',
        billing: 'manual-cash',
        email: 'stephanie.martinez@media.com',
        fallback: 'SM',
        id: '16',
        plan: 'basic',
        role: 'editor',
        status: 'active',
        user: 'Stephanie Martinez',
    },
    {
        avatar: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-17.png',
        billing: 'auto-debit',
        email: 'kevin.white@innovation.co',
        fallback: 'KW',
        id: '17',
        plan: 'company',
        role: 'maintainer',
        status: 'inactive',
        user: 'Kevin White',
    },
    {
        avatar: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-18.png',
        billing: 'manual-paypal',
        email: 'rachel.harris@solutions.org',
        fallback: 'RH',
        id: '18',
        plan: 'team',
        role: 'author',
        status: 'active',
        user: 'Rachel Harris',
    },
    {
        avatar: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-19.png',
        billing: 'auto-debit',
        email: 'brian.turner@platform.io',
        fallback: 'BT',
        id: '19',
        plan: 'enterprise',
        role: 'subscriber',
        status: 'pending',
        user: 'Brian Turner',
    },
    {
        avatar: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-20.png',
        billing: 'manual-cash',
        email: 'catherine.moore@ventures.com',
        fallback: 'CM',
        id: '20',
        plan: 'basic',
        role: 'admin',
        status: 'active',
        user: 'Catherine Moore',
    },
    {
        avatar: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-21.png',
        billing: 'auto-debit',
        email: 'thomas.nelson@design.studio',
        fallback: 'TN',
        id: '21',
        plan: 'enterprise',
        role: 'editor',
        status: 'active',
        user: 'Thomas Nelson',
    },
    {
        avatar: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-22.png',
        billing: 'manual-paypal',
        email: 'sophie.parker@freelance.pro',
        fallback: 'SP',
        id: '22',
        plan: 'team',
        role: 'author',
        status: 'inactive',
        user: 'Sophie Parker',
    },
    {
        avatar: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-23.png',
        billing: 'manual-cash',
        email: 'alex.reed@innovation.labs',
        fallback: 'AR',
        id: '23',
        plan: 'company',
        role: 'maintainer',
        status: 'pending',
        user: 'Alexander Reed',
    },
    {
        avatar: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-24.png',
        billing: 'auto-debit',
        email: 'maya.gonzalez@creative.agency',
        fallback: 'MG',
        id: '24',
        plan: 'basic',
        role: 'subscriber',
        status: 'active',
        user: 'Maya Gonzalez',
    },
    {
        avatar: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-25.png',
        billing: 'manual-paypal',
        email: 'jordan.smith@tech.solutions',
        fallback: 'JS',
        id: '25',
        plan: 'enterprise',
        role: 'admin',
        status: 'pending',
        user: 'Jordan Smith',
    },
];

const columns: ColumnDef<Item>[] = [
    {
        cell: ({ row }) => (
            <Checkbox
                aria-label="Select row"
                checked={row.getIsSelected()}
                onCheckedChange={value => row.toggleSelected(!!value)}
            />
        ),
        header: ({ table }) => (
            <Checkbox
                aria-label="Select all"
                checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate')}
                onCheckedChange={value => table.toggleAllRowsSelected(!!value)}
            />
        ),
        id: 'select',
        size: 50,
    },
    {
        accessorKey: 'user',
        cell: ({ row }) => (
            <div className="flex items-center gap-2">
                <Avatar className="size-9">
                    <AvatarImage alt={row.getValue('user')} src={row.original.avatar} />
                    <AvatarFallback className="text-xs">{row.original.fallback}</AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                    <span className="font-medium">{row.getValue('user')}</span>
                    <span className="text-muted-foreground">{row.original.email}</span>
                </div>
            </div>
        ),
        header: 'User',
        size: 360,
    },
    {
        accessorKey: 'role',
        cell: ({ row }) => {
            const role = row.getValue('role') as string;

            const roles = {
                admin: <UserRoundIcon className="size-4 text-green-600 dark:text-green-400" />,
                author: <PencilLineIcon className="text-chart-1 size-4" />,
                editor: <BrushIcon className="text-chart-2 size-4" />,
                maintainer: <PencilRulerIcon className="text-chart-3 size-4" />,
                subscriber: <CrownIcon className="text-chart-5 size-4" />,
            }[role];

            return (
                <div className="flex items-center gap-2">
                    {roles}
                    <span className="capitalize">{role}</span>
                </div>
            );
        },
        header: 'Role',
    },
    {
        accessorKey: 'plan',
        cell: ({ row }) => <span className="text-muted-foreground capitalize">{row.getValue('plan')}</span>,
        header: 'Plan',
    },
    {
        accessorKey: 'billing',
        cell: ({ row }) => (
            <span className="text-muted-foreground">
                {row.getValue('billing') === 'auto-debit'
                    ? 'Auto debit'
                    : (row.getValue('billing') === 'manual-cash'
                        ? 'Manual - cash'
                        : 'Manual - PayPal')}
            </span>
        ),
        header: 'Billing',
    },
    {
        accessorKey: 'status',
        cell: ({ row }) => {
            const status = row.getValue('status') as string;

            const styles = {
                active:
                    'bg-green-600/10 text-green-600 focus-visible:ring-green-600/20 dark:bg-green-400/10 dark:text-green-400 dark:focus-visible:ring-green-400/40 [a&]:hover:bg-green-600/5 dark:[a&]:hover:bg-green-400/5',
                inactive:
                    'bg-destructive/10 [a&]:hover:bg-destructive/5 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 text-destructive',
                pending:
                    'bg-amber-600/10 text-amber-600 focus-visible:ring-amber-600/20 dark:bg-amber-400/10 dark:text-amber-400 dark:focus-visible:ring-amber-400/40 [a&]:hover:bg-amber-600/5 dark:[a&]:hover:bg-amber-400/5',
            }[status];

            return (
                <Badge className={cn('rounded-sm border-none capitalize focus-visible:outline-none', styles)}>
                    {row.getValue('status')}
                </Badge>
            );
        },
        header: 'Status',
    },
    {
        cell: () => (
            <div className="flex items-center gap-1">
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button aria-label="Delete item" size="icon" variant="ghost">
                            <Trash2Icon className="size-4.5" />
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>Delete</p>
                    </TooltipContent>
                </Tooltip>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button aria-label="View item" size="icon" variant="ghost">
                            <EyeIcon className="size-4.5" />
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>View</p>
                    </TooltipContent>
                </Tooltip>
                <RowActions />
            </div>
        ),
        enableHiding: false,
        header: () => 'Actions',
        id: 'actions',
    },
];

export const Route = createFileRoute('/constructors')({
    component: RouteComponent,
});

function RouteComponent() {
    return (
        <div className="py-8 sm:py-16 lg:py-24">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <Card className="mx-auto w-full max-w-275 py-0">
                    <DataTable columns={columns} data={userData} />
                </Card>
            </div>
        </div>
    );
}
