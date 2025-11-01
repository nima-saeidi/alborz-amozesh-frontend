"use client"
import {Bell} from "lucide-react";
import {useState} from "react";
import {
    Empty,
    EmptyHeader,
    EmptyMedia,
    EmptyTitle,
} from "@/components/ui/empty";
import { IconFolderCode } from "@tabler/icons-react";
import { ScrollArea } from "@/components/ui/scroll-area";

function Notif(){
    return (
        <div className="flex items-center justify-between h-[42px] w-full border px-[9px] py-1 rounded-[5px] hover:bg-gray-200 duration-300 cursor-pointer">
            <div className="size-[24px]  bg-gray-600 rounded-[5px] flex items-center justify-center">
                <Bell className="flex justify-center items-center" color="white" size={18}/>
            </div>
            <div className="w-[219px] h-[42px] text-xs text-right flex justify-end items-center whitespace-nowrap overflow-hidden overflow-ellipsis">نسبت به تکمیل کردن پروفایل اقدام کنید</div>
        </div>
    )
}

export default function Notification(){
    const [hasNotification, setHasNotification] = useState(true);
    return (
        hasNotification ?
            <div className="flex flex-col gap-[15px] ">
                <span className="text-[10px] w-full text-right hover:underline cursor-pointer">حذف اعلان ها</span>
                <ScrollArea className="h-[300px] w-full">
                    <div className="flex flex-col gap-[15px]">
                        <Notif/>
                        <Notif/>
                        <Notif/>
                        <Notif/>
                        <Notif/>
                        <Notif/>
                    </div>
                </ScrollArea>
            </div> :
            <Empty>
                <EmptyHeader >
                    <EmptyMedia>
                        <IconFolderCode />
                    </EmptyMedia>
                    <EmptyTitle>اعلانی وجود ندارد</EmptyTitle>
                </EmptyHeader>
            </Empty>
    )
}