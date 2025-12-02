// app/auth/page.tsx
"use client";
interface FormState {
  username: string;
  email: string;
  password: string;
  password2: string;
}

import React, { useState } from "react";
import { FaUser, FaLock, FaEnvelope } from "react-icons/fa";

export default function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);
  const [animating, setAnimating] = useState(false);

  // داده‌های فرم
  const [form, setForm] = useState<FormState>({
    username: "",
    email: "",
    password: "",
    password2: "",
  });

  // مدیریت خطا و وضعیت
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");

  const handleToggle = () => {
    setAnimating(true);
    setTimeout(() => {
      setIsLogin(!isLogin);
      setError("");
      setForm({
        username: "",
        email: "",
        password: "",
        password2: "",
      });
    }, 400);

    setTimeout(() => {
      setAnimating(false);
    }, 800);
  };

  // ---------- نوع‌دهی دقیق event ها ----------
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ----------------------------
  // 🔥 LOGIN BACKEND CALL
  // ----------------------------
  const handleLogin = async () => {
    setLoading(true);
    setError("");

    try {
      const res = await fetch("http://185.208.175.233:5000/auth/login/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: form.email,
          password: form.password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError((data && (data.detail || data.message)) || "Login failed");
        setLoading(false);
        return;
      }

      if (data.token) {
        localStorage.setItem("token", data.token);
      }

      window.location.href = "/dashboard";
    } catch (err) {
      console.error(err);
      setError("Network error");
    }

    setLoading(false);
  };

  // ----------------------------
  // 🔥 REGISTER BACKEND CALL
  // ----------------------------
  const handleRegister = async () => {
    if (form.password !== form.password2) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch("http://185.208.175.233:5000/auth/register/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          first_name: form.username,
          last_name: "",
          email: form.email,
          password: form.password,
          password2: form.password2,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        if (data && typeof data === "object") {
          setError(JSON.stringify(data));
        } else {
          setError("Register failed");
        }
        setLoading(false);
        return;
      }

      // ✅ اگر توکن هم برگردد مستقیم وارد شود
      if (data.token) {
        localStorage.setItem("token", data.token);
        window.location.href = "/dashboard";
        return;
      }

      // اگر توکن برنگرداند، پیام موفقیت و برگشت به login
      alert("Registered successfully! Now you can login.");
      setIsLogin(true);
    } catch (err) {
      console.error(err);
      setError("Network error");
    }

    setLoading(false);
  };

  // ---------- نوع‌دهی دقیق submit ----------
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isLogin) handleLogin();
    else handleRegister();
  };

  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
     <div className="flex-grow flex items-center justify-center w-full overflow-hidden bg-gray-100 px-4 py-12">

        <div className="w-full max-w-4xl bg-white shadow-xl rounded-3xl flex flex-col md:flex-row overflow-hidden relative h-auto">

          {/* فرم سمت چپ */}
          <div
            className={`w-full md:w-1/2 p-8 flex flex-col justify-center transition-all duration-700
            ${animating ? "opacity-50 translate-x-4" : "opacity-100 translate-x-0"}`}
          >
            <h2 className="text-3xl font-bold text-gray-700 text-center mb-6">
              {isLogin ? "Login" : "Register"}
            </h2>

            {error && (
              <p className="text-red-500 text-center mb-3 text-sm">{error}</p>
            )}

            <form className="space-y-4" onSubmit={handleSubmit}>
              {!isLogin && (
                <div className="relative">
                  <input
                    type="text"
                    name="username"
                    value={form.username}
                    onChange={handleChange}
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
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Email"
                  className="w-full px-4 py-3 border rounded-lg pl-10 focus:ring-2 focus:ring-orange-400 focus:outline-none"
                  required
                />
                <FaEnvelope className="absolute left-3 top-3.5 text-gray-400" />
              </div>

              <div className="relative">
                <input
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Password"
                  className="w-full px-4 py-3 border rounded-lg pl-10 focus:ring-2 focus:ring-orange-400 focus:outline-none"
                  required
                />
                <FaLock className="absolute left-3 top-3.5 text-gray-400" />
              </div>

              {!isLogin && (
                <div className="relative">
                  <input
                    type="password"
                    name="password2"
                    value={form.password2}
                    onChange={handleChange}
                    placeholder="Confirm Password"
                    className="w-full px-4 py-3 border rounded-lg pl-10 focus:ring-2 focus:ring-orange-400 focus:outline-none"
                    required
                  />
                  <FaLock className="absolute left-3 top-3.5 text-gray-400" />
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-orange-500 text-white py-3 rounded-lg hover:bg-orange-600 transition"
              >
                {loading ? "Please wait..." : isLogin ? "Login" : "Register"}
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
              >
                {isLogin ? "Register" : "Login"}
              </button>
            </p>
          </div>

          {/* سمت راست انیمیشن */}
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
    </div>
  );
}
