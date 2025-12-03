"use client";
import React, { useActionState, useState } from "react";
import { FaUser, FaLock, FaEnvelope } from "react-icons/fa";
import { loginAction, registerAction } from "@/app/actions/auth";

export default function AuthForm() {
    const [isLogin, setIsLogin] = useState(true);
    const [animating, setAnimating] = useState(false);

    const [loginState, loginFormAction, loginPending] = useActionState(
        loginAction,
        { success: false }
    );

    const [registerState, registerFormAction, registerPending] = useActionState(
        registerAction,
        { success: false }
    );

    const handleToggle = () => {
        setAnimating(true);
        setTimeout(() => {
            setIsLogin(!isLogin);
        }, 400);
        setTimeout(() => {
            setAnimating(false);
        }, 800);
    };

    const currentState = isLogin ? loginState : registerState;
    const currentAction = isLogin ? loginFormAction : registerFormAction;
    const isPending = isLogin ? loginPending : registerPending;

    return (
        <div className="flex flex-col min-h-screen">
            <div className="flex-grow flex items-center justify-center bg-gray-100 px-4 py-12">
                <div className="w-full max-w-4xl bg-white shadow-xl rounded-3xl flex flex-col md:flex-row overflow-hidden relative">

                    {/* Form Section */}
                    <div className={`w-full md:w-1/2 p-8 flex flex-col justify-center transition-all duration-700
            ${animating ? "opacity-50 translate-x-4" : "opacity-100 translate-x-0"}`}>
                        <h2 className="text-3xl font-bold text-gray-700 text-center mb-6">
                            {isLogin ? "Login" : "Register"}
                        </h2>

                        {/* Error Message */}
                        {currentState?.error && (
                            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg">
                                {currentState.error}
                            </div>
                        )}

                        <form action={currentAction} className="space-y-4">
                            {!isLogin && (
                                <>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            name="first_name"
                                            placeholder="نام"
                                            className="w-full px-4 py-3 border rounded-lg pl-10 focus:ring-2 focus:ring-orange-400 focus:outline-none"
                                            required
                                            disabled={isPending}
                                        />
                                        <FaUser className="absolute left-3 top-3.5 text-gray-400" />
                                    </div>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            name="last_name"
                                            placeholder="نام خانوادگی"
                                            className="w-full px-4 py-3 border rounded-lg pl-10 focus:ring-2 focus:ring-orange-400 focus:outline-none"
                                            required
                                            disabled={isPending}
                                        />
                                        <FaUser className="absolute left-3 top-3.5 text-gray-400" />
                                    </div>
                                </>
                            )}

                            <div className="relative">
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Email"
                                    className="w-full px-4 py-3 border rounded-lg pl-10 focus:ring-2 focus:ring-orange-400 focus:outline-none"
                                    required
                                    disabled={isPending}
                                />
                                <FaEnvelope className="absolute left-3 top-3.5 text-gray-400" />
                            </div>

                            <div className="relative">
                                <input
                                    type="password"
                                    name="password"
                                    placeholder="Password"
                                    className="w-full px-4 py-3 border rounded-lg pl-10 focus:ring-2 focus:ring-orange-400 focus:outline-none"
                                    required
                                    disabled={isPending}
                                />
                                <FaLock className="absolute left-3 top-3.5 text-gray-400" />
                            </div>
                            {!isLogin && (
                                <div className="relative">
                                    <input
                                        type="password"
                                        name="password2"
                                        placeholder="Confirm Password"
                                        className="w-full px-4 py-3 border rounded-lg pl-10 focus:ring-2 focus:ring-orange-400 focus:outline-none"
                                        required
                                        disabled={isPending}
                                    />
                                    <FaLock className="absolute left-3 top-3.5 text-gray-400" />
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={isPending}
                                className="w-full bg-orange-500 text-white py-3 rounded-lg hover:bg-orange-600 transition disabled:bg-orange-300 disabled:cursor-not-allowed"
                            >
                                {isPending ? (
                                    <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                                        {isLogin ? "Logging in..." : "Registering..."}
                  </span>
                                ) : (
                                    isLogin ? "Login" : "Register"
                                )}
                            </button>
                        </form>

                        {isLogin && (
                            <p className="text-center text-orange-500 mt-4">
                                <a href="#" className="hover:underline hover:text-orange-600">
                                    Lost your password?
                                </a>
                            </p>
                        )}

                        <p className="text-center text-gray-600 mt-6">
                            {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
                            <button
                                onClick={handleToggle}
                                type="button"
                                className="text-orange-500 font-medium hover:underline hover:text-orange-600"
                                disabled={isPending}
                            >
                                {isLogin ? "Register" : "Login"}
                            </button>
                        </p>
                    </div>

                    {/* Right Side Panel */}
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
                            disabled={isPending}
                            className="border-2 border-white py-2 px-6 rounded-lg mt-4 hover:bg-white hover:text-orange-500 transition disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isLogin ? "Register" : "Login"}
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
}
