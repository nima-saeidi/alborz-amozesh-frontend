// app/dashboard/profile/page.tsx

"use client";

import { useEffect, useState, FormEvent } from "react";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { BirthDatePicker } from "@/components/birth-date-picker";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ImageUpload from "@/components/image-upload";
import { Button } from "@/components/ui/button";

// تعریف نوع داده پروفایل
interface UserProfile {
  first_name: string;
  last_name: string;
  email: string;
  birthday_date?: string;
  national_id?: string;
  gender?: string;
  fathers_name?: string;
  education_level?: string;
  profile_image?: string;
}

export default function ProfilePage() {
  const [profile, setProfile] = useState<UserProfile>({
    first_name: "",
    last_name: "",
    email: "",
    birthday_date: "",
    national_id: "",
    gender: "",
    fathers_name: "",
    education_level: "",
    profile_image: "",
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedDate, setSelectedDate] = useState<string | undefined>(
    undefined
  );

  // بارگذاری اطلاعات پروفایل
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch("http://185.208.175.233:5000/profile/");
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        const data: UserProfile = await res.json();
        setProfile(data);
        setSelectedDate(data.birthday_date);
      } catch (err) {
        console.error("Error fetching profile:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  // هندل submit فرم
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const formData = new FormData(e.currentTarget);
      if (selectedFile) formData.append("profile_image", selectedFile);
      if (selectedDate) formData.set("birthday_date", selectedDate);

      const res = await fetch(
        "http://185.208.175.233:5000/profile/update/",
        {
          method: "PUT",
          body: formData,
        }
      );
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      const data = await res.json();
      console.log("Profile updated:", data);
      alert("پروفایل با موفقیت به‌روزرسانی شد!");
    } catch (err) {
      console.error("Error updating profile:", err);
      alert("خطا در به‌روزرسانی پروفایل!");
    }
  };

  if (loading) return <div>در حال بارگذاری پروفایل...</div>;

  return (
    <div className="flex flex-1 flex-col gap-4 p-4">
      <form className="p-6 md:p-8" onSubmit={handleSubmit}>
        <FieldGroup className="flex flex-col gap-10">
          <div className="flex flex-col lg:flex-row-reverse gap-8">
            <div className="flex justify-center items-center">
              <ImageUpload
                initialImage={profile.profile_image}
                onFileSelect={setSelectedFile}
              />
            </div>
            <Separator orientation="vertical" color="black" />
            <div className="grow flex flex-col gap-4">
              <Field>
                <FieldLabel className="flex-row-reverse" htmlFor="first_name">
                  نام
                </FieldLabel>
                <Input
                  className="text-right"
                  id="first_name"
                  name="first_name"
                  type="text"
                  placeholder="علی"
                  required
                  defaultValue={profile.first_name}
                />
              </Field>
              <Field>
                <FieldLabel className="flex-row-reverse" htmlFor="last_name">
                  نام خانوادگی
                </FieldLabel>
                <Input
                  className="text-right"
                  id="last_name"
                  name="last_name"
                  type="text"
                  placeholder="محمدی"
                  required
                  defaultValue={profile.last_name}
                />
              </Field>
              <Field>
                <FieldLabel className="flex-row-reverse" htmlFor="national_id">
                  کد ملی
                </FieldLabel>
                <Input
                  className="text-right"
                  id="national_id"
                  name="national_id"
                  type="text"
                  placeholder="۱۲۳۴۵۶۷۸۹۰"
                  defaultValue={profile.national_id}
                />
              </Field>
              <Field>
                <FieldLabel className="flex-row-reverse" htmlFor="fathers_name">
                  نام پدر
                </FieldLabel>
                <Input
                  className="text-right"
                  id="fathers_name"
                  name="fathers_name"
                  type="text"
                  placeholder="مجید محمدی"
                  defaultValue={profile.fathers_name}
                />
              </Field>
            </div>
            <Separator orientation="vertical" color="black" />
            <div className="grow flex flex-col gap-4">
              <Field>
                <FieldLabel className="flex-row-reverse" htmlFor="birthday_date">
                  تاریخ تولد
                </FieldLabel>
                <BirthDatePicker
                  defaultValue={profile.birthday_date}
                  name="birthday_date"
                  onDateSelect={setSelectedDate}
                />
              </Field>
              <Field>
                <FieldLabel className="flex-row-reverse" htmlFor="gender">
                  جنسیت
                </FieldLabel>
                <Select defaultValue={profile.gender}>
                  <SelectTrigger
                    id="gender"
                    name="gender"
                    className="w-[180px] text-right"
                  >
                    <SelectValue placeholder="جنسیت" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">مذکر</SelectItem>
                    <SelectItem value="female">مونث</SelectItem>
                  </SelectContent>
                </Select>
              </Field>
              <Field>
                <FieldLabel
                  className="flex-row-reverse"
                  htmlFor="education_level"
                >
                  تحصیلات
                </FieldLabel>
                <Select defaultValue={profile.education_level}>
                  <SelectTrigger
                    id="education_level"
                    name="education_level"
                    className="w-[180px] text-right"
                  >
                    <SelectValue placeholder="سطح تحصیلات" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="high_school_diploma">دیپلم</SelectItem>
                    <SelectItem value="bachelors">کارشناسی</SelectItem>
                    <SelectItem value="masters">کارشناسی ارشد</SelectItem>
                    <SelectItem value="doctorate">دکتری</SelectItem>
                  </SelectContent>
                </Select>
              </Field>
              <Field>
                <FieldLabel className="flex-row-reverse" htmlFor="email">
                  ایمیل
                </FieldLabel>
                <Input
                  className="text-right"
                  id="email"
                  name="email"
                  type="email"
                  placeholder="mail@mail.com"
                  required
                  defaultValue={profile.email}
                />
              </Field>
            </div>
          </div>
          <Field orientation="horizontal" className="flex justify-center">
            <Button className="w-full lg:w-1/2" size="lg" type="submit">
              ذخیره تغییرات
            </Button>
          </Field>
        </FieldGroup>
      </form>
    </div>
  );
}
