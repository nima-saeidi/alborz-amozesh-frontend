const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
import {
    getCourseRequestSchema,
    getCourseRequestSchemaType,
    getCourseResponseSchema,
    getCourseResponseSchemaType,
    getAllCoursesRequestSchema,
    getAllCoursesRequestSchemaType,
    getAllCoursesResponseSchema,
    getAllCoursesResponseSchemaType,
    getCourseSessionsRequestSchema,
    getCourseSessionsRequestSchemaType,
    getCourseSessionsResponseSchema,
    getCourseSessionsResponseSchemaType

} from "./schemas/courses.schema"


export class CourseService {
    // /courses/{id}/
    static async getCourse({id}: getCourseRequestSchemaType): Promise<getCourseResponseSchemaType> {
        const parsed = getCourseRequestSchema.parse({id});

        const res = await fetch(`${API_URL}/courses/${parsed.id}/`);
        if (!res.ok) throw new Error("Failed to fetch course");
        return res.json();
    }
    // /courses/?page=&page_size
    static async getAllCourses({page, page_size}: getAllCoursesRequestSchemaType): Promise<getAllCoursesResponseSchemaType> {
        const parsed = getAllCoursesRequestSchema.parse({page, page_size});
        const res = await fetch(`${API_URL}/courses/?${new URLSearchParams({
            page: parsed.page.toString(),
            page_size: parsed.page_size.toString(),
        }).toString()}`);
        if (!res.ok) throw new Error("Failed to fetch all courses");
        return res.json();
    }
    // /courses/{course_id}/sessions/?page=&page_size
    static async getCourseSessions({page, page_size, course_id}: getCourseSessionsRequestSchemaType): Promise<getCourseSessionsResponseSchemaType> {
        const parsed = getCourseSessionsRequestSchema.parse({page, page_size, course_id});
        const res = await fetch(`${API_URL}/courses/${parsed.course_id}/sessions/?${new URLSearchParams({
            page: parsed.page.toString(),
            page_size: parsed.page_size.toString(),
        }).toString()}`);
        if (!res.ok) throw new Error("Failed to fetch course sessions");
        return res.json();
    }
}
