// app/courses/[courseld]/page.tsx
"use client";

import { useState, useEffect } from "react";

interface CourseSession {
  id: number;
  title: string;
  description?: string;
}

interface Course {
  id: number;
  title: string;
  description?: string;
  discount_price?: string;
  cost?: string;
  logo?: string;
  start_date?: string;
  sessions?: CourseSession[];
}

const defaultSessions: CourseSession[] = [
  { id: 1, title: "ورود به دنیای هوش مصنوعی", description: "توضیحات ورود به دنیای هوش مصنوعی" },
  { id: 2, title: "الگوریتم‌های یادگیری ماشین", description: "توضیحات الگوریتم‌های یادگیری ماشین" },
  { id: 3, title: "تهدیدات سایبری", description: "توضیحات تهدیدات سایبری" },
  { id: 4, title: "ابزارهای امنیتی", description: "توضیحات ابزارهای امنیتی" },
];

const Syllabus = ({ sessions }: { sessions: CourseSession[] }) => {
  const topics = sessions.length ? sessions.map((s) => s.title) : defaultSessions.map((s) => s.title);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const toggle = (index: number) => setOpenIndex(openIndex === index ? null : index);


  return (
    <div className="w-full">
      <h3 className="text-2xl font-bold text-orange-600 mb-6 text-right relative after:content-[''] after:block after:w-24 after:h-[3px] after:bg-orange-400 after:rounded-full after:mt-1 after:ml-auto">
        سرفصل‌ها
      </h3>

      <div className="space-y-4 w-full">
        {topics.map((title, i) => {
          const isOpen = openIndex === i;
          const description = sessions[i]?.description || defaultSessions[i]?.description;
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

export default function CoursePage({ params }: { params: { courseld: string } }) {
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);

  // ===== new state for enroll action =====
  const [enrollLoading, setEnrollLoading] = useState(false);
  // =======================================

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await fetch(`http://185.208.175.233:5000/courses/${params.courseld}/`);
        if (!res.ok) throw new Error("Network response was not ok");
        const data: Course = await res.json();
        setCourse(data);
      } catch (err) {
        console.error("Error fetching course:", err);
        setCourse({
          id: 0,
          title: "دوره نمونه",
          description: "این دوره با هدف آشنایی مدیران و متخصصان امنیت سایبری با نقش هوش مصنوعی در دفاع و حمله‌های سایبری طراحی شده است.",
          discount_price: "۵۹,۹۹۹,۰۰۰",
          cost: "۶۹,۹۹۹,۰۰۰",
          start_date: "۱۳۰۳/۰۲/۲۱",
          sessions: defaultSessions,
        });
      } finally {
        setLoading(false);
      }
    };
    fetchCourse();
  }, [params.courseld]);

  // ===== Helper: get student id (tries localStorage, otherwise prompt) =====
  const getStudentId = (): number | null => {
    try {
      const idStr = typeof window !== "undefined"
        ? (localStorage.getItem("studentId") || localStorage.getItem("userId") || "")
        : "";
      if (idStr) {
        const n = Number(idStr);
        if (!isNaN(n)) return n;
      }
      // fallback: ask user (temporary) — replace with actual auth integration if available
      if (typeof window !== "undefined") {
        const promptId = window.prompt("لطفا شناسه (ID) دانشجو را وارد کنید:");
        if (promptId) {
          const n = Number(promptId);
          if (!isNaN(n)) return n;
        }
      }
    } catch (e) {
      console.error("Error getting student id:", e);
    }
    return null;
  };
  // ======================================================================

  // ===== enroll function -> POST /student/enroll/ =====
  const enrollStudent = async () => {
    if (!course) {
      alert("اطلاعات دوره در دسترس نیست.");
      return;
    }

    const studentId = getStudentId();
    if (!studentId) {
      alert("شناسه دانشجو پیدا نشد. برای ادامه لطفا شناسه را در localStorage ذخیره کنید یا وارد شوید.");
      return;
    }

    setEnrollLoading(true);
    try {
      const payload = {
        student: studentId,
        course: course.id,
        
      };

      const res = await fetch("http://185.208.175.233:5000/student/enroll/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (res.status === 201 || res.ok) {
        const data = await res.json();
        // موفقیت: می‌توانیم پیام نشان دهیم یا کاربر را به داشبورد هدایت کنیم
        alert("ثبت‌نام با موفقیت انجام شد.");
        console.log("enroll response:", data);
      } else {
        // خطا: نمایش پیام با متن برگشتی در صورت وجود
        let errText = `خطا در ثبت‌نام. وضعیت: ${res.status}`;
        try {
          const errBody = await res.json();
          errText += ` — ${JSON.stringify(errBody)}`;
        } catch (e) {}
        alert(errText);
      }
    } catch (err) {
      console.error("Error enrolling student:", err);
      alert("خطا در ارسال درخواست ثبت‌نام. اتصال به سرور را بررسی کنید.");
    } finally {
      setEnrollLoading(false);
    }
  };
  // ===================================================

  if (loading) return <p>در حال بارگذاری...</p>;
  if (!course) return <p>دوره‌ای یافت نشد.</p>;

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
            <button
              onClick={enrollStudent}
              disabled={enrollLoading}
              className={`w-full bg-gradient-to-r from-orange-400 to-orange-600 hover:from-orange-500 hover:to-orange-700 text-white font-semibold py-3 rounded-xl transition-all duration-300 transform hover:scale-[1.03] shadow-md ${
                enrollLoading ? "opacity-60 cursor-not-allowed" : ""
              }`}
            >
              {enrollLoading ? "در حال ثبت‌نام..." : "ثبت نام"}
            </button>
          </div>

          <div className="mt-8 space-y-3 text-gray-700 text-sm">
            {(course.start_date ? [course.start_date] :Array(4)
              .fill("۱۳۰۳/۰۲/۲۱"))
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
        <div className="w-full md:w-2/3 bg-white/70 backdrop-blur-md flex items-center justify-center rounded-2xl shadow-xl border border-gray-200 p-6  hover:shadow-2xl transition-all duration-300 relative overflow-hidden">
           {course.logo ? (
            <img src={course.logo} alt={course.title} className="w-full h-auto rounded-xl" />
          ) : (
          <span className="text-gray-600 text-lg font-medium relative z-10">
            تصویر یا بنر دوره
          </span>
           )}
          <div className="absolute inset-0 bg-gradient-to-tr from-orange-200/30 to-transparent opacity-70" />
        </div>
      </section>

      {/* پایین - درباره دوره */}
      <section
  dir="rtl"
  className="w-full md:w-2/3 flex flex-col items-start p-8 text-lg text-right ml-auto"
>
  <div className="mb-8 w-full">
    <h3 className="text-2xl font-bold text-orange-600 mb-4 relative after:content-[''] after:block after:w-20 after:h-[3px] after:rounded-full after:mt-1 after:ml-auto">
      درباره این دوره
    </h3>
    <p className="text-gray-800 leading-relaxed text-[15px]">
      این دوره با هدف آشنایی مدیران و متخصصان امنیت سایبری با نقش هوش
      مصنوعی در دفاع و حمله‌های سایبری طراحی شده است. شرکت‌کنندگان خواهند
      آموخت که چگونه از الگوریتم‌های یادگیری ماشین و هوش مصنوعی برای تشخیص
      تهدیدات، تحلیل بدافزارها و پاسخ خودکار به حمله‌ها استفاده کنند.
      همچنین به جنبه‌های تاریک این فناوری از جمله حمله‌های مبتنی بر هوش
      مصنوعی مانند دیپ‌فیک و بدافزارهای تطبیقی پرداخته می‌شود. این دوره
      شامل مثال‌های واقعی، دموهای عملی و بررسی ابزارهای پیشرو مانند <br />
      Darktrace و CrowdStrike
      <br />
      <br />
      در پایان نقشه راهی برای ادغام هوش مصنوعی در استراتژی امنیت سازمانی
      ارائه خواهد شد. مدت زمان این بوتکمپ ۸ ساعت است که در روز پنجشنبه ۱۳
      آذرماه از ساعت ۹ تا ۱۷ به صورت حضوری برگزار خواهد شد.
    <br />
     {course.description}
    </p>
  </div>

        {/* سرفصل‌ها */}
        <Syllabus sessions={course.sessions || defaultSessions} />
      </section>
    </main>
  );
}
