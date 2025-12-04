import { NextRequest, NextResponse } from 'next/server';
import { CourseService } from "@/lib/api/courses";

export async function GET(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams;
        const page = searchParams.get('page') || '1';
        const page_size = searchParams.get('page_size') || '10';

        const result = await CourseService.getAllCourses({
            page: Number(page),
            page_size: Number(page_size)
        });

        return NextResponse.json(result);
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