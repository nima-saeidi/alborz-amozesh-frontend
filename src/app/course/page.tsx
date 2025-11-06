"use client";

import { useState } from "react";

const Syllabus = () => {
  const topics = [
    "ورود به دنیای هوش مصنوعی",
    "الگوریتم‌های یادگیری ماشین",
    "تهدیدات سایبری",
    "ابزارهای امنیتی",
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="w-full">
      <h3 className="text-2xl font-bold text-orange-600 mb-6 text-right relative after:content-[''] after:block after:w-24 after:h-[3px] after:bg-orange-400 after:rounded-full after:mt-1 after:ml-auto">
        سرفصل‌ها
      </h3>

      <div className="space-y-4 w-full">
        {topics.map((title, i) => {
          const isOpen = openIndex === i;
          return (
            <div
              key={i}
              className="bg-white/80 backdrop-blur-md border border-gray-200 rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
            >
              <button
                onClick={() => toggle(i)}
                className="w-full flex justify-between items-center py-4 px-5 text-gray-900 font-semibold hover:bg-orange-50 transition-all rounded-xl"
              >
                <span className="flex-1 text-right">{title}</span>
                <span
                  className={`text-orange-500 transform transition-transform duration-300 ${
                    isOpen ? "rotate-180" : "rotate-0"
                  }`}
                >
                  ▲
                </span>
              </button>

              <div
                className={`overflow-hidden transition-all duration-500 ease-in-out ${
                  isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <div className="p-5 text-gray-700 text-sm border-t border-gray-200 bg-gradient-to-l from-orange-50/50 to-transparent text-right leading-relaxed animate-fadeIn">
                  توضیحات مربوط به این بخش از سرفصل در اینجا قرار می‌گیرد.
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default function CoursePage() {
  return (
    <main className="flex flex-col items-center px-4 md:px-12 py-12 bg-gradient-to-br from-orange-50 via-white to-orange-100 text-gray-900 min-h-screen relative overflow-hidden">
      {/* افکت نور در پس‌زمینه */}
      <div className="absolute top-[-200px] right-[-200px] w-[400px] h-[400px] bg-orange-300/30 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-[-200px] left-[-200px] w-[400px] h-[400px] bg-yellow-200/20 rounded-full blur-3xl animate-pulse" />

      {/* بالا - بخش معرفی و ثبت‌نام */}
      <section className="w-full max-w-7xl flex flex-col md:flex-row justify-center items-stretch gap-6 mb-12 z-10">
        {/* ستون چپ - اطلاعات و ثبت‌نام */}
        <div className="w-full md:w-1/3 bg-white/70 backdrop-blur-lg border border-gray-200 rounded-2xl shadow-lg p-8 flex flex-col justify-between hover:shadow-2xl hover:border-orange-300 transition-all duration-300">
          <div>
            <h2 className="text-3xl font-extrabold text-orange-600 mb-6 text-center drop-shadow-sm">
              ۵۹,۹۹۹,۰۰۰ تومان
            </h2>
            <button className="w-full bg-gradient-to-r from-orange-400 to-orange-600 hover:from-orange-500 hover:to-orange-700 text-white font-semibold py-3 rounded-xl transition-all duration-300 transform hover:scale-[1.03] shadow-md">
              ثبت نام
            </button>
          </div>

          <div className="mt-8 space-y-3 text-gray-700 text-sm">
            {Array(4)
              .fill("۱۳۰۳/۰۲/۲۱")
              .map((date, i) => (
                <div
                  key={i}
                  className="flex justify-between border-b border-gray-200 pb-2 hover:text-orange-500 transition-colors"
                >
                  <span>تاریخ شروع</span>
                  <span className="font-medium">{date}</span>
                </div>
              ))}
          </div>
        </div>

        {/* ستون راست - بنر دوره */}
        <div className="w-full md:w-2/3 bg-white/70 backdrop-blur-md flex items-center justify-center rounded-2xl shadow-xl border border-gray-200 p-6 min-h-[220px] md:min-h-[320px] hover:shadow-2xl transition-all duration-300 relative overflow-hidden">
          <span className="text-gray-600 text-lg font-medium relative z-10">
            تصویر یا بنر دوره
          </span>
          <div className="absolute inset-0 bg-gradient-to-tr from-orange-200/30 to-transparent opacity-70" />
        </div>
      </section>

      {/* پایین - درباره دوره */}
      <section className="w-full md:w-2/3 bg-white/80 backdrop-blur-md flex flex-col items-start justify-center rounded-2xl shadow-xl border border-gray-200 p-8 hover:shadow-2xl transition-all duration-300 z-10">
        <div className="mb-8 w-full">
          <h3 className="text-2xl text-right font-bold text-orange-600 mb-4 relative after:content-[''] after:block after:w-20 after:h-[3px]  after:rounded-full after:mt-1 after:ml-auto">
            درباره این دوره
          </h3>
          <p className="text-gray-800 leading-relaxed text-right text-[15px]">
            این دوره با هدف آشنایی مدیران و متخصصان امنیت سایبری با نقش هوش
            مصنوعی در دفاع و حمله های سایبری طراحی شده است. شرکت کنندگان خواهند
            آموخت که چگونه از الگوریتم های یادگیری ماشین و هوش مصنوعی برای تشخیص
            تهدیدات، تحلیل بدافزارها و پاسخ خودکار به حمله‌ها استفاده کنند.
            همچنین به جنبه‌های تاریک این فناوری از جمله حمله‌های مبتنی بر هوش
            مصنوعی مانند دیپ‌فیک و بدافزارهای تطبیقی پرداخته می‌شود. این دوره
             شامل مثال های واقعی، دموهای عملی و بررسی ابزارهای پیشرو مانند <br/> Darktrace و CrowdStrike
            <br />
            <br />
            در پایان نقشه راهی برای ادغام هوش مصنوعی در استراتژی امنیت سازمانی
            ارائه خواهد شد. مدت زمان این بوتکمپ ۸ ساعت است که در روز پنجشنبه ۱۳
            آذرماه از ساعت ۹ تا ۱۷ به صورت حضوری برگزار خواهد شد
          </p>
        </div>

        {/* سرفصل‌ها */}
        <Syllabus />
      </section>
    </main>
  );
}
