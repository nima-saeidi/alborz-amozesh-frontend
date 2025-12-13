// app/dashboard/my-courses/[courseId]/page.tsx
"use client";

import { useEffect, useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { BadgeCheck } from "lucide-react";
import { Separator } from "@/components/ui/separator";

/* =======================
   Swagger Models
======================= */
interface CourseSession {
  id: number;
  title: string;
  description?: string;
  video?: string;
  pdf?: string;
  created_at?: string;
}

interface CourseStudent {
  id: number;
  full_name: string;
  email: string;
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
  logo?: string; // ✅ اضافه شد
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

function SessionCard({ title }: { title: string }) {
  return (
    <div className="h-16 flex justify-between items-center p-4">
      <p>{title}</p>
      <BadgeCheck />
    </div>
  );
}

export default function CoursePage({
  params,
}: {
  params: { courseId: string };
}) {
  const [course, setCourse] = useState<TeacherCourse | null>(null);
  const [students, setStudents] = useState<CourseStudent[]>([]);

  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  /* =======================
     GET /teacher/courses/{id}
  ======================= */
  const fetchCourse = async () => {
    const res = await fetch(
      `http://185.208.175.233:5000/teacher/courses/${params.courseId}/`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    setCourse(await res.json());
  };

  /* =======================
     GET /teacher/courses/{id}/students/
  ======================= */
  const fetchStudents = async () => {
    const res = await fetch(
      `http://185.208.175.233:5000/teacher/courses/${params.courseId}/students/`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    setStudents(await res.json());
  };

  useEffect(() => {
    fetchCourse();
    fetchStudents();
  }, []);

  if (!course) return <div>در حال بارگذاری...</div>;

  return (
    <div className="flex gap-6 p-4">
      <ScrollArea className="w-4/12 border rounded">
        {course.sessions.map((s) => (
          <div key={s.id}>
            <SessionCard title={s.title} />
            <Separator />
          </div>
        ))}
      </ScrollArea>

      <div className="w-8/12 border rounded p-4 space-y-3">
        {course.logo && (
          <img
            src={course.logo}
            alt={course.title}
            className="w-full h-48 object-cover rounded"
          />
        )}

        <h1 className="text-2xl font-bold">{course.title}</h1>
        <p>{course.description}</p>

        <p>دسته‌بندی: {course.category}</p>
        <p>سطح: {course.level}</p>
        <p>قیمت: {course.cost}</p>
        <p>تخفیف: {course.discount_price}</p>
        <p>امتیاز: {course.rating_avg}</p>
        <p>شروع: {course.start_date}</p>
        <p>پایان: {course.end_date}</p>
        <p>ظرفیت: {course.limit_students}</p>
        <p>تگ‌ها: {course.tags}</p>
        <p>پیش‌نیازها: {course.requirements}</p>

        <Separator />

        <h3 className="font-bold">دانشجویان دوره</h3>
        {students.length === 0 ? (
          <p className="text-sm">دانشجویی ثبت‌نام نکرده است</p>
        ) : (
          students.map((s) => (
            <p key={s.id} className="text-sm">
              {s.full_name} – {s.email}
            </p>
          ))
        )}
      </div>
    </div>
  );
}
