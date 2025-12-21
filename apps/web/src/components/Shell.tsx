import type { ComponentType, CSSProperties } from 'react'

import {
    ActivityIcon,
    ArrowDownLeftIcon,
    ArrowRightLeftIcon,
    BellIcon,
    ChevronRightIcon,
    CirclePlusIcon,
    CreditCardIcon,
    DollarSignIcon,
    FacebookIcon,
    HomeIcon,
    InstagramIcon,
    LandmarkIcon,
    LanguagesIcon,
    LinkedinIcon,
    PackageIcon,
    SearchIcon,
    TwitterIcon,
    UsersIcon,
    WalletIcon
} from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
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
    SidebarProvider
} from '@/components/ui/sidebar'

import LogoSvg from '@/assets/svg/logo'
import TotalOrdersCardSvg from '@/assets/svg/total-orders-card-svg'
import MenuTrigger from '@/components/shadcn-studio/blocks/menu-trigger'
import SearchDialog from '@/components/shadcn-studio/blocks/dialog-search'
import LanguageDropdown from '@/components/shadcn-studio/blocks/dropdown-language'
import ActivityDialog from '@/components/shadcn-studio/blocks/dialog-activity'
import NotificationDropdown from '@/components/shadcn-studio/blocks/dropdown-notification'
import ProfileDropdown from '@/components/shadcn-studio/blocks/dropdown-profile'
import SidebarUserDropdown from '@/components/shadcn-studio/blocks/sidebar-user-dropdown'
import StatisticsIncomeCard from '@/components/shadcn-studio/blocks/statistics-income-card'
import StatisticsExpenseCard from '@/components/shadcn-studio/blocks/statistics-expense-card'
import StatisticsCardWithSvg from '@/components/shadcn-studio/blocks/statistics-card-04'
import PaymentHistoryCard from '@/components/shadcn-studio/blocks/widget-payment-history'
import TotalRevenueCard from '@/components/shadcn-studio/blocks/chart-total-revenue'
import SalesByCountryCard from '@/components/shadcn-studio/blocks/widget-sales-by-countries'
import TransactionsCard from '@/components/shadcn-studio/blocks/widget-transactions'
import TotalEarningCard from '@/components/shadcn-studio/blocks/widget-total-earning'
import InvoiceDatatable, { type Item } from '@/components/shadcn-studio/blocks/datatable-invoice'

type MenuSubItem = {
    label: string
    href: string
    badge?: string
}

type MenuItem = {
    icon: ComponentType
    label: string
} & (
        | {
            href: string
            badge?: string
            items?: never
        }
        | { href?: never; badge?: never; items: MenuSubItem[] }
    )

type RecipientsItem = {
    name: string
    avatarSrc: string
    href: string
}

const pagesItems: MenuItem[] = [
    {
        icon: HomeIcon,
        label: 'Home',
        href: '#'
    },
    {
        icon: WalletIcon,
        label: 'Wallet Management',
        items: [
            { label: 'Account Overview', href: '#' },
            { label: 'Available Funds', href: '#' },
            { label: 'Transaction History', href: '#' }
        ]
    },
    {
        icon: ArrowRightLeftIcon,
        label: 'Money Transfers',
        items: [
            { label: 'Transfer Overview', href: '#' },
            { label: 'Transfer Methods', href: '#' }
        ]
    },
    {
        icon: CirclePlusIcon,
        label: 'Deposit Funds',
        items: [
            { label: 'Deposit Amount', href: '#' },
            { label: 'Payment Method', href: '#' },
            { label: 'Confirmation', href: '#' }
        ]
    },
    {
        icon: ArrowDownLeftIcon,
        label: 'Request Funds',
        items: [
            { label: 'Request Details', href: '#' },
            { label: 'Amount to Request', href: '#' },
            { label: 'Share Request', href: '#' }
        ]
    },
    {
        icon: DollarSignIcon,
        label: 'Payment Requests',
        items: [
            { label: 'Request Overview', href: '#' },
            { label: 'Payment Details', href: '#' }
        ]
    },
    {
        icon: PackageIcon,
        label: 'Order Management',
        items: [
            { label: 'Order Overview', href: '#' },
            { label: 'Add New Order', href: '#' },
            { label: 'View Orders', href: '#' }
        ]
    },
    {
        icon: UsersIcon,
        label: 'User Management',
        items: [
            { label: 'Users Overview', href: '#' },
            { label: 'Active Users', href: '#' }
        ]
    }
]

