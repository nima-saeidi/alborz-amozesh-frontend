// app/dashboard/my-courses/page.tsx
"use client";

import { useEffect, useState } from "react";

interface Invoice {
  id: number;
  student: number;
  student_name: string;
  course: number;
  course_title: string;
  paid: boolean;
  grade?: string;
  score?: string;
  date_time: string;
}

export default function MyCoursesPage() {
  const [courses, setCourses] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(true);

  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

  // 📌 دریافت لیست دوره‌های ثبت‌نام‌شده
  const fetchCourses = async () => {
    try {
      const res = await fetch("http://185.208.175.233:5000/student/invoices/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      setCourses(data.results || []);
    } catch (err) {
      console.error("Error fetching invoices:", err);
    } finally {
      setLoading(false);
    }
  };

  // 📌 حذف دوره (API DELETE student/remove)
  const removeCourse = async (id: number) => {
    try {
      await fetch("http://185.208.175.233:5000/student/remove/", {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // بعد از حذف → لیست را دوباره لود کن
      fetchCourses();
    } catch (err) {
      console.error("Error removing course:", err);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  if (loading) return <div className="p-4">در حال بارگذاری...</div>;

  return (
    <div className="flex flex-1 flex-col gap-4 p-4" dir="rtl">
      <h2 className="text-xl font-bold mb-4">دوره‌های من</h2>

      {courses.length === 0 ? (
        <p>هیچ دوره‌ای ثبت‌نام نشده است.</p>
      ) : (
        <div className="flex flex-col gap-4">
          {courses.map((c) => (
            <div
              key={c.id}
              className="p-4 border rounded-xl bg-white flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
            >
              <div className="flex-1 flex flex-col md:flex-row md:gap-6">
                <div>
                  <p className="font-semibold text-lg">{c.course_title}</p>
                  <p className="text-sm text-gray-600">
                    دانشجو: {c.student_name}
                  </p>
                  <p className="text-sm text-gray-600">
                    تاریخ ثبت‌نام: {new Date(c.date_time).toLocaleDateString("fa-IR")}
                  </p>
                </div>

                <div className="mt-2 md:mt-0 flex flex-col gap-1">
                  <p className="text-sm text-gray-700">
                    وضعیت پرداخت: {c.paid ? "پرداخت شده" : "پرداخت نشده"}
                  </p>
                  {c.grade && (
                    <p className="text-sm text-gray-700">Grade: {c.grade}</p>
                  )}
                  {c.score && (
                    <p className="text-sm text-gray-700">Score: {c.score}</p>
                  )}
                </div>
              </div>

              <button
                onClick={() => removeCourse(c.id)}
                className="text-red-600 border border-red-500 px-3 py-1 rounded-lg hover:bg-red-50 mt-2 md:mt-0"
              >
                حذف دوره
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
