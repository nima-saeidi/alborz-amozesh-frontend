import Link from "next/link";
export default function AuthNavbar() {

    return (
        <div className="flex justify-between items-center h-[100px] w-full">
            <div className="w-[265px] h-full flex justify-center items-center">
                <Link
                    className="m-5 h-[60px] w-[225px] flex justify-center items-center bg-[#FF8E50] text-black font-bold hover:bg-black hover:text-[#FF8E50] hover:border-[#FF8E50] hover:border-4 duration-200  rounded-[10px]"
                    href="/"
                >
                    بازگشت به صفحه اصلی
                </Link>
            </div>
        </div>
    );
}