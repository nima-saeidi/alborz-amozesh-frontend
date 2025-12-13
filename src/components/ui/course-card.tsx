// src/components/ui/course-card.tsx

import React from "react";

import Image from "next/image";

import { Separator } from "@/components/ui/separator";
import Link from "next/link";

interface CourseCardProps {
  id: number;
  title: string;
  description?: string;
  short_description?: string;
  category?: string;
  level?: string;
  cost?: string;
  discount_price?: string;
  rating_avg?: string;
  total_students?: string;
  logo?: string; // ✅ از Swagger
}

const CourseCard: React.FC<CourseCardProps> = ({
  id,
  title,
  description,
  short_description,
  category,
  level,
  cost,
  discount_price,
  rating_avg,
  total_students,
  logo,
}) => {
  return (
    // ✅ اصلاح مسیر
    <Link href={`/dashboard/my-courses/${id}`}>
      <article className="group w-[362px] rounded-[10px] overflow-hidden border hover:border-[#FF8E50]">
        <div className="relative h-[180px] m-2 border rounded overflow-hidden">
          {logo ? (
            <Image
              src={logo}
              alt={title}
              fill
              className="object-cover"
            />
          ) : (
            <div className="bg-gray-200 h-full w-full flex items-center justify-center text-sm">
              بدون تصویر
            </div>
          )}
        </div>

        <header className="p-4 text-center space-y-2">
          <h2 className="text-xl font-bold">{title}</h2>
          <p className="text-gray-600">
            {short_description || description}
          </p>

          <ul className="flex justify-center gap-3 text-xs">
            <li>{level}</li>
            <Separator orientation="vertical" />
            <li>{category}</li>
            <Separator orientation="vertical" />
            <li>⭐ {rating_avg}</li>
          </ul>

          <div className="flex justify-center gap-2">
            {discount_price && (
              <span className="line-through text-gray-400">{cost}</span>
            )}
            <span className="font-bold">
              {discount_price || cost} تومان
            </span>
          </div>

          <p className="text-xs text-gray-500">
            دانشجویان: {total_students}
          </p>
        
        </header>
      
      </article>
    </Link>
  );
};

export default CourseCard;
