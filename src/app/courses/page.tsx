// app/courses/page.tsx
"use client";

import { useEffect, useState } from "react";
import CourseCard from "@/components/ui/course-card";

interface Course {
  id: number;
  title: string;
  short_description?: string;
  description?: string;
  cost?: string;
  discount_price?: string;
  start_date?: string;
  end_date?: string;
  total_students?: string;
  rating_avg?: string;
  teacher?: number;
  logo?: string;
}

export default function CoursesListPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await fetch("/api/courses/");
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

        const data: { results: Course[] } = await res.json();
        console.log(data);

        const formattedCourses: Course[] = (data.results || []).map(
          (course) => ({
            id: course.id,
            title: course.title || "بدون عنوان",
            short_description: course.short_description,
            description: course.description,
            cost: course.cost,
            discount_price: course.discount_price,
            start_date: course.start_date,
            end_date: course.end_date,
            total_students: course.total_students,
            rating_avg: course.rating_avg,
            teacher: course.teacher,
            logo: course.logo,
          })
        );

        // fallback اگر داده‌ای خالی بود
        if (formattedCourses.length === 0) {
          setCourses([
            {
              id: 1,
              title: "دوره تستی هوش مصنوعی",
              short_description: "این یک دوره تستی است",
              description: "توضیحات کامل دوره تستی",
              cost: "1000000",
              discount_price: "900000",
              start_date: "1402-09-13",
              end_date: "1402-09-14",
              total_students: "20",
              rating_avg: "4.5",
              teacher: 1,
              logo: "https://via.placeholder.com/300x150",
            },
          ]);
        } else {
          setCourses(formattedCourses);
        }
      } catch (err) {
        console.error("Error fetching courses:", err);
        // fallback وقتی fetch شکست خورد
        setCourses([
          {
            id: 1,
            title: "دوره تستی هوش مصنوعی",
            short_description: "این یک دوره تستی است",
            description: "توضیحات کامل دوره تستی",
            cost: "1000000",
            discount_price: "900000",
            start_date: "1402-09-13",
            end_date: "1402-09-14",
            total_students: "20",
            rating_avg: "4.5",
            teacher: 1,
            logo: "https://via.placeholder.com/300x150",
          },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  if (loading) return <div className="p-4">در حال بارگذاری دوره‌ها...</div>;

  return (
    <div className="my-[50px] mb-10 grow grid justify-items-center grid-flow-row grid-cols-[repeat(auto-fit,minmax(362px,1fr))] gap-x-8 gap-y-9">
      {courses.map((course) => (
        <CourseCard
          key={course.id}
          id={course.id}
          title={course.title}
          description={course.short_description || ""}
        />
      ))}
    </div>
  );
}
