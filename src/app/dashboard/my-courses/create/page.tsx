// src/app/dashboard/my-courses/create/page.tsx
"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import ImageUpload from "@/components/image-upload";
import { useRouter } from "next/navigation";

// اینجا اینترفیس CreateCoursePayload را قرار دادیم
interface CreateCoursePayload {
  title: string;
  description?: string;
  short_description?: string;
  category?: string;
  level?: string;
  cost?: string;
  discount_price?: string;
  tags?: string; // کاما جدا شده
  requirements?: string;
  start_date?: string; // YYYY-MM-DD
  end_date?: string;   // YYYY-MM-DD
  limit_students?: number;
  rating_avg?: string;
  logo?: string | null; // URL یا base64
  teacher: number; // شناسه مدرس
}

export default function CreateCoursePage() {
  const router = useRouter();
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload: CreateCoursePayload = {
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
      teacher: 1 // اگر شناسه مدرس ثابت است، در غیر اینصورت از token decode کنید
    };

    try {
      const res = await fetch("http://185.208.175.233:5000/teacher/courses/create/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        alert("دوره با موفقیت ایجاد شد ✅");
        router.push("/dashboard/my-courses");
      } else {
        const err = await res.json();
        console.error(err);
        alert("خطا در ایجاد دوره ❌");
      }
    } catch (err) {
      console.error(err);
      alert("خطا در اتصال به سرور ❌");
    }
  };

  return (
    <form className="flex flex-col gap-4 p-4" onSubmit={handleSubmit}>
      <h1 className="text-xl font-bold">ایجاد دوره جدید</h1>

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
      <ImageUpload initialImage={logo || undefined} onFileSelect={file => setLogo(file ? URL.createObjectURL(file) : null)} />

      <Button type="submit">ایجاد دوره</Button>
    </form>
  );
}
