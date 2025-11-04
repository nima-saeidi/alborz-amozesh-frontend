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
      <h3 className="text-xl font-bold text-orange-600 mb-4 text-right">سرفصل‌ها</h3>
      <div className="space-y-3 w-full">
        {topics.map((title, i) => {
          const isOpen = openIndex === i;
          return (
            <div
              key={i}
              className="bg-white rounded-lg overflow-hidden border border-gray-200 w-full shadow-sm"
            >
              <button
                onClick={() => toggle(i)}
                className="w-full flex justify-between items-center py-3 px-4 text-gray-800 font-semibold hover:bg-gray-100 transition"
              >
                <span className="flex-1 text-right">{title}</span>
                <span
                  className={`text-orange-500 ml-2 transform transition-transform duration-300 ${
                    isOpen ? "rotate-180" : "rotate-0"
                  }`}
                >
                  ▲
                </span>
              </button>

              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <div className="p-4 text-gray-700 text-sm border-t border-gray-200 text-right">
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
    <main className="flex flex-col items-center px-4 md:px-12 py-8 bg-white text-gray-900">
      {/* بالا - بخش معرفی و ثبت‌نام */}
      <section className="w-full max-w-7xl flex flex-col md:flex-row justify-center items-stretch gap-4 mb-10">
        {/* ستون چپ - اطلاعات و ثبت‌نام */}
        <div className="w-full md:w-1/3 bg-gray-50 p-6 flex flex-col justify-between rounded-lg shadow-lg border-2 border-gray-400">
          <div>
            <h2 className="text-2xl font-bold text-orange-600 mb-4">
              ۵۹,۹۹۹,۰۰۰ تومان
            </h2>
            <button className="w-full bg-orange-400 hover:bg-orange-600 text-white font-semibold py-2 rounded-lg transition">
              ثبت نام
            </button>
          </div>
          <div className="mt-6 space-y-2 text-gray-700 text-sm">
            <div className="flex justify-between border-b pb-1">
              <span>تاریخ شروع</span>
              <span>۱۳۰۳/۰۲/۲۱</span>
            </div>
            <div className="flex justify-between border-b pb-1">
              <span>تاریخ شروع</span>
              <span>۱۳۰۳/۰۲/۲۱</span>
            </div>
            <div className="flex justify-between border-b pb-1">
              <span>تاریخ شروع</span>
              <span>۱۳۰۳/۰۲/۲۱</span>
            </div>
            <div className="flex justify-between">
              <span>تاریخ شروع</span>
              <span>۱۳۰۳/۰۲/۲۱</span>
            </div>
          </div>
        </div>

        {/* ستون راست - بنر دوره */}
       <div className="w-full md:w-2/3 bg-neutral-50 flex items-center justify-center rounded-lg shadow-lg border-2 border-gray-400 p-4 min-h-[200px] md:min-h-[300px]">
  <span className="text-gray-600">تصویر یا بنر دوره</span>
</div>

      </section>

      {/* پایین - درباره دوره */}
      <section className="w-full md:w-2/3 bg-neutral-50 flex flex-col items-start justify-center rounded-lg shadow-lg border-2 border-gray-400 p-4">
        <div className="mb-6 w-full">
          <h3 className="text-2xl text-right font-bold text-orange-600 mb-4">درباره این دوره</h3>
          <p className="text-gray-800 leading-relaxed text-right">
            این دوره با هدف آشنایی مدیران و متخصصان امنیت سایبری با نقش هوش
            مصنوعی در دفاع و حمله های سایبری طراحی شده است. شرکت کنندگان خواهند
            آموخت که چگونه از الگوریتم های یادگیری ماشین و هوش مصنوعی برای تشخیص
            تهدیدات، تحلیل بدافزار ها و پاسخ خودکار به حمله ها استفاده کنند.
            همچنین به جنبه های تاریک این فناوری از جمله حمله های مبتنی بر هوش
            مصنوعی مانند دیپ فیک و بدافزارهای تطبیقی پرداخته می‌شود. این دوره
            شامل مثال های واقعی، دموهای عملی و بررسی ابزارهای پیشرو مانند <br/> Darktrace و CrowdStrike
   
            <br /><br />
            در پایان نقشه راهی برای ادغام هوش مصنوعی در استراتژی امنیت سازمانی
            ارائه خواهد شد.    مدت  زمان   این 
            بوتکمپ ۸ ساعت است که در روز پنجشنبه ۱۳
            آذرماه از ساعت ۹ تا ۱۷ به صورت حضوری برگزار خواهد شد
          </p>
        </div>

        {/* سرفصل‌ها */}
        <Syllabus />
      </section>
    </main>
  );
}
