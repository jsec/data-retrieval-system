import DataTable from '@/components/DataTable'
import { AvatarImage, AvatarFallback, Avatar } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox';
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip'
import { cn } from '@/lib/utils'
import { createFileRoute } from '@tanstack/react-router'
import type { ColumnDef } from '@tanstack/react-table'
import { UserRoundIcon, PencilLineIcon, BrushIcon, PencilRulerIcon, CrownIcon, Badge, Trash2Icon, EyeIcon, EllipsisVerticalIcon } from 'lucide-react'

type Item = {
    id: string
    avatar: string
    fallback: string
    user: string
    email: string
    role: 'admin' | 'author' | 'editor' | 'maintainer' | 'subscriber'
    plan: 'basic' | 'company' | 'enterprise' | 'team'
    billing: 'auto-debit' | 'manual-cash' | 'manual-paypal'
    status: 'active' | 'inactive' | 'pending'
}

const RowActions = () => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <div className='flex'>
                    <Button size='icon' variant='ghost' className='rounded-full p-2' aria-label='Edit item'>
                        <EllipsisVerticalIcon className='size-4.5' aria-hidden='true' />
                    </Button>
                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='start'>
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
    )
}

const userData: Item[] = [
    {
        id: '1',
        avatar: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-1.png',
        fallback: 'JA',
        user: 'Jack Alfredo',
        email: 'jack.alfredo@shadcnstudio.com',
        role: 'maintainer',
        plan: 'enterprise',
        billing: 'auto-debit',
        status: 'active'
    },
    {
        id: '2',
        avatar: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-2.png',
        fallback: 'SM',
        user: 'Sarah Mitchell',
        email: 'sarah.mitchell@company.com',
        role: 'admin',
        plan: 'enterprise',
        billing: 'auto-debit',
        status: 'active'
    },
    {
        id: '3',
        avatar: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-3.png',
        fallback: 'RC',
        user: 'Robert Chen',
        email: 'robert.chen@startup.io',
        role: 'editor',
        plan: 'team',
        billing: 'manual-paypal',
        status: 'pending'
    },
    {
        id: '4',
        avatar: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-4.png',
        fallback: 'EW',
        user: 'Emily Wilson',
        email: 'emily.wilson@freelance.com',
        role: 'author',
        plan: 'basic',
        billing: 'manual-cash',
        status: 'inactive'
    },
    {
        id: '5',
        avatar: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-5.png',
        fallback: 'DG',
        user: 'David Garcia',
        email: 'david.garcia@agency.net',
        role: 'subscriber',
        plan: 'company',
        billing: 'auto-debit',
        status: 'active'
    },
    {
        id: '6',
        avatar: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-6.png',
        fallback: 'LT',
        user: 'Lisa Thompson',
        email: 'lisa.thompson@design.co',
        role: 'editor',
        plan: 'team',
        billing: 'manual-paypal',
        status: 'active'
    },
    {
        id: '7',
        avatar: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-7.png',
        fallback: 'MA',
        user: 'Michael Anderson',
        email: 'michael.anderson@tech.com',
        role: 'maintainer',
        plan: 'enterprise',
        billing: 'auto-debit',
        status: 'pending'
    },
    {
        id: '8',
        avatar: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-8.png',
        fallback: 'JR',
        user: 'Jessica Rodriguez',
        email: 'jessica.rodriguez@startup.com',
        role: 'author',
        plan: 'basic',
        billing: 'manual-cash',
        status: 'active'
    },
    {
        id: '9',
        avatar: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-9.png',
        fallback: 'CB',
        user: 'Christopher Brown',
        email: 'chris.brown@corporate.org',
        role: 'admin',
        plan: 'company',
        billing: 'auto-debit',
        status: 'inactive'
    },
    {
        id: '10',
        avatar: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-10.png',
        fallback: 'AD',
        user: 'Amanda Davis',
        email: 'amanda.davis@marketing.io',
        role: 'subscriber',
        plan: 'basic',
        billing: 'manual-paypal',
        status: 'active'
    },
    {
        id: '11',
        avatar: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-11.png',
        fallback: 'JJ',
        user: 'James Johnson',
        email: 'james.johnson@development.com',
        role: 'maintainer',
        plan: 'team',
        billing: 'auto-debit',
        status: 'pending'
    },
    {
        id: '12',
        avatar: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-12.png',
        fallback: 'MW',
        user: 'Maria Williams',
        email: 'maria.williams@creative.net',
        role: 'editor',
        plan: 'company',
        billing: 'manual-cash',
        status: 'active'
    },
    {
        id: '13',
        avatar: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-13.png',
        fallback: 'RT',
        user: 'Ryan Taylor',
        email: 'ryan.taylor@studio.com',
        role: 'author',
        plan: 'enterprise',
        billing: 'auto-debit',
        status: 'inactive'
    },
    {
        id: '14',
        avatar: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-14.png',
        fallback: 'NK',
        user: 'Nicole Kim',
        email: 'nicole.kim@digital.agency',
        role: 'subscriber',
        plan: 'team',
        billing: 'manual-paypal',
        status: 'active'
    },
    {
        id: '15',
        avatar: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-15.png',
        fallback: 'AL',
        user: 'Andrew Lee',
        email: 'andrew.lee@consulting.biz',
        role: 'admin',
        plan: 'enterprise',
        billing: 'auto-debit',
        status: 'pending'
    },
    {
        id: '16',
        avatar: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-16.png',
        fallback: 'SM',
        user: 'Stephanie Martinez',
        email: 'stephanie.martinez@media.com',
        role: 'editor',
        plan: 'basic',
        billing: 'manual-cash',
        status: 'active'
    },
    {
        id: '17',
        avatar: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-17.png',
        fallback: 'KW',
        user: 'Kevin White',
        email: 'kevin.white@innovation.co',
        role: 'maintainer',
        plan: 'company',
        billing: 'auto-debit',
        status: 'inactive'
    },
    {
        id: '18',
        avatar: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-18.png',
        fallback: 'RH',
        user: 'Rachel Harris',
        email: 'rachel.harris@solutions.org',
        role: 'author',
        plan: 'team',
        billing: 'manual-paypal',
        status: 'active'
    },
    {
        id: '19',
        avatar: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-19.png',
        fallback: 'BT',
        user: 'Brian Turner',
        email: 'brian.turner@platform.io',
        role: 'subscriber',
        plan: 'enterprise',
        billing: 'auto-debit',
        status: 'pending'
    },
    {
        id: '20',
        avatar: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-20.png',
        fallback: 'CM',
        user: 'Catherine Moore',
        email: 'catherine.moore@ventures.com',
        role: 'admin',
        plan: 'basic',
        billing: 'manual-cash',
        status: 'active'
    },
    {
        id: '21',
        avatar: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-21.png',
        fallback: 'TN',
        user: 'Thomas Nelson',
        email: 'thomas.nelson@design.studio',
        role: 'editor',
        plan: 'enterprise',
        billing: 'auto-debit',
        status: 'active'
    },
    {
        id: '22',
        avatar: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-22.png',
        fallback: 'SP',
        user: 'Sophie Parker',
        email: 'sophie.parker@freelance.pro',
        role: 'author',
        plan: 'team',
        billing: 'manual-paypal',
        status: 'inactive'
    },
    {
        id: '23',
        avatar: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-23.png',
        fallback: 'AR',
        user: 'Alexander Reed',
        email: 'alex.reed@innovation.labs',
        role: 'maintainer',
        plan: 'company',
        billing: 'manual-cash',
        status: 'pending'
    },
    {
        id: '24',
        avatar: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-24.png',
        fallback: 'MG',
        user: 'Maya Gonzalez',
        email: 'maya.gonzalez@creative.agency',
        role: 'subscriber',
        plan: 'basic',
        billing: 'auto-debit',
        status: 'active'
    },
    {
        id: '25',
        avatar: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-25.png',
        fallback: 'JS',
        user: 'Jordan Smith',
        email: 'jordan.smith@tech.solutions',
        role: 'admin',
        plan: 'enterprise',
        billing: 'manual-paypal',
        status: 'pending'
    }
]

