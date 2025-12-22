"use client"

import {usePathname} from "next/navigation";
import {useEffect, useState} from "react";
import {CourseService} from "@/lib/api/courses";

export default function HeaderTitle() {
    const pathname = usePathname();
    const [displayTitle, setDisplayTitle] = useState<string>("");
    const [fadeState, setFadeState] = useState<"fade-in" | "fade-out">("fade-in");

    const getCourseTitle = async (pathname: string) => {
        const id = pathname.split("/").pop();
        if (!id || isNaN(Number(id))) return "Untitled Course";

        const course = await CourseService.getCourse({id: Number(id)});
        return course.title;
    }

    useEffect(() => {
        const pathTitleMap: Record<string, string> = {
            "/dashboard": "داشبورد",
            "/dashboard/profile": "پروفایل",
            "/dashboard/my-courses": "دوره های من",
        };

        const updateTitle = async () => {
            let newTitle: string;

            if (pathTitleMap[pathname]) {
                newTitle = pathTitleMap[pathname];
            } else if (pathname.includes("/my-courses/")) {
                newTitle = "نام دوره"//await getCourseTitle(pathname); TODO remember to un-comment this
            } else {
                newTitle = "Untitled Course";
            }

            if (newTitle === displayTitle) return;

            // trigger fade-out → change title → fade-in
            setFadeState("fade-out");
            setTimeout(() => {
                setDisplayTitle(newTitle);
                setFadeState("fade-in");
            }, 300);
        };

        updateTitle();
    }, [pathname, displayTitle]);

    return (
        <h1
            className={`mr-8 text-xl font-yekan-regular transition-all duration-500 ${
                fadeState === "fade-in"
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 -translate-y-1"
            }`}
        >
            {displayTitle}
        </h1>
    );
}
