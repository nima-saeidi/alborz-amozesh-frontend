import {SidebarInset, SidebarProvider, SidebarTrigger} from "@/components/ui/sidebar";
import NotificationBell from "@/components/ui/notification-bell";
import {AppSidebar} from "@/components/app-sidebar";
import {ReactNode} from "react";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import Notification from "@/components/ui/notification";


export default function dashboardLayout({children}: {children: ReactNode}) {
    return (
        <SidebarProvider>
            <SidebarInset>
                <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
                    <Popover>
                        <PopoverTrigger>
                            <NotificationBell/>
                        </PopoverTrigger>
                        <PopoverContent className="w-[300px] h-[350px] ml-[16px]">
                            <Notification/>
                        </PopoverContent>
                    </Popover>
                    <SidebarTrigger className="-mr-1 ml-auto rotate-180"/>
                </header>
                {children}
            </SidebarInset>
            <AppSidebar side="right"/>
        </SidebarProvider>
    )
}