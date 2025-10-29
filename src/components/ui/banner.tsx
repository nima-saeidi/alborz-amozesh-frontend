import Link from "next/link";

interface BannerProps {
    title: string;
    description: string;
    linkAvailable: boolean;
    linkTitle?: string;
    link?: string;
}
export default function Banner({ title, description, linkAvailable, linkTitle, link }: BannerProps) {

    return (
        <div className="h-[350px] relative mx-5 mt-[30px] rounded-[10px] bg-[#FF8E50] overflow-hidden select-none">
            <div className=" h-full w-full flex justify-between items-center">
                <div className="size-[260px] ml-[100px] my-[45px]"></div>
                <div className="h-[250px] mr-[50px] w-1/2 flex flex-col items-end justify-between ">
                    <div className="flex flex-col w-full items-end gap-[40px]">
                        <div className="text-5xl font-semibold text-white">{title}</div>
                        <div className="text-2xl font-semibold text-white/80">{description}</div>
                    </div>
                    {linkAvailable && (<Link className="w-[220px] h-[70px] flex justify-center items-center text-xl bg-black text-white font-bold hover:bg-white hover:text-[#FF8E50] hover:border-[#FF8E50] hover:border-4 duration-200  rounded-[10px]" href={link ? link : ""}>{linkTitle}</Link>)}
                </div>
            </div>
        </div>
    );
};