const recipientsItems: RecipientsItem[] = [
    {
        name: 'Liam Anderson',
        avatarSrc: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-3.png',
        href: '#'
    },
    {
        name: 'Emma Smith',
        avatarSrc: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-4.png',
        href: '#'
    },
    {
        name: 'Ethan Bennett',
        avatarSrc: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-5.png',
        href: '#'
    },
    {
        name: 'Olivia Morgan',
        avatarSrc: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-6.png',
        href: '#'
    },
    {
        name: 'Noah Carter',
        avatarSrc: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-7.png',
        href: '#'
    },
    {
        name: 'Ava Thompson',
        avatarSrc: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-8.png',
        href: '#'
    }
]

// Payment gateways data
const paymentData = [
    {
        img: 'https://cdn.shadcnstudio.com/ss-assets/blocks/dashboard-application/widgets/master-card.png',
        imgWidth: 8,
        cardNumber: '5688',
        cardType: 'Credit Card',
        date: '05/Jan',
        spend: '2,820',
        remaining: '10,020'
    },
    {
        img: 'https://cdn.shadcnstudio.com/ss-assets/blocks/dashboard-application/widgets/visa.png',
        imgWidth: 8,
        cardNumber: '8562',
        cardType: 'Debit Card',
        date: '15/Feb',
        spend: '1,450',
        remaining: '8,570'
    },
    {
        img: 'https://cdn.shadcnstudio.com/ss-assets/blocks/dashboard-application/widgets/american-express.png',
        imgWidth: 8,
        cardNumber: '5238',
        cardType: 'ATM card',
        date: '20/Mar',
        spend: '500',
        remaining: '7,070'
    },
    {
        img: 'https://cdn.shadcnstudio.com/ss-assets/blocks/dashboard-application/widgets/visa.png',
        imgWidth: 8,
        cardNumber: '8562',
        cardType: 'Debit card',
        date: '10/Mar',
        spend: '750',
        remaining: '5,120'
    },
    {
        img: 'https://cdn.shadcnstudio.com/ss-assets/blocks/dashboard-application/widgets/master-card.png',
        imgWidth: 8,
        cardNumber: '*5688',
        cardType: 'Credit Card',
        date: '25/May',
        spend: '1,200',
        remaining: '5,870'
    }
]

// Sales data
const Sales = [
    {
        img: 'https://cdn.shadcnstudio.com/ss-assets/flags/austria.png',
        sales: '$867k',
        country: 'Austria',
        changePercentage: '20.3%',
        trend: 'up'
    },
    {
        img: 'https://cdn.shadcnstudio.com/ss-assets/flags/china.png',
        sales: '$1.2M',
        country: 'China',
        changePercentage: '15.7%',
        trend: 'up'
    },
    {
        img: 'https://cdn.shadcnstudio.com/ss-assets/flags/switzerland.png',
        sales: '$750k',
        country: 'Switzerland',
        changePercentage: '18.2%',
        trend: 'down'
    },
    {
        img: 'https://cdn.shadcnstudio.com/ss-assets/flags/india.png',
        sales: '$1.5M',
        country: 'India',
        changePercentage: '22.1%',
        trend: 'up'
    },
    {
        img: 'https://cdn.shadcnstudio.com/ss-assets/flags/brazil.png',
        sales: '$980k',
        country: 'Brazil',
        changePercentage: '19.6%',
        trend: 'down'
    }
]

// Transactions data
const transactions = [
    {
        icon: CreditCardIcon,
        paymentMethod: 'Credit Card',
        platform: 'Digital Ocean',
        amount: '$2820',
        paymentType: 'debit'
    },
    {
        icon: LandmarkIcon,
        paymentMethod: 'Bank account',
        platform: 'Received money',
        amount: '$1,260',
        paymentType: 'credit'
    },
    {
        icon: CreditCardIcon,
        paymentMethod: 'Credit Card',
        platform: 'Netflix',
        amount: '$149',
        paymentType: 'debit'
    },
    {
        icon: WalletIcon,
        paymentMethod: 'Wallet',
        platform: 'Starbucks',
        amount: '$49',
        paymentType: 'debit'
    },
    {
        icon: LandmarkIcon,
        paymentMethod: 'Bank account',
        platform: 'Received money',
        amount: '$268',
        paymentType: 'credit'
    }
]

// Earning data
const earningData = [
    {
        img: 'https://cdn.shadcnstudio.com/ss-assets/blocks/dashboard-application/widgets/zipcar.png',
        platform: 'Zipcar',
        technologies: 'Vuejs & HTML',
        earnings: '-$23,569.26',
        progressPercentage: 75
    },
    {
        img: 'https://cdn.shadcnstudio.com/ss-assets/blocks/dashboard-application/widgets/bitbank.png',
        platform: 'Bitbank',
        technologies: 'Figma & React',
        earnings: '-$12,650.31',
        progressPercentage: 25
    },
    {
        img: 'https://cdn.shadcnstudio.com/ss-assets/blocks/dashboard-application/widgets/aviato.png',
        platform: 'Aviato',
        technologies: 'HTML & Angular',
        earnings: '-$55,699.50',
        progressPercentage: 50
    }
]

// Invoice data
const invoiceData: Item[] = [
    {
        id: '5099',
        status: 'draft',
        avatar: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-1.png',
        fallback: 'JA',
        client: 'Jack Alfredo',
        field: 'UI/UX designer',
        total: 3120,
        issuedDate: new Date('2025-04-03'),
        balance: 0
    },
    {
        id: '5008',
        status: 'paid',
        avatar: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-2.png',
        fallback: 'MG',
        client: 'Maria Gonzalez',
        field: 'Frontend developer',
        total: 1450,
        issuedDate: new Date('2025-05-12'),
        balance: 0
    },
    {
        id: '5101',
        status: 'paid',
        avatar: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-3.png',
        fallback: 'JD',
        client: 'John Doe',
        field: 'Graphic designer',
        total: 1200,
        issuedDate: new Date('2025-06-26'),
        balance: 0
    },
    {
        id: '4586',
        status: 'downloaded',
        avatar: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-4.png',
        fallback: 'EC',
        client: 'Emily Carter',
        field: 'UI/UX designer',
        total: 2680,
        issuedDate: new Date('2025-07-05'),
        balance: -78
    },
    {
        id: '4360',
        status: 'draft',
        avatar: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-5.png',
        fallback: 'DL',
        client: 'David Lee',
        field: 'Backend developer',
        total: 3120,
        issuedDate: new Date('2025-08-07'),
        balance: 0
    },
    {
        id: '5104',
        status: 'past due',
        avatar: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-6.png',
        fallback: 'SP',
        client: 'Sophia Patel',
        field: 'Product manager',
        total: 1600,
        issuedDate: new Date('2025-08-26'),
        balance: 86
    },
    {
        id: '5201',
        status: 'paid',
        avatar: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-7.png',
        fallback: 'MW',
        client: 'Michael Williams',
        field: 'Full Stack Developer',
        total: 2850,
        issuedDate: new Date('2025-01-15'),
        balance: 0
    },
    {
        id: '4987',
        status: 'draft',
        avatar: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-8.png',
        fallback: 'AB',
        client: 'Amanda Brown',
        field: 'Marketing Specialist',
        total: 1750,
        issuedDate: new Date('2025-02-20'),
        balance: 0
    },
    {
        id: '5342',
        status: 'downloaded',
        avatar: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-9.png',
        fallback: 'RJ',
        client: 'Robert Johnson',
        field: 'DevOps Engineer',
        total: 3500,
        issuedDate: new Date('2025-03-10'),
        balance: -120
    },
    {
        id: '4723',
        status: 'past due',
        avatar: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-10.png',
        fallback: 'LM',
        client: 'Lisa Miller',
        field: 'Data Analyst',
        total: 2200,
        issuedDate: new Date('2025-04-18'),
        balance: 250
    },
    {
        id: '5445',
        status: 'paid',
        avatar: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-11.png',
        fallback: 'TD',
        client: 'Thomas Davis',
        field: 'Mobile Developer',
        total: 4200,
        issuedDate: new Date('2025-05-22'),
        balance: 0
    },
    {
        id: '4892',
        status: 'draft',
        avatar: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-12.png',
        fallback: 'JW',
        client: 'Jennifer Wilson',
        field: 'UX Researcher',
        total: 1950,
        issuedDate: new Date('2025-06-14'),
        balance: 0
    },
    {
        id: '5667',
        status: 'downloaded',
        avatar: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-13.png',
        fallback: 'CM',
        client: 'Christopher Moore',
        field: 'System Administrator',
        total: 2750,
        issuedDate: new Date('2025-07-08'),
        balance: -95
    },
    {
        id: '4534',
        status: 'past due',
        avatar: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-14.png',
        fallback: 'ST',
        client: 'Sarah Taylor',
        field: 'Content Writer',
        total: 1380,
        issuedDate: new Date('2025-01-28'),
        balance: 180
    },
    {
        id: '5789',
        status: 'paid',
        avatar: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-15.png',
        fallback: 'MA',
        client: 'Matthew Anderson',
        field: 'Cloud Architect',
        total: 5600,
        issuedDate: new Date('2025-02-12'),
        balance: 0
    },
    {
        id: '4398',
        status: 'draft',
        avatar: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-16.png',
        fallback: 'KT',
        client: 'Karen Thompson',
        field: 'Business Analyst',
        total: 2100,
        issuedDate: new Date('2025-03-25'),
        balance: 0
    },
    {
        id: '5923',
        status: 'downloaded',
        avatar: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-17.png',
        fallback: 'JG',
        client: 'James Garcia',
        field: 'Security Engineer',
        total: 3800,
        issuedDate: new Date('2025-04-30'),
        balance: -200
    },
    {
        id: '4672',
        status: 'past due',
        avatar: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-18.png',
        fallback: 'NH',
        client: 'Nancy Harris',
        field: 'QA Engineer',
        total: 1850,
        issuedDate: new Date('2025-05-16'),
        balance: 320
    },
    {
        id: '5234',
        status: 'paid',
        avatar: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-19.png',
        fallback: 'DM',
        client: 'Daniel Martinez',
        field: 'Software Architect',
        total: 4800,
        issuedDate: new Date('2025-06-09'),
        balance: 0
    },
    {
        id: '4756',
        status: 'draft',
        avatar: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-20.png',
        fallback: 'ER',
        client: 'Elizabeth Rodriguez',
        field: 'Product Designer',
        total: 2650,
        issuedDate: new Date('2025-07-21'),
        balance: 0
    },
    {
        id: '5456',
        status: 'downloaded',
        avatar: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-1.png',
        fallback: 'AL',
        client: 'Andrew Lopez',
        field: 'Technical Lead',
        total: 5200,
        issuedDate: new Date('2025-08-03'),
        balance: -150
    },
    {
        id: '4823',
        status: 'past due',
        avatar: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-2.png',
        fallback: 'MH',
        client: 'Michelle Hill',
        field: 'Scrum Master',
        total: 2400,
        issuedDate: new Date('2025-01-11'),
        balance: 400
    },
    {
        id: '5678',
        status: 'paid',
        avatar: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-3.png',
        fallback: 'KS',
        client: 'Kevin Scott',
        field: 'Database Administrator',
        total: 3200,
        issuedDate: new Date('2025-02-07'),
        balance: 0
    },
    {
        id: '4945',
        status: 'draft',
        avatar: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-4.png',
        fallback: 'RG',
        client: 'Rachel Green',
        field: 'Digital Marketing Manager',
        total: 1820,
        issuedDate: new Date('2025-03-19'),
        balance: 0
    },
    {
        id: '5812',
        status: 'downloaded',
        avatar: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-5.png',
        fallback: 'BW',
        client: 'Brian White',
        field: 'AI/ML Engineer',
        total: 6200,
        issuedDate: new Date('2025-04-26'),
        balance: -300
    }
]

