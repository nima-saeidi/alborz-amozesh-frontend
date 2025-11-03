"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function AuthPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email === "admin@example.com" && password === "123456") {
      router.push("/dashboard");
    } else {
      alert("ایمیل یا رمز عبور اشتباه است.");
    }
  };

  return (
    <div className="bg-white  flex items-center justify-center overflow-hidden px-4">
      <div
  className="
    flex flex-col justify-center items-center shadow-md 
    w-[800px] h-[430px] 
    top-[150px] left-[305px] bottom-[217px] 
    rounded-[10px] 
    bg-[#F2F2F2] 
    rotate-0 
    opacity-100
  "
>


        {/* لوگو */}
        <h1
  className="
    text-center 
    w-[96px]  h-[39px] 
    top-[113px] left-[511px] 
    font-inter font-normal not-italic 
    text-[32px] leading-[100%] tracking-[0%] 
    text-black 
    rotate-0 translate-y-[-35px] 
    opacity-100 
    flex items-center justify-center
  "
>
  LOGO
</h1>


        {/* فرم */}
        <form
          onSubmit={handleSubmit}
          className="w-full flex flex-col gap-4 ml-96"
        >
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="  w-[450px] h-[60px] rounded-[10px]  bg-[#D9D9D9] border border-gray-300 px-4 focus:outline-none focus:border-[#FF8E50]"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-[450px] h-[60px] rounded-[10px] bg-[#D9D9D9] border border-gray-300 px-4 focus:outline-none focus:border-[#FF8E50]"
          />

          <button
            type="submit"
            className="w-[450px] h-[60px] rounded-[10px] bg-[#FF8E50] text-black font-bold hover:bg-black hover:text-[#FF8E50] transition-all duration-200"
          >
            ورود
          </button>
        </form>

        {/* لینک‌ها */}
        <div className="mt-4 text-sm text-gray-700 flex flex-col items-center gap-2 text-center">
          <Link href="/forgot-password" className="hover:text-[#FF8E50]">
            فراموشی رمز عبور؟
          </Link>
          <div>
            حساب کاربری ندارید؟{" "}
            <Link href="/register" className="text-[#FF8E50] hover:underline">
              ساخت حساب کاربری
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
