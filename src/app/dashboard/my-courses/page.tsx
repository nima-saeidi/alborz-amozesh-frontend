//  app/dashboard/my-courses/page.tsx
"use client";

import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { teacherCoursesService } from "@/services/courses/courses.service";
import { TeacherCourse } from "@/types/course";

export default function MyCoursesPage() {
  const [teacherCourses, setTeacherCourses] = useState<TeacherCourse[]>([]);
  const [teacherLoading, setTeacherLoading] = useState(true);

  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const fetchTeacherCourses = useCallback(async () => {
    try {
      // اگر می‌خوای از سرویس axios داخلی استفاده کنی:
      const data = await teacherCoursesService.list();
      setTeacherCourses(data);

      // یا اگر می‌خوای مستقیم fetch بکنی:
      /*
      const res = await fetch("http://185.208.175.233:5000/teacher/courses/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      setTeacherCourses(data || []);
      */
    } catch (err) {
      console.error("Error fetching teacher courses:", err);
    } finally {
      setTeacherLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchTeacherCourses();
  }, [fetchTeacherCourses]);

  if (teacherLoading)
    return <div className="p-4">در حال بارگذاری...</div>;

  return (
    <div className="flex flex-1 flex-col gap-10 p-4" dir="rtl">
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
    </div>
  );
}
