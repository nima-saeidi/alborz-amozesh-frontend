"use client"

import {Button} from "@/components/ui/button";
import { ChevronDown } from 'lucide-react';

export default function TopNavbar() {
    return (
        <div className="flex justify-between items-center h-[100px] w-full">
            <div className="w-[265px] h-fit">
                <Button className="m-5 h-[60px] w-[225px]">ورود / عضویت</Button>
            </div>
            <div className="w-[265px] h-fit  flex justify-center items-center">
                <div className="flex flex-col w-full justify-center items-center">
                    <h1>دوره های آموزشی</h1>
                    <ChevronDown />
                </div>
            </div>
            <div className="w-[265px] h-fit ">
                <Button className="m-5 h-[60px] w-[225px]">LOGO</Button>
            </div>
        </div>
    );
}