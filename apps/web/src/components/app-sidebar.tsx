"use client"

import * as React from "react"
import {
    Car,
    ListOrdered,
    Trophy,
    UserRound,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavUser } from "@/components/nav-user"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarRail,
} from "@/components/ui/sidebar"

// This is sample data.
const data = {
    user: {
        name: "shadcn",
        email: "m@example.com",
        avatar: "/avatars/shadcn.jpg",
    },
    navMain: [
        {
            title: "Drivers",
            url: "#",
            icon: UserRound,
            isActive: true,
        },
        {
            title: "Constructors",
            url: "#",
            icon: Car,
        },
        {
            title: "Seasons",
            url: "/seasons",
            icon: ListOrdered,
        },
        {
            title: "Records",
            url: "#",
            icon: Trophy,
        },
    ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    return (
        <Sidebar collapsible="icon" {...props}>
            <SidebarContent>
                <NavMain items={data.navMain} />
            </SidebarContent>
            <SidebarFooter>
                <NavUser user={data.user} />
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    )
}
