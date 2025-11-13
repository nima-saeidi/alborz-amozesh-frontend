"use client";
import React, { useState } from "react";

import { FaUser, FaLock, FaEnvelope } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { FaFacebookF, FaGithub, FaLinkedinIn } from "react-icons/fa";
import Footer from "@/components/footer";

export default function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);
  const [animating, setAnimating] = useState(false);

  const handleToggle = () => {
    setAnimating(true);
    setTimeout(() => {
      setIsLogin(!isLogin);
    }, 400); // تغییر حالت فرم بعد از نیمه انیمیشن
    setTimeout(() => {
      setAnimating(false);
    }, 800); // پایان انیمیشن
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow flex items-center justify-center bg-gray-100 px-4 py-12">
        <div className="w-full max-w-4xl bg-white shadow-xl rounded-3xl flex flex-col md:flex-row overflow-hidden relative">

          {/* بخش سمت چپ فرم */}
          <div className={`w-full md:w-1/2 p-8 flex flex-col justify-center transition-all duration-700
            ${animating ? "opacity-50 translate-x-4" : "opacity-100 translate-x-0"}`}>
            <h2 className="text-3xl font-bold text-gray-700 text-center mb-6">
              {isLogin ? "Login" : "Register"}
            </h2>

            <form className="space-y-4">
              {!isLogin && (
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Username"
                    className="w-full px-4 py-3 border rounded-lg pl-10 focus:ring-2 focus:ring-orange-400 focus:outline-none"
                    required
                  />
                  <FaUser className="absolute left-3 top-3.5 text-gray-400" />
                </div>
              )}
              <div className="relative">
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full px-4 py-3 border rounded-lg pl-10 focus:ring-2 focus:ring-orange-400 focus:outline-none"
                  required
                />
                <FaEnvelope className="absolute left-3 top-3.5 text-gray-400" />
              </div>
              <div className="relative">
                <input
                  type="password"
                  placeholder="Password"
                  className="w-full px-4 py-3 border rounded-lg pl-10 focus:ring-2 focus:ring-orange-400 focus:outline-none"
                  required
                />
                <FaLock className="absolute left-3 top-3.5 text-gray-400" />
              </div>

              <button
                type="submit"
                className="w-full bg-orange-500 text-white py-3 rounded-lg hover:bg-orange-600 transition"
              >
                {isLogin ? "Login" : "Register"}
              </button>
            </form>

            {isLogin && (
              <p className="text-center text-orange-500 mt-4">
                <a href="#" className="hover:underline hover:text-orange-600">
                  Lost your password?
                </a>
              </p>
            )}

            <p className="text-center text-gray-500 mt-6">or continue with</p>

            <div className="flex justify-center space-x-4 mt-4">
              <FcGoogle className="text-2xl cursor-pointer" />
              <FaFacebookF className="text-black text-2xl cursor-pointer hover:text-gray-700 transition" />
              <FaGithub className="text-black text-2xl cursor-pointer hover:text-gray-700 transition" />
              <FaLinkedinIn className="text-black text-2xl cursor-pointer hover:text-gray-700 transition" />
            </div>

            <p className="text-center text-gray-600 mt-6">
              {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
              <button
                onClick={handleToggle}
                type="button"
                className="text-orange-500 font-medium hover:underline hover:text-orange-600"
              >
                {isLogin ? "Register" : "Login"}
              </button>
            </p>
          </div>

          {/* بخش سمت راست نارنجی/سیاه با انیمیشن باز شدن از گوشه‌ها */}
          <div
            className={`hidden md:flex w-1/2 flex-col items-center justify-center p-10 text-white transition-all duration-700
              rounded-tl-[80px] rounded-bl-[80px]
              ${isLogin ? "bg-orange-500 hover:bg-orange-600" : "bg-black hover:bg-gray-900"}
              ${animating ? "scale-x-105 scale-y-105" : "scale-x-100 scale-y-100"}`}
          >
            <div className="absolute w-40 h-40 bg-white opacity-20 rounded-full -top-10 -left-10"></div>
            <div className="absolute w-24 h-24 bg-white opacity-20 rounded-full -bottom-5 -right-5"></div>

            <h2 className="text-3xl font-bold text-center">
              {isLogin ? "Welcome Back!" : "Join Us Now!"}
            </h2>
            <p className="text-center mt-2">
              {isLogin ? "Sign in to continue" : "Create an account to get started"}
            </p>
            <button
              onClick={handleToggle}
              className="border-2 border-white py-2 px-6 rounded-lg mt-4 hover:bg-white hover:text-orange-500 transition"
            >
              {isLogin ? "Register" : "Login"}
            </button>
          </div>

        </div>
      </div>
       <Footer />
    </div>
    
  );
}
