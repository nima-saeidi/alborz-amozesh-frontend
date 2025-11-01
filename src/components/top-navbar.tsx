"use client"

import {ChevronDown, ChevronUp} from 'lucide-react';
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {HugeiconsIcon} from '@hugeicons/react';
import {ArrowLeft01Icon, AiProgrammingIcon, CheckmarkSquare02Icon, UserSquareIcon, } from '@hugeicons/core-free-icons';
import {AnimatePresence, motion} from "motion/react";
import {cn} from "@/lib/utils"
import {ReactNode, useState} from "react";
import Link from "next/link";

interface CardForCoursesProps {
    onMouseEnter?: () => void,
    active?: boolean
}

function CardForCourses({onMouseEnter, active}: CardForCoursesProps) {
    return (
        <div onMouseEnter={onMouseEnter}
             className={cn("w-full h-[120px] hover:bg-black/80 hover:text-white hover:border-gray-800 duration-150 border-gray-500 border rounded-[10px] flex justify-center items-center cursor-pointer", active && "bg-black/80 text-white")}>
            <div className="w-full mx-5 h-[90px] flex flex-col gap-[10px]">
                <div className="w-full h-[52px] flex justify-between">
                    <div className="w-[52px] h-[52px] flex justify-center items-center">
                        <HugeiconsIcon
                            icon={ArrowLeft01Icon}
                            size={42}
                            color="currentColor"
                            strokeWidth={1.5}
                        />
                    </div>
                    <div className="h-full  flex gap-[20px] justify-end">
                        <div className="h-full flex items-center font-semibold text-[18px] lg:text-[20px] select-none">
                            دوره های آموزشی
                        </div>
                        <div className="w-[52px] h-full flex justify-center items-center ">
                            <HugeiconsIcon
                                icon={AiProgrammingIcon}
                                size={42}
                                color="currentColor"
                                strokeWidth={1.5}
                            />
                        </div>
                    </div>
                </div>
                <div className="w-full text-[14px] lg:text-[16px] h-[28px] flex justify-end select-none">
                    ورود به دنیای حرفه ای تکنولوژی
                </div>
            </div>
        </div>
    )
}


interface CourseInfoBannerProps {
    children: ReactNode;
}

const modalVariants = {
    visible: {opacity: 1, transition: {when: "beforeChildren"}, duration: 1},
    hidden: {opacity: 0, transition: {when: "afterChildren"}, duration: 1},
}


function CourseInfoBanner({children}: CourseInfoBannerProps) {
    return (
        <motion.div
            className="w-[548px] h-[570px] rounded-[10px]"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
        >
            <div className="h-[570px] flex flex-col box-content justify-between items-end">
                <div className="flex flex-col gap-[30px] items-end mt-[30px]">
                    <span className="text-4xl font-extrabold">دوره های تخصصی</span>
                    <span className="text-xl text text-black">ورود به دنیای حرفه ای تکنولوژی</span>
                </div>
                <div className="flex flex-col">
                    <div className="flex flex-row-reverse items-center gap-2.5 h-[40px]">
                        <HugeiconsIcon icon={CheckmarkSquare02Icon}
                                       color={"#196B00"}
                                       fill={"#BFFFA3"}
                                       strokeWidth={1.5}/>
                        <div>آموزش همه تخصصی</div>
                    </div>
                    <div className="flex flex-row-reverse  items-center gap-2.5 h-[40px]">
                        <HugeiconsIcon icon={CheckmarkSquare02Icon}
                                       color={"#196B00"}
                                       fill={"#BFFFA3"}
                                       strokeWidth={1.5}/>
                        <div>یادگیری جمعی</div>
                    </div>
                    <div className="flex flex-row-reverse items-center gap-2.5 h-[40px]">
                        <HugeiconsIcon icon={CheckmarkSquare02Icon}
                                       color={"#196B00"}
                                       fill={"#BFFFA3"}
                                       strokeWidth={1.5}/>
                        <div>منتورشیپ</div>
                    </div>
                </div>
                <div className="flex ml-[30px] mb-[30px] self-start">
                    <Link
                        className="w-[220px] h-[70px] flex justify-center items-center  text-xl bg-black text-white font-bold hover:bg-white hover:text-[#FF8E50] hover:border-[#FF8E50] hover:border-4 duration-200  rounded-[10px]"
                        href="#">شروع یادگیری</Link>
                </div>
            </div>
        </motion.div>
    );
}

function PopoverInnerContent() {
    const [show, setShow] = useState(1);

    return (
        <div className="w-full h-full flex justify-center lg:justify-between items-center">
            <div className="hidden lg:block">
                <AnimatePresence mode="wait">
                    {show === 1 && <CourseInfoBanner key="1">Content 1</CourseInfoBanner>}
                    {show === 2 && <CourseInfoBanner key="2">Content 2</CourseInfoBanner>}
                    {show === 3 && <CourseInfoBanner key="3">Content 3</CourseInfoBanner>}
                    {show === 4 && <CourseInfoBanner key="4">Content 4</CourseInfoBanner>}
                </AnimatePresence>
            </div>
            <span className="hidden lg:block w-[1px] h-[340px] bg-black/20"></span>
            <div className="w-[300px] lg:w-[380px] h-[570px] rounded-[10px] flex flex-col gap-[30px]">
                {/*Card component for course type*/}
                <CardForCourses onMouseEnter={() => setShow(1)} active={show === 1}/>
                <CardForCourses onMouseEnter={() => setShow(2)} active={show === 2}/>
                <CardForCourses onMouseEnter={() => setShow(3)} active={show === 3}/>
                <CardForCourses onMouseEnter={() => setShow(4)} active={show === 4}/>
            </div>
        </div>
    );
};

export default function TopNavbar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="flex justify-between items-center h-[100px] w-full">
            <div className="hidden md:w-[200px] h-full md:flex justify-center items-center">
                <Link
                    className="m-5 h-[60px] w-full flex justify-center items-center bg-[#FF8E50] text-black font-bold hover:bg-black hover:text-[#FF8E50] hover:border-[#FF8E50] hover:border-4 duration-200  rounded-[10px]"
                    href="/auth"
                >
                    ورود / عضویت
                </Link>
            </div>
            <div className="md:hidden h-full flex justify-center items-center m-5 ">
                <HugeiconsIcon icon={UserSquareIcon} size={42}/>
            </div>

            <div className="w-[150px] h-fit flex justify-center items-center">
                <Popover open={isOpen} onOpenChange={setIsOpen}>
                    <PopoverTrigger asChild>
                        <div
                            className="flex flex-col w-full justify-center items-center cursor-pointer"
                            onClick={() => setIsOpen(!isOpen)}
                        >
                            <h1 className="select-none">دوره های آموزشی</h1>
                            {isOpen ? <ChevronUp /> : <ChevronDown />}
                        </div>
                    </PopoverTrigger>
                    <PopoverContent className="w-[330px] lg:w-[1024px] h-[600px] bg-white/50 backdrop-blur-2xl">
                        <PopoverInnerContent />
                    </PopoverContent>
                </Popover>
            </div>

            <div className="w-[200px] h-full flex justify-center items-center">
                <Link
                    className="m-5 h-[60px] w-[225px] flex justify-center items-center bg-[#FF8E50] text-black font-bold hover:bg-black hover:text-[#FF8E50] hover:border-[#FF8E50] hover:border-4 duration-200  rounded-[10px]"
                    href="#"
                >
                    LOGO
                </Link>
            </div>
        </div>
    );
}