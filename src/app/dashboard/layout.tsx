import {SidebarInset, SidebarProvider, SidebarTrigger} from "@/components/ui/sidebar";
import {AppSidebar} from "@/components/app-sidebar";
import {ReactNode} from "react";
import Notification from "@/components/ui/notificationPopoverContent";
import HeaderTitle from "@/components/header-title";


export default function DashboardLayout({children}: { children: ReactNode }) {
    return (
        <SidebarProvider>
            <SidebarInset>
                <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
                    <Notification/>
                    <SidebarTrigger className="-mr-1 ml-auto rotate-180"/>
                </header>
                <div className="h-20 mt-2.5 flex justify-end items-center">
                    <HeaderTitle/>
                </div>
                <div className="m-6 flex justify-center items-center">
                    {children}
                </div>
            </SidebarInset>
            <AppSidebar side="right"/>
        </SidebarProvider>
    );
}