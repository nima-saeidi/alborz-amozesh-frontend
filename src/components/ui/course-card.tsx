import Image from "next/image";
import imagesrc from "../../../assets/Engineering Image from Unsplash.jpg"
import {Separator} from "@/components/ui/separator";

export default function CourseCard() {
    return (
        <article
            className="group w-[362px]  rounded-[10px] overflow-hidden flex flex-col border  cursor-pointer hover:border-[#FF8E50] hover:shadow-xl duration-700">
            <div className="h-[180px] rounded-[10px] overflow-hidden m-1.5 border">
                <Image src={imagesrc} alt="photo"/>
            </div>
            <div className="h-[8px] w-full  flex justify-center items-center relative bottom-3">
                <div
                    className="size-[48px] rounded-full overflow-hidden flex justify-center items-center box-content border-[6px] border-white">
                    <div className="bg-red-500 size-[48px] "/>
                </div>
            </div>
            <div className="h-[30px] self-center p-1 mt-1 text-sm text-gray-600">شهرام پورحسین</div>
            <header className="h-[110px] w-full mb-3 flex flex-col gap-3 justify-center items-center">
                <h2 className="text-xl pb-2">Network Security</h2>
                <ul className="flex flex-row-reverse gap-3 text-xs">
                    <li>مقدماتی</li>
                    <Separator orientation="vertical"/>
                    <li>تیم قرمز</li>
                    <Separator orientation="vertical"/>
                    <li>فرصت محدود</li>
                </ul>
                <div className="flex gap-3 justify-center items-center">
                    <span className="text-sm">تومان</span>
                    <span className="text-xl font-bold">۱۵،۵۰۰،۰۰۰</span>
                </div>
            </header>
            <footer
                className="relative h-[56px] w-full border-t flex justify-center items-center duration-300">
                <div
                    className="absolute inset-0 h-full w-full bg-[linear-gradient(135deg,#FF8E5020_25%,transparent_25%,transparent_50%,#FF8E5020_50%,#FF8E5020_75%,transparent_75%,transparent)]
               bg-[length:40px_40px]
               opacity-0 group-hover:opacity-100 animate-stripes transition-opacity duration-300">
                </div>
                <span className="relative z-10 text-lg text-black group-hover:text-[#FF8E50] select-none">
                    ثبت نام
                </span>
            </footer>
        </article>
    )
}