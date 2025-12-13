// src/app/dashboard/my-courses/[courseId]/edit/page.tsx

"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import ImageUpload from "@/components/image-upload";
import { useRouter } from "next/navigation";

// تعریف تایپ برای Course
interface Course {
  id: number;
  title: string;
  description?: string;
  short_description?: string;
  category?: string;
  level?: string;
  cost?: string;
  discount_price?: string;
  tags?: string;
  requirements?: string;
  start_date?: string;
  end_date?: string;
  limit_students?: number;
  rating_avg?: string;
  logo?: string | null;
  teacher: number;
}



export default function EditCoursePage({ params }: { params: { courseId: string } }) {
  const router = useRouter();
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [category, setCategory] = useState("");
  const [level, setLevel] = useState("");
  const [cost, setCost] = useState("");
  const [discountPrice, setDiscountPrice] = useState("");
  const [tags, setTags] = useState("");
  const [requirements, setRequirements] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [limitStudents, setLimitStudents] = useState<number | undefined>();
  const [ratingAvg, setRatingAvg] = useState("");
  const [logo, setLogo] = useState<string | null>(null);

  // دریافت اطلاعات دوره
  const fetchCourse = async () => {
    if (!token) return;
    try {
      const res = await fetch(
        `http://185.208.175.233:5000/teacher/courses/${params.courseId}/`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const data: Course = await res.json();
      setCourse(data);

      setTitle(data.title || "");
      setDescription(data.description || "");
      setShortDescription(data.short_description || "");
      setCategory(data.category || "");
      setLevel(data.level || "");
      setCost(data.cost || "");
      setDiscountPrice(data.discount_price || "");
      setTags(data.tags || "");
      setRequirements(data.requirements || "");
      setStartDate(data.start_date || "");
      setEndDate(data.end_date || "");
      setLimitStudents(data.limit_students);
      setRatingAvg(data.rating_avg || "");
      setLogo(data.logo || null);

      setLoading(false);
    } catch (err) {
      console.error(err);
      alert("خطا در دریافت اطلاعات دوره ❌");
    }
  };

  useEffect(() => {
    fetchCourse();
  }, []);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!course) return;

    const payload: Course = {
      id: course.id,
      title,
      description,
      short_description: shortDescription,
      category,
      level,
      cost,
      discount_price: discountPrice,
      tags,
      requirements,
      start_date: startDate,
      end_date: endDate,
      limit_students: limitStudents,
      rating_avg: ratingAvg,
      logo,
      teacher: course.teacher
    };

    try {
      const res = await fetch(
        `http://185.208.175.233:5000/teacher/courses/${params.courseId}/update/`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify(payload)
        }
      );

      if (res.ok) {
        alert("دوره با موفقیت به‌روز شد ✅");
        router.push(`/dashboard/my-courses/${params.courseId}`);
      } else {
        const err = await res.json();
        console.error(err);
        alert("خطا در به‌روز رسانی ❌");
      }
    } catch (err) {
      console.error(err);
      alert("خطا در اتصال به سرور ❌");
    }
  };

  const handleDelete = async () => {
    if (!confirm("آیا مطمئن هستید می‌خواهید این دوره را حذف کنید؟")) return;
    if (!token) return;

    try {
      const res = await fetch(
        `http://185.208.175.233:5000/teacher/courses/${params.courseId}/delete/`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      if (res.status === 204) {
        alert("دوره با موفقیت حذف شد ✅");
        router.push("/dashboard/my-courses");
      }
    } catch (err) {
      console.error(err);
      alert("خطا در حذف دوره ❌");
    }
  };

  if (loading) return <div>در حال بارگذاری...</div>;

  return (
    <form className="flex flex-col gap-4 p-4" onSubmit={handleUpdate}>
      <h1 className="text-xl font-bold">ویرایش دوره</h1>

      <Label>عنوان</Label>
      <Input value={title} onChange={e => setTitle(e.target.value)} required />

      <Label>توضیحات</Label>
      <textarea
        className="border rounded-md p-2 w-full"
        value={description}
        onChange={e => setDescription(e.target.value)}
      />

      <Label>توضیح کوتاه</Label>
      <Input value={shortDescription} onChange={e => setShortDescription(e.target.value)} />

      <Label>دسته‌بندی</Label>
      <Input value={category} onChange={e => setCategory(e.target.value)} />

      <Label>سطح</Label>
      <Input value={level} onChange={e => setLevel(e.target.value)} />

      <Label>قیمت</Label>
      <Input type="number" value={cost} onChange={e => setCost(e.target.value)} />

      <Label>قیمت تخفیف</Label>
      <Input type="number" value={discountPrice} onChange={e => setDiscountPrice(e.target.value)} />

      <Label>تگ‌ها (با کاما جدا کنید)</Label>
      <Input value={tags} onChange={e => setTags(e.target.value)} />

      <Label>پیش‌نیازها</Label>
      <Input value={requirements} onChange={e => setRequirements(e.target.value)} />

      <Label>تاریخ شروع</Label>
      <Input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} />

      <Label>تاریخ پایان</Label>
      <Input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} />

      <Label>حداکثر دانشجو</Label>
      <Input
        type="number"
        value={limitStudents || ""}
        onChange={e => setLimitStudents(Number(e.target.value))}
      />

      <Label>امتیاز متوسط</Label>
      <Input value={ratingAvg} onChange={e => setRatingAvg(e.target.value)} />

      <Label>لوگو دوره</Label>
      <ImageUpload
        initialImage={logo || undefined}
        onFileSelect={file => setLogo(file ? URL.createObjectURL(file) : null)}
      />

      <div className="flex gap-2">
        <Button type="submit">به‌روز رسانی دوره</Button>
        <Button type="button" variant="destructive" onClick={handleDelete}>
          حذف دوره
        </Button>
      </div>
    </form>
  );
}
