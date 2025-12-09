// app/dashboard/my-courses/[courseId]/page.tsx

"use client";

import { useEffect, useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { BadgeCheck, Play } from "lucide-react";
import { Separator } from "@/components/ui/separator";

interface Session {
  id: number;
  title: string;
  description?: string;
}

interface Course {
  id: number;
  title: string;
  description?: string;
  sessions: Session[];
}

interface Invoice {
  course: number;
  course_title: string;
  paid: boolean;
  grade?: string;
  score?: string;
}

function SessionCard({ title, isCompleted }: { title: string; isCompleted: boolean }) {
  return (
    <div className="h-16 w-full flex flex-row-reverse gap-4 justify-between items-center p-4 hover:bg-gray-300 cursor-pointer select-none">
      <p dir="rtl" className="text-right w-[100px] truncate flex-1/2 shrink min-w-0">
        {title}
      </p>
      {isCompleted ? <BadgeCheck className="flex-shrink-0" /> : null}
    </div>
  );
}

export default function CoursePage({ params }: { params: { courseId: string } }) {
  const [course, setCourse] = useState<Course | null>(null);
  const [invoice, setInvoice] = useState<Invoice | null>(null);
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

  // دریافت اطلاعات دوره
  const fetchCourse = async () => {
    try {
      const res = await fetch(`http://185.208.175.233:5000/courses/${params.courseId}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      setCourse(data);
    } catch (err) {
      console.error("Error fetching course:", err);
    }
  };

  // دریافت اطلاعات ثبت‌نام دانشجو برای این دوره
  const fetchInvoice = async () => {
    try {
      const res = await fetch(`http://185.208.175.233:5000/student/invoices/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      const courseInvoice = data.results.find((i: Invoice) => i.course === parseInt(params.courseId));
      setInvoice(courseInvoice || null);
    } catch (err) {
      console.error("Error fetching invoices:", err);
    }
  };

  useEffect(() => {
    fetchCourse();
    fetchInvoice();
  }, []);

  if (!course) return <div className="p-4">در حال بارگذاری...</div>;

  return (
    <div className="h-full flex flex-col md:flex-row md:justify-between gap-10 p-4">
      <ScrollArea className="w-full md:min-w-2/12 md:w-3/12 md:max-w-md h-[400px] md:h-[600px] bg-gray-100 border rounded-[10px]">
        {course.sessions?.map((s, i) => (
          <div key={s.id}>
            {/* اگر دانشجو ثبت‌نام کرده → نمایش تکمیل */}
            <SessionCard title={s.title} isCompleted={!!invoice?.paid} />
            <Separator orientation="horizontal" />
          </div>
        ))}
      </ScrollArea>

      <div className="w-full md:w-9/12 h-[200px] md:h-[450px] border rounded-[10px] contain-content">
        <div className="w-full h-full flex justify-center items-center">
          <Play size={60} fill="gray-100" className="cursor-pointer" />
        </div>
      </div>
    </div>
  );
}
