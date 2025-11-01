"use client";

import { Bell } from "lucide-react";
import { useState } from "react";

export default function NotificationBell() {
    const [hasNotification, setHasNotification] = useState(true);

    return (
        <div className="relative flex items-center justify-center size-8 rounded-[10px] hover:bg-gray-100 duration-200">
            {/* Notification icon */}
            <Bell
                className={`h-6 w-6 text-gray-700 transition-transform ${
                    hasNotification ? "animate-wiggle " : ""
                }`}
            />

        </div>
    );
}