const columns: ColumnDef<Item>[] = [
    {
        id: 'select',
        header: ({ table }) => (
            <Checkbox
                checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate')}
                onCheckedChange={value => table.toggleAllRowsSelected(!!value)}
                aria-label='Select all'
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={value => row.toggleSelected(!!value)}
                aria-label='Select row'
            />
        ),
        size: 50
    },
    {
        header: 'User',
        accessorKey: 'user',
        cell: ({ row }) => (
            <div className='flex items-center gap-2'>
                <Avatar className='size-9'>
                    <AvatarImage src={row.original.avatar} alt={row.getValue('user')} />
                    <AvatarFallback className='text-xs'>{row.original.fallback}</AvatarFallback>
                </Avatar>
                <div className='flex flex-col'>
                    <span className='font-medium'>{row.getValue('user')}</span>
                    <span className='text-muted-foreground'>{row.original.email}</span>
                </div>
            </div>
        ),
        size: 360
    },
    {
        header: 'Role',
        accessorKey: 'role',
        cell: ({ row }) => {
            const role = row.getValue('role') as string

            const roles = {
                admin: <UserRoundIcon className='size-4 text-green-600 dark:text-green-400' />,
                author: <PencilLineIcon className='text-chart-1 size-4' />,
                editor: <BrushIcon className='text-chart-2 size-4' />,
                maintainer: <PencilRulerIcon className='text-chart-3 size-4' />,
                subscriber: <CrownIcon className='text-chart-5 size-4' />
            }[role]

            return (
                <div className='flex items-center gap-2'>
                    {roles}
                    <span className='capitalize'>{role}</span>
                </div>
            )
        }
    },
    {
        header: 'Plan',
        accessorKey: 'plan',
        cell: ({ row }) => <span className='text-muted-foreground capitalize'>{row.getValue('plan')}</span>
    },
    {
        header: 'Billing',
        accessorKey: 'billing',
        cell: ({ row }) => (
            <span className='text-muted-foreground'>
                {row.getValue('billing') === 'auto-debit'
                    ? 'Auto debit'
                    : row.getValue('billing') === 'manual-cash'
                        ? 'Manual - cash'
                        : 'Manual - PayPal'}
            </span>
        )
    },
    {
        header: 'Status',
        accessorKey: 'status',
        cell: ({ row }) => {
            const status = row.getValue('status') as string

            const styles = {
                active:
                    'bg-green-600/10 text-green-600 focus-visible:ring-green-600/20 dark:bg-green-400/10 dark:text-green-400 dark:focus-visible:ring-green-400/40 [a&]:hover:bg-green-600/5 dark:[a&]:hover:bg-green-400/5',
                inactive:
                    'bg-destructive/10 [a&]:hover:bg-destructive/5 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 text-destructive',
                pending:
                    'bg-amber-600/10 text-amber-600 focus-visible:ring-amber-600/20 dark:bg-amber-400/10 dark:text-amber-400 dark:focus-visible:ring-amber-400/40 [a&]:hover:bg-amber-600/5 dark:[a&]:hover:bg-amber-400/5'
            }[status]

            return (
                <Badge className={cn('rounded-sm border-none capitalize focus-visible:outline-none', styles)}>
                    {row.getValue('status')}
                </Badge>
            )
        }
    },
    {
        id: 'actions',
        header: () => 'Actions',
        cell: () => (
            <div className='flex items-center gap-1'>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button variant='ghost' size={'icon'} aria-label='Delete item'>
                            <Trash2Icon className='size-4.5' />
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>Delete</p>
                    </TooltipContent>
                </Tooltip>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button variant='ghost' size={'icon'} aria-label='View item'>
                            <EyeIcon className='size-4.5' />
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>View</p>
                    </TooltipContent>
                </Tooltip>
                <RowActions />
            </div>
        ),
        enableHiding: false
    }
]

export const Route = createFileRoute('/constructors')({
    component: RouteComponent,
})

function RouteComponent() {
    return (
        <div className='py-8 sm:py-16 lg:py-24'>
            <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
                <Card className='mx-auto w-full max-w-275 py-0'>
                    <DataTable data={userData} columns={columns} />
                </Card>
            </div>
        </div>
    )
}
