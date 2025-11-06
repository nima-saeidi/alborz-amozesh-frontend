"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function AuthPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // نمونه تستی - در پروژه واقعی به API وصل می‌شود
    if (email === "admin@example.com" && password === "123456") {
      router.push("/dashboard");
    } else {
      alert("ایمیل یا رمز عبور اشتباه است.");
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-100 via-white to-orange-50 dark:from-gray-900 dark:via-gray-800 dark:to-black transition-colors duration-700 overflow-hidden">
      {/* نور و انیمیشن پس‌زمینه */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute top-[-200px] left-[-200px] w-[400px] h-[400px] bg-orange-400/20 dark:bg-orange-500/10 rounded-full blur-3xl animate-pulse"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, delay: 0.3 }}
        className="absolute bottom-[-200px] right-[-200px] w-[400px] h-[400px] bg-[#FF8E50]/25 dark:bg-orange-600/10 rounded-full blur-3xl animate-pulse"
      />

      {/* کارت اصلی */}
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 w-[800px] max-w-full md:h-[480px] bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/30 dark:border-gray-700 flex flex-col items-center justify-center p-8 hover:shadow-orange-200/30 hover:-translate-y-1 transition-all duration-300"
      >
        {/* لوگو و متن خوش‌آمد */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="mb-6 text-center"
        >
          <h1 className="text-[42px] font-extrabold bg-gradient-to-r from-[#FF8E50] to-[#FF5500] bg-clip-text text-transparent drop-shadow-md tracking-wide">
            LOGO
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-sm mt-2">
            خوش آمدید! لطفاً وارد حساب کاربری خود شوید
          </p>
        </motion.div>

        {/* فرم ورود */}
        <motion.form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 items-center w-full transition-all duration-300"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <input
            type="email"
            placeholder="ایمیل"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-[450px] max-w-full h-[55px] rounded-xl bg-white/90 dark:bg-gray-800/70 border border-gray-300 dark:border-gray-700 px-4 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-[#FF8E50]/70 focus:border-[#FF8E50] placeholder-gray-400 dark:placeholder-gray-500 shadow-sm transition-all"
          />

          <input
            type="password"
            placeholder="رمز عبور"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-[450px] max-w-full h-[55px] rounded-xl bg-white/90 dark:bg-gray-800/70 border border-gray-300 dark:border-gray-700 px-4 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-[#FF8E50]/70 focus:border-[#FF8E50] placeholder-gray-400 dark:placeholder-gray-500 shadow-sm transition-all"
          />

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            type="submit"
            className="w-[450px] max-w-full h-[55px] rounded-xl bg-gradient-to-r from-[#FF8E50] to-[#FF5E00] text-white font-bold text-lg shadow-md hover:shadow-lg hover:from-[#FF9E60] hover:to-[#FF6E10] transition-all duration-300"
          >
            ورود
          </motion.button>
        </motion.form>

        {/* لینک‌ها */}
        <motion.div
          className="mt-6 text-sm text-gray-700 dark:text-gray-400 flex flex-col items-center gap-2 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
        >
          <Link
            href="/forgot-password"
            className="hover:text-[#FF8E50] transition-colors duration-200"
          >
            فراموشی رمز عبور؟
          </Link>
          <div>
            حساب کاربری ندارید؟{" "}
            <Link
              href="/register"
              className="text-[#FF8E50] font-semibold hover:underline"
            >
              ساخت حساب کاربری
            </Link>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
