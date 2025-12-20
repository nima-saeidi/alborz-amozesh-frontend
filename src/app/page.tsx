"use client";

import HeroSection from "@/components/hero-section";
import Banner from "@/components/ui/banner";
import Slider from "react-slick";
import Image from "next/image";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Footer from "@/components/footer";

export default function Home() {
    const courses = [
        {id: 1, title: "Front-End", teacher: "بهزاد اقدم", img: "/images/frontend.jpg"},
        {id: 2, title: "Back-End", teacher: "بهزاد اقدم", img: "/images/backend.jpg"},
        {id: 3, title: "Network", teacher: "بهزاد اقدم", img: "/images/network.jpg"},
        {id: 4, title: "Linux", teacher: "بهزاد اقدم", img: "/images/linux.jpg"},
        {id: 5, title: "Mikrotik", teacher: "بهزاد اقدم", img: "/images/mikrotik.jpg"},
        {id: 6, title: "Full Stack Developer", teacher: "بهزاد اقدم", img: "/images/fullstack.jpg"},
        {id: 7, title: "Cyber Security", teacher: "بهزاد اقدم", img: "/images/cyber.jpg"},
        {id: 8, title: "DevOps", teacher: "بهزاد اقدم", img: "/images/devops.jpg"},
        {id: 9, title: "AI & Machine Learning", teacher: "بهزاد اقدم", img: "/images/ai.jpg"},
    ];

    const settings = {
        dots: true,
        infinite: true,
        speed: 700,
        slidesToShow: 3,
        slidesToScroll: 3,
        autoplay: true,
        autoplaySpeed: 3000,
        responsive: [
            {
                breakpoint: 1024,
                settings: {slidesToShow: 2, slidesToScroll: 2},
            },
            {
                breakpoint: 640,
                settings: {slidesToShow: 1, slidesToScroll: 1},
            },
        ],
    };

    return (
        <>
            <Banner
                title={"شروع مسیر تازه یادگیری"}
                description={"با آموزش های تخصصی قدم بعدی رو در زندگی و کار بردار "}
                linkAvailable={true}
                linkTitle="شروع یادگیری"
                link="/courses"
                
            />
            <HeroSection/>

            {/* 🔹 مسیر یادگیری */}
            <section className="w-full py-16 bg-linear-to-b from-orange-50 to-white">
                <div className="max-w-6xl mx-auto px-6">
                    <h2 className="text-3xl font-extrabold text-gray-800 text-center mb-10">
                        مسیر یادگیری شما
                    </h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {/* HTML */}
                        <div
                            className="group bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center text-center hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 border-t-4 border-orange-500">
                            <div
                                className="w-16 h-16 bg-orange-100 text-orange-600 flex items-center justify-center rounded-full text-3xl font-bold mb-4 group-hover:bg-orange-600 group-hover:text-white transition-all">
                                H
                            </div>
                            <h3 className="text-xl font-bold text-gray-800 mb-2">HTML</h3>
                            <p className="text-gray-600 text-sm leading-relaxed">
                                یادگیری ساختار صفحات وب و تگ‌های اصلی برای پایه‌گذاری سایت.
                            </p>
                        </div>

                        {/* CSS */}
                        <div
                            className="group bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center text-center hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 border-t-4 border-blue-500">
                            <div
                                className="w-16 h-16 bg-blue-100 text-blue-600 flex items-center justify-center rounded-full text-3xl font-bold mb-4 group-hover:bg-blue-600 group-hover:text-white transition-all">
                                C
                            </div>
                            <h3 className="text-xl font-bold text-gray-800 mb-2">CSS</h3>
                            <p className="text-gray-600 text-sm leading-relaxed">
                                طراحی و زیباسازی صفحات با رنگ، فاصله و افکت‌های مدرن.
                            </p>
                        </div>

                        {/* JavaScript */}
                        <div
                            className="group bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center text-center hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 border-t-4 border-yellow-500">
                            <div
                                className="w-16 h-16 bg-yellow-100 text-yellow-600 flex items-center justify-center rounded-full text-3xl font-bold mb-4 group-hover:bg-yellow-500 group-hover:text-white transition-all">
                                J
                            </div>
                            <h3 className="text-xl font-bold text-gray-800 mb-2">
                                JavaScript
                            </h3>
                            <p className="text-gray-600 text-sm leading-relaxed">
                                یادگیری منطق و پویایی در صفحات وب با جاوااسکریپت.
                            </p>
                        </div>

                        {/* React */}
                        <div
                            className="group bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center text-center hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 border-t-4 border-cyan-500">
                            <div
                                className="w-16 h-16 bg-cyan-100 text-cyan-600 flex items-center justify-center rounded-full text-3xl font-bold mb-4 group-hover:bg-cyan-600 group-hover:text-white transition-all">
                                R
                            </div>
                            <h3 className="text-xl font-bold text-gray-800 mb-2">React</h3>
                            <p className="text-gray-600 text-sm leading-relaxed">
                                ساخت رابط کاربری مدرن و سریع با کامپوننت‌های React.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 🎓 بخش دوره‌های پر بازدید */}
            <section className="w-full py-20 bg-white">
                <div className="max-w-6xl mx-auto px-6 text-center">
                    <h2 className="text-3xl font-extrabold text-gray-800 mb-10">
                        دوره‌های پربازدید
                    </h2>

                    <Slider {...settings}>
                        {courses.map((course) => (
                            <div key={course.id} className="px-4">
                                <div
                                    className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300">
                                    <Image
                                        src={course.img}
                                        alt={course.title}
                                        width={400}
                                        height={250}
                                        className="object-cover w-full h-56"
                                    />
                                    <div className="p-6">
                                        <h3 className="text-xl font-bold text-gray-800 mb-2">
                                            {course.title}
                                        </h3>
                                        <p className="text-gray-500 text-sm">مدرس: {course.teacher}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </Slider>
                </div>
            </section>
            <Footer/>
        
        </>
    );
}

