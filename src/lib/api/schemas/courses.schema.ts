import z from 'zod';

export const getCourseRequestSchema = z.object({
    id: z.number(),
});
export type getCourseRequestSchemaType = z.infer<typeof getCourseRequestSchema>;

export const getCourseResponseSchema = z.object({
    id: z.number(),
    title: z.string(),
    description: z.string().optional(),
    short_description: z.string().optional(),
    category: z.string().optional(),
    level: z.string().optional(),
    cost: z.string().optional(),
    discount_price: z.string().optional(),
    logo: z.string().optional(),
    tags: z.string().optional(),
    requirements: z.string().optional(),
    teacher: z.number(),
    sessions: z.object({
        id: z.number(),
        title: z.string(),
        description: z.string().optional(),
        video: z.string().optional(),
        pdf: z.string().optional(),
        created_at: z.string().optional(),
    }),
    total: z.string().optional(),
    start_date: z.string().optional(),
    end_date: z.string().optional(),
    limit_students: z.string().optional(),
    rating_avg: z.string().optional(),
});
export type getCourseResponseSchemaType = z.infer<typeof getCourseResponseSchema>;

export const getAllCoursesRequestSchema = z.object({
    page: z.number(),
    page_size: z.number(),
});
export type getAllCoursesRequestSchemaType = z.infer<typeof getAllCoursesRequestSchema>;

export const getAllCoursesResponseSchema = z.object({
    count: z.number(),
    next: z.string().optional(),
    previous: z.string().optional(),
    results: z.array(z.object({
        id: z.string().optional(),
        title: z.string(),
        description: z.string().optional(),
        short_description: z.string().optional(),
        category: z.string().optional(),
        level: z.string().optional(),
        cost: z.string().optional(),
        discount_price: z.string().optional(),
        logo: z.string().optional(),
        tags: z.string().optional(),
        requirements: z.string().optional(),
        teacher: z.string(),
        sessions: z.array(z.object({
            id: z.string().optional(),
            title: z.string(),
            description: z.string().optional(),
            video: z.string().optional(),
            pdf: z.string().optional(),
            created_at: z.string().optional(),
        })),
        total_students: z.string().optional(),
        start_date: z.string().optional(),
        end_date: z.string().optional(),
        limit_students: z.string().optional(),
        rating_avg: z.string().optional(),
    })),
});
export type getAllCoursesResponseSchemaType = z.infer<typeof getAllCoursesResponseSchema>;

export const getCourseSessionsRequestSchema = z.object({
    page: z.number(),
    page_size: z.number(),
    course_id: z.string(),
});
export type getCourseSessionsRequestSchemaType = z.infer<typeof getCourseSessionsRequestSchema>;

export const getCourseSessionsResponseSchema = z.object({
    count: z.number(),
    next: z.string().optional(),
    previous: z.string().optional(),
    results: z.array(z.object({
        id: z.string().optional(),
        title: z.string(),
        description: z.string().optional(),
        video: z.string().optional(),
        pdf: z.string().optional(),
        created_at: z.string().optional(),
    }))
});
export type getCourseSessionsResponseSchemaType = z.infer<typeof getCourseSessionsResponseSchema>;