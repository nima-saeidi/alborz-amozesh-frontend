import * as React from "react"

import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarFooter,
    SidebarRail,
} from "@/components/ui/sidebar"
import {NavUser} from "@/components/ui/nav-user";

// This is sample data.
const data = {
    navMain: [
        {
            title: "دوره های من",
            url: "#",
        },
        {
            title: "صورت های مالی",
            url: "#",
        },
    ]
}
const tempuser = {
    name: "شهرام",
    email: "shahram@mail.com",
    avatar: "avatar.png"
}

export function AppSidebar({...props}: React.ComponentProps<typeof Sidebar>) {
    return (
        <Sidebar {...props}>
            <SidebarContent>
                <SidebarGroup className="select-none">
                    <SidebarGroupLabel className="justify-center text-lg my-8 select-none">آکادمی البرز</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {data.navMain.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild>
                                        <a href={item.url} className="font-medium flex flex-row-reverse">
                                            {item.title}
                                        </a>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter className="mb-3">
                <NavUser user={tempuser} />
            </SidebarFooter>
            <SidebarRail/>
        </Sidebar>
    )
}
