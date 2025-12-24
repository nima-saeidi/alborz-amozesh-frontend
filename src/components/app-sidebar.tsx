import * as React from "react";

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
} from "@/components/ui/sidebar";
import { NavUser } from "@/components/ui/nav-user";
import Image from "next/image";
import logoImage from "../../assets/logo.png";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";

// This is sample data.
const data = {
  navMain: [
    {
      title: "دوره های من",
      url: "/dashboard/my-courses",
    },
  ],
};
const tempuser = {
  name: "شهرام",
  email: "shahram@mail.com",
  avatar: "avatar.png",
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props}>
      <SidebarContent>
        <SidebarGroup className="select-none">
          <SidebarGroupLabel className="justify-center text-lg my-8 select-none">
            <div className="h-12 w-1/2 flex items-center justify-center">
              <Link href={"/"}>
                <Image
                  src={logoImage}
                  alt="logo"
                  className="h-full w-auto max-w-full object-contain"
                />
              </Link>
            </div>
          </SidebarGroupLabel>
          <Separator orientation={"horizontal"} />
          <SidebarGroupContent className="mt-3">
            <SidebarMenu>
              {data.navMain.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a
                      href={item.url}
                      className="font-yekan-regular flex flex-row-reverse"
                    >
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
      <SidebarRail />
    </Sidebar>
  );
}
