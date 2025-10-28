import Link from "next/link";
export default function Banner() {

    return (
        <div className="h-[350px] relative mx-5 mt-[30px] rounded-[10px] bg-[#FF8E50] overflow-hidden select-none">
            <div className=" h-full w-full flex justify-between items-center">
                <div className="size-[260px] ml-[100px] my-[45px]"></div>
                <div className="h-[250px] mr-[50px] w-1/2 flex flex-col items-end justify-between ">
                    <div className="flex flex-col w-full items-end gap-[40px]">
                        <div className="text-5xl font-semibold text-white">شروع مسیر تازه یادگیری</div>
                        <div className="text-2xl font-semibold text-white/80">با آموزش های تخصصی قدم بعدی رو در زندگی و کار بردار </div>
                    </div>
                    <Link className="w-[220px] h-[70px] flex justify-center items-center text-xl bg-black text-white font-bold hover:bg-white hover:text-[#FF8E50] hover:border-[#FF8E50] hover:border-4 duration-200  rounded-[10px]" href="#">شروع یادگیری</Link>
                </div>
            </div>
        </div>
    );
};