const DashboardShell = () => {
    return (
        <div className='bg-muted before:bg-primary relative flex min-h-dvh w-full before:fixed before:inset-x-0 before:top-0 before:h-105'>
            <SidebarProvider
                style={
                    {
                        '--sidebar': 'var(--card)',
                        '--sidebar-width': '17.5rem',
                        '--sidebar-width-icon': '3.5rem'
                    } as CSSProperties
                }
            >
                <Sidebar
                    variant='floating'
                    collapsible='icon'
                    className='p-6 pr-0 [&>[data-slot=sidebar-inner]]:group-data-[variant=floating]:rounded-xl'
                >
                    <SidebarHeader>
                        <SidebarMenu>
                            <SidebarMenuItem>
                                <SidebarMenuButton size='lg' className='gap-2.5 !bg-transparent [&>svg]:size-8' asChild>
                                    <a href='#'>
                                        <LogoSvg className='[&_rect]:fill-sidebar [&_rect:first-child]:fill-primary' />
                                        <span className='text-xl font-semibold'>Payment</span>
                                    </a>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarHeader>
                    <SidebarContent>
                        <SidebarGroup>
                            <SidebarGroupLabel>Pages</SidebarGroupLabel>
                            <SidebarGroupContent>
                                <SidebarMenu>
                                    {pagesItems.map(item =>
                                        item.items ? (
                                            <Collapsible className='group/collapsible' key={item.label}>
                                                <SidebarMenuItem>
                                                    <CollapsibleTrigger asChild>
                                                        <SidebarMenuButton>
                                                            <item.icon />
                                                            <span>{item.label}</span>
                                                            <ChevronRightIcon className='ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90' />
                                                        </SidebarMenuButton>
                                                    </CollapsibleTrigger>
                                                    <CollapsibleContent>
                                                        <SidebarMenuSub>
                                                            {item.items.map(subItem => (
                                                                <SidebarMenuSubItem key={subItem.label}>
                                                                    <SidebarMenuSubButton className='justify-between' asChild>
                                                                        <a href={subItem.href}>
                                                                            {subItem.label}
                                                                            {subItem.badge && (
                                                                                <span className='bg-primary/10 flex h-5 min-w-5 items-center justify-center rounded-full text-xs'>
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
                                        ) : (
                                            <SidebarMenuItem key={item.label}>
                                                <SidebarMenuButton asChild>
                                                    <a href={item.href}>
                                                        <item.icon />
                                                        <span>{item.label}</span>
                                                    </a>
                                                </SidebarMenuButton>
                                                {item.badge && (
                                                    <SidebarMenuBadge className='bg-primary/10 rounded-full'>{item.badge}</SidebarMenuBadge>
                                                )}
                                            </SidebarMenuItem>
                                        )
                                    )}
                                </SidebarMenu>
                            </SidebarGroupContent>
                        </SidebarGroup>
                        <SidebarGroup>
                            <SidebarGroupLabel>Recipients</SidebarGroupLabel>
                            <SidebarGroupContent>
                                <SidebarMenu>
                                    {recipientsItems.map(recipient => (
                                        <SidebarMenuItem key={recipient.name}>
                                            <SidebarMenuButton asChild>
                                                <a href={recipient.href}>
                                                    <Avatar className='size-6 transition-[width,height] duration-200 [[data-state=collapsed]_&]:size-4'>
                                                        <AvatarImage src={recipient.avatarSrc} alt={recipient.name} />
                                                        <AvatarFallback>
                                                            {recipient.name
                                                                .split(' ')
                                                                .map(n => n[0])
                                                                .join('')}
                                                        </AvatarFallback>
                                                    </Avatar>
                                                    <span>{recipient.name}</span>
                                                </a>
                                            </SidebarMenuButton>
                                        </SidebarMenuItem>
                                    ))}
                                </SidebarMenu>
                            </SidebarGroupContent>
                        </SidebarGroup>
                    </SidebarContent>
                    <SidebarFooter>
                        <SidebarUserDropdown />
                    </SidebarFooter>
                </Sidebar>
                <div className='z-1 flex flex-1 flex-col py-6'>
                    <header className='text-primary-foreground'>
                        <div className='mx-auto flex max-w-7xl items-center justify-between gap-6 px-4 sm:px-6'>
                            <div className='flex items-center gap-4'>
                                <MenuTrigger
                                    variant='outline'
                                    className='!bg-primary-foreground !border-primary-foreground !text-primary shadow-none'
                                />
                                <div className='hidden sm:flex sm:flex-col sm:items-start'>
                                    <p className='text-lg font-semibold'>Hey, John</p>
                                    <p className='text-primary-foreground/50 md:max-lg:hidden'>Welcome back to dashboard</p>
                                </div>
                            </div>
                            <SearchDialog
                                className='hidden xl:block'
                                trigger={
                                    <Button variant='ghost' className='!bg-transparent p-0 font-normal'>
                                        <div className='!bg-primary-foreground/20 text-primary-foreground hover:!bg-primary-foreground/25 flex min-w-55 items-center gap-1.5 rounded-md px-3 py-2 text-sm'>
                                            <SearchIcon />
                                            <span>Type to search...</span>
                                        </div>
                                    </Button>
                                }
                            />
                            <div className='flex items-center gap-1.5'>
                                <SearchDialog
                                    className='block xl:hidden'
                                    trigger={
                                        <Button variant='ghost' size='icon'>
                                            <SearchIcon />
                                            <span className='sr-only'>Search</span>
                                        </Button>
                                    }
                                />
                                <LanguageDropdown
                                    trigger={
                                        <Button variant='ghost' size='icon'>
                                            <LanguagesIcon />
                                        </Button>
                                    }
                                />
                                <ActivityDialog
                                    trigger={
                                        <Button variant='ghost' size='icon'>
                                            <ActivityIcon />
                                        </Button>
                                    }
                                />
                                <NotificationDropdown
                                    trigger={
                                        <Button variant='ghost' size='icon' className='relative'>
                                            <BellIcon />
                                            <span className='bg-destructive absolute top-2 right-2.5 size-2 rounded-full' />
                                        </Button>
                                    }
                                />
                                <ProfileDropdown
                                    trigger={
                                        <Button variant='ghost' size='icon' className='size-9.5'>
                                            <Avatar className='size-9.5 rounded-md'>
                                                <AvatarImage src='https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-1.png' />
                                                <AvatarFallback>JD</AvatarFallback>
                                            </Avatar>
                                        </Button>
                                    }
                                />
                            </div>
                        </div>
                    </header>
                    <main className='mx-auto size-full max-w-7xl flex-1 px-4 py-6 sm:px-6'>
                        <div className='grid grid-cols-6 gap-6'>
                            {/* Income Statistics */}
                            <StatisticsIncomeCard className='col-span-2 max-lg:col-span-full [&>[data-slot=card-content]]:lg:max-xl:flex-col [&>[data-slot=card-content]]:lg:max-xl:pr-6' />

                            {/* Expense Statistics */}
                            <StatisticsExpenseCard className='col-span-2 max-lg:col-span-full [&>[data-slot=card-content]]:lg:max-xl:flex-col [&>[data-slot=card-content]]:lg:max-xl:pr-6' />

                            {/* Total Orders */}
                            <StatisticsCardWithSvg
                                title='Total orders'
                                badgeContent='Last Week'
                                value='42.4k'
                                changePercentage={10.8}
                                svg={<TotalOrdersCardSvg />}
                                className='col-span-2 max-lg:col-span-full'
                            />

                            {/* Payment History */}
                            <PaymentHistoryCard
                                title='Payment History'
                                paymentData={paymentData}
                                className='col-span-full lg:col-span-3 lg:max-2xl:order-1 2xl:col-span-2'
                            />

                            {/* Total Revenue */}
                            <TotalRevenueCard className='col-span-full 2xl:col-span-4' />

                            {/* Sales by Country */}
                            <SalesByCountryCard
                                title='Sales by countries'
                                subTitle='Monthly sales overview'
                                salesData={Sales}
                                className='col-span-full lg:col-span-3 lg:max-2xl:order-1 2xl:col-span-2'
                            />

                            {/* Transactions */}
                            <TransactionsCard
                                title='Transactions'
                                transactions={transactions}
                                className='col-span-full lg:col-span-3 lg:max-2xl:order-1 2xl:col-span-2'
                            />

                            {/* Total Earning */}
                            <TotalEarningCard
                                title='Total Earning'
                                earning={24650}
                                trend='up'
                                percentage={10}
                                comparisonText='Compare to last year ($84,325)'
                                earningData={earningData}
                                className='col-span-full lg:col-span-3 lg:max-2xl:order-1 2xl:col-span-2'
                            />

                            {/* Invoice Table */}
                            <Card className='col-span-full py-0 lg:max-2xl:order-2'>
                                <InvoiceDatatable data={invoiceData} />
                            </Card>
                        </div>
                    </main>
                    <footer>
                        <div className='text-muted-foreground mx-auto flex size-full max-w-7xl items-center justify-between gap-3 px-4 max-sm:flex-col sm:gap-6 sm:px-6'>
                            <p className='text-sm text-balance max-sm:text-center'>
                                {`©${new Date().getFullYear()}`}{' '}
                                <a href='#' className='text-primary'>
                                    shadcn/studio
                                </a>
                                , Made for better web design
                            </p>
                            <div className='flex items-center gap-5'>
                                <a href='#'>
                                    <FacebookIcon className='size-4' />
                                </a>
                                <a href='#'>
                                    <InstagramIcon className='size-4' />
                                </a>
                                <a href='#'>
                                    <LinkedinIcon className='size-4' />
                                </a>
                                <a href='#'>
                                    <TwitterIcon className='size-4' />
                                </a>
                            </div>
                        </div>
                    </footer>
                </div>
            </SidebarProvider>
        </div>
    )
}

export default DashboardShell

