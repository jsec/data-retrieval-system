import { ChevronRight, type LucideIcon } from "lucide-react"

import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
} from "@/components/ui/sidebar"
import { Link } from "@tanstack/react-router";

type NavItem = {
    title: string;
    url: string;
    icon?: LucideIcon;
    isActive?: boolean;
    items?: NavItem[]
}

type MainNavProps = {
    items: NavItem[];
}

export const NavMain = ({ items }: MainNavProps) => {
    return (
        <SidebarGroup>
            <SidebarGroupLabel>Data Retrieval System</SidebarGroupLabel>
            <SidebarMenu>
                {items.map((item) => (
                    <Link to={item.url} key={item.title}>
                        <SidebarMenuItem>
                            <SidebarMenuButton tooltip={item.title}>
                                {item.icon && <item.icon />}
                                <span>{item.title}</span>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    </Link>
                ))}
            </SidebarMenu>
        </SidebarGroup>
    )
}
