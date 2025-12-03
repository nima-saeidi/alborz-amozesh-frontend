import z from 'zod'
const API_URL = "http://185.208.175.233:5000"// process.env.API_URL;

const getCourseRequestSchema = z.object({
    id: z.number(),
});
const getCourseResponseSchema = z.object({
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
type getCourseRequestSchemaType = z.infer<typeof getCourseRequestSchema>;
type getCourseResponseSchemaType = z.infer<typeof getCourseResponseSchema>;
export async function getCourse({id}: getCourseRequestSchemaType): Promise<getCourseResponseSchemaType> {
    const parsed = getCourseRequestSchema.parse({id});

    const res = await fetch(`${API_URL}/courses/${parsed.id}/`,
        {
            method: "GET",
            headers: {"Content-Type": "application/json"},
        });
    if (!res.ok) throw new Error("Failed to fetch course");
    return res.json();
}