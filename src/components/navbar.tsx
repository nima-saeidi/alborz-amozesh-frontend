"use client"

import {usePathname} from "next/navigation";
import AuthNavbar from "@/components/auth-navbar";
import TopNavbar from "@/components/top-navbar";

export default function Navbar() {
    const pathname = usePathname();
    return (
        pathname === "/auth" ? <AuthNavbar/> : <TopNavbar/>
    )
}