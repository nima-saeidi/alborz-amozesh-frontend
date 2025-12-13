// src/app/api/courses/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { CourseService } from "@/lib/api/courses";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const page = Number(searchParams.get('page') || '1');
    const page_size = Number(searchParams.get('page_size') || '10');

    // دریافت داده‌ها از سرویس بدون map و بدون any
    const data = await CourseService.getAllCourses({ page, page_size });

    // اضافه کردن next و previous
    const response = {
      ...data,
      next: data.count > page * page_size ? `/api/courses?page=${page + 1}&page_size=${page_size}` : null,
      previous: page > 1 ? `/api/courses?page=${page - 1}&page_size=${page_size}` : null,
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('Error in GET /api/courses:', error);
    return NextResponse.json(
      {
        error: 'Failed to fetch courses',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
