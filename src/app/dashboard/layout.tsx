import {SidebarInset, SidebarProvider, SidebarTrigger} from "@/components/ui/sidebar";
import {AppSidebar} from "@/components/app-sidebar";
import {ReactNode} from "react";
import Notification from "@/components/ui/notificationPopoverContent";


export default function dashboardLayout({children}: {children: ReactNode}) {
    return (
        <SidebarProvider>
            <SidebarInset>
                <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
                    <Notification/>
                    <SidebarTrigger className="-mr-1 ml-auto rotate-180"/>
                </header>
                {children}
            </SidebarInset>
            <AppSidebar side="right"/>
        </SidebarProvider>
    )
}