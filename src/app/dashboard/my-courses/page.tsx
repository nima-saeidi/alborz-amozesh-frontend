//  app/dashboard/my-courses/page.tsx
"use client";

import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

/* =======================
   STUDENT (کد قبلی)
======================= */
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

/* =======================
   TEACHER (از Swagger)
======================= */
interface CourseSession {
  id: number;
  title: string;
  description?: string;
  video?: string;
  pdf?: string;
  created_at?: string;
}

interface TeacherCourse {
  id: number;
  title: string;
  description?: string;
  short_description?: string;
  category?: string;
  level?: string;
  cost?: string;
  discount_price?: string;
  logo?: string;
  tags?: string;
  requirements?: string;
  teacher: number;
  sessions: CourseSession[];
  total_students?: string;
  start_date?: string;
  end_date?: string;
  limit_students?: number;
  rating_avg?: string;
}

export default function MyCoursesPage() {
  /* ---------- STUDENT ---------- */
  const [courses, setCourses] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(true);

  /* ---------- TEACHER ---------- */
  const [teacherCourses, setTeacherCourses] = useState<TeacherCourse[]>([]);
  const [teacherLoading, setTeacherLoading] = useState(true);

  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  /* =======================
     STUDENT FETCH
  ======================= */
  const fetchCourses = useCallback(async () => {
    try {
      const res = await fetch(
        "http://185.208.175.233:5000/student/invoices/",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();
      setCourses(data.results || []);
    } catch (err) {
      console.error("Error fetching invoices:", err);
    } finally {
      setLoading(false);
    }
  }, [token]);

  /* =======================
     TEACHER FETCH
  ======================= */
  const fetchTeacherCourses = useCallback(async () => {
    try {
      const res = await fetch(
        "http://185.208.175.233:5000/teacher/courses/",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await res.json();
      setTeacherCourses(data || []);
    } catch (err) {
      console.error("Error fetching teacher courses:", err);
    } finally {
      setTeacherLoading(false);
    }
  }, [token]);

  /* =======================
     STUDENT DELETE
  ======================= */
  const removeCourse = async (_id: number) => {
    void _id; // ✅ حل Warning بدون تغییر منطق
    try {
      await fetch("http://185.208.175.233:5000/student/remove/", {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      fetchCourses();
    } catch (err) {
      console.error("Error removing course:", err);
    }
  };

  /* =======================
     EFFECT
  ======================= */
  useEffect(() => {
    fetchCourses();
    fetchTeacherCourses();
  }, [fetchCourses, fetchTeacherCourses]);

  if (loading || teacherLoading)
    return <div className="p-4">در حال بارگذاری...</div>;

  return (
    <div className="flex flex-1 flex-col gap-10 p-4" dir="rtl">
      {/* =======================
          TEACHER COURSES
      ======================= */}
      <section>
        <h2 className="text-xl font-bold mb-4">دوره‌های من (مدرس)</h2>

        <div className="grid md:grid-cols-2 gap-4">
          {teacherCourses.map((c) => (
            <div key={c.id} className="p-4 border rounded-xl bg-white">
              {c.logo && (
                <div className="relative h-32 w-full mb-2">
                  <Image
                    src={c.logo}
                    alt={c.title}
                    fill
                    className="object-cover rounded"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
              )}

              <p className="font-bold">{c.title}</p>
              <p className="text-sm text-gray-600">{c.short_description}</p>

              <div className="text-xs mt-2 space-y-1">
                <p>دسته‌بندی: {c.category}</p>
                <p>سطح: {c.level}</p>
                <p>قیمت: {c.cost}</p>
                <p>تخفیف: {c.discount_price}</p>
                <p>دانشجو: {c.total_students}</p>
                <p>امتیاز: {c.rating_avg}</p>
                <p>شروع: {c.start_date}</p>
                <p>پایان: {c.end_date}</p>
                <p>ظرفیت: {c.limit_students}</p>
                <p>تگ‌ها: {c.tags}</p>
                <p>پیش‌نیازها: {c.requirements}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =======================
          STUDENT COURSES
      ======================= */}
      <section>
        <h2 className="text-xl font-bold mb-4">دوره‌های من (دانشجو)</h2>

        {courses.length === 0 ? (
          <p>هیچ دوره‌ای ثبت‌نام نشده است.</p>
        ) : (
          <div className="flex flex-col gap-4">
            {courses.map((c) => (
              <div
                key={c.id}
                className="p-4 border rounded-xl bg-white flex justify-between"
              >
                <div>
                  <p className="font-semibold">{c.course_title}</p>
                  <p className="text-sm">دانشجو: {c.student_name}</p>
                </div>
                <button
                  onClick={() => removeCourse(c.id)}
                  className="text-red-600 border px-3 py-1 rounded"
                >
                  حذف
                </button>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
