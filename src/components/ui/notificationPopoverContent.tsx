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
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";

function NotificationCard(){
    const [open, setOpen] = useState(false);
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger>
                <div className="flex items-center justify-between h-[42px] w-full border px-[9px] py-1 rounded-[5px] hover:bg-gray-200 duration-300 cursor-pointer">
                    <div className="size-[24px]  bg-gray-600 rounded-[5px] flex items-center justify-center">
                        <Bell className="flex justify-center items-center" color="white" size={18}/>
                    </div>
                    <div className="w-[219px] h-[42px] text-xs text-right flex justify-end items-center whitespace-nowrap overflow-hidden overflow-ellipsis">نسبت به تکمیل کردن پروفایل اقدام کنید</div>
                </div>
            </DialogTrigger>
            <DialogContent className="py-12 gap-8">
                <DialogHeader>
                    <DialogTitle className="text-right">نسبت به تکمیل کردن پروفایل اقدام کنید</DialogTitle>
                    <DialogDescription>
                        لطفا با مراجه به بخش تنظیمات کاربری نسبت به تکمیل حساب کاربری اتان اقدام کنید
                    </DialogDescription>
                </DialogHeader>
                <Button size={"lg"} onClick={() => setOpen(false)}>تایید</Button>
            </DialogContent>
        </Dialog>
    )
}

function NotificationPopoverContent(){
    const [hasNotification, setHasNotification] = useState(true);

    return (
        hasNotification ?
            <div className="flex flex-col gap-[15px] ">
                <span className="text-[10px] w-full text-right hover:underline cursor-pointer">حذف اعلان ها</span>
                <ScrollArea className="h-[300px] w-full">
                    <div className="flex flex-col gap-[15px]">
                        <NotificationCard/>
                        <NotificationCard/>
                        <NotificationCard/>
                        <NotificationCard/>
                        <NotificationCard/>
                        <NotificationCard/>
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
};

export default function Notification() {
    const [hasNotification, setHasNotification] = useState(true);
    return (
        <Popover>
            <PopoverTrigger>
                <div className="relative flex items-center justify-center size-8 rounded-[10px] hover:bg-gray-100 duration-200">
                    {/* Notification icon */}
                    <Bell
                        className={`h-6 w-6 text-gray-700 transition-transform ${
                            hasNotification ? "animate-wiggle " : ""
                        }`}
                    />

                </div>
            </PopoverTrigger>
            <PopoverContent className="w-[300px] h-[350px] ml-[16px]">
                <NotificationPopoverContent/>
            </PopoverContent>
        </Popover>
    )
}