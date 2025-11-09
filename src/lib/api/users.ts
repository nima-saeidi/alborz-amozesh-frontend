import z from 'zod'
const API_URL = "http://185.208.175.233:5000"// process.env.API_URL;

//TODO add server side error handling when available
const loginSchema = z.object({
    email: z.email(),
    password: z.string()
});
type loginSchemaType = z.infer<typeof loginSchema>;
export async function login({ email, password }: loginSchemaType): Promise<loginSchemaType> {
    const parsed = loginSchema.parse({email, password});

    const res = await fetch(`${API_URL}/user/login/`,
        {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(parsed)
        });
    if (!res.ok) throw new Error("Failed to login");
    return res.json();
}

const registerSchema = z.object({
    first_name: z.string().max(150),
    last_name: z.string().max(150),
    email: z.email(),
    password: z.string(),
});
type registerSchemaType = z.infer<typeof registerSchema>;
export async function register(registerData: registerSchemaType): Promise<registerSchemaType> {
    const parsed = registerSchema.parse(registerData);

    const res = await fetch(`${API_URL}/user/register/`,
        {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(parsed)
        });
    if (!res.ok) throw new Error("Failed to register");
    return res.json();
}


const updateUserProfileSchema = z.object({
    first_name: z.string().max(150).optional(),
    last_name: z.string().max(150).optional(),
    email: z.email().optional(),
    birthday_date: z.string().optional(),
    national_id: z.string().max(20).optional(),
    gender: z.string().max(20).optional(),
    fathers_name: z.string().max(100).optional(),
    education_level: z.string().max(100).optional(),
    current_password: z.string(),

});
type updateUserProfileSchemaType = z.infer<typeof updateUserProfileSchema>;
export async function updateUserProfile(updateUserProfileData: updateUserProfileSchemaType): Promise<updateUserProfileSchemaType> {
    const parsed = updateUserProfileSchema.parse(updateUserProfileData);

    const res = await fetch(`${API_URL}/user/profile/update/`,
        {
            method: "PUT",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(parsed)
        });
    if (!res.ok) throw new Error("Failed to update profile");
    return res.json();
}
export async function updateUserProfilePartial(updateUserProfileData: updateUserProfileSchemaType): Promise<updateUserProfileSchemaType> {
    const parsed = updateUserProfileSchema.parse(updateUserProfileData);

    const res = await fetch(`${API_URL}/user/profile/update/`,
        {
            method: "PATCH",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(parsed)
        });
    if (!res.ok) throw new Error("Failed to update profile");
    return res.json();
}


// export async function getUserInformation() {
//     const res = await fetch(`${API_URL}/user/`);
//     if (!res.ok) throw new Error('Failed to fetch user info');
//     return res.json();
// }
