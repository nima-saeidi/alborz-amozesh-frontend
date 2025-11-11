"use client"

import {usePathname} from "next/navigation";
import {useEffect, useState} from "react";

export default function HeaderTitle() {
    // const { title, setTitle } = useTitle();
    const pathname = usePathname();
    const [displayTitle, setDisplayTitle] = useState<string>("");
    const [fadeState, setFadeState] = useState<"fade-in" | "fade-out">("fade-in");

    useEffect(() => {
        const pathTitleMap: Record<string, string> = {
            "/dashboard": "داشبورد",
            "/dashboard/profile": "پروفایل",
            "/dashboard/my-courses": "دوره های من",
            "/dashboard/financial-statements": "صورت های مالی",
        };

        const newTitle = pathTitleMap[pathname] || "Untitled Page";

        if (newTitle === displayTitle) return;

        // trigger fade-out → change title → fade-in
        setFadeState("fade-out");
        const timeout = setTimeout(() => {
            setDisplayTitle(newTitle);
            setFadeState("fade-in");
        }, 300); // delay matches the fade-out duration

        return () => clearTimeout(timeout);
    }, [pathname]);

    return (
        <h1
            className={`mr-8 text-xl transition-all duration-500 ${
                fadeState === "fade-in"
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 -translate-y-1"
            }`}
        >
            {displayTitle}
        </h1>
    );
}