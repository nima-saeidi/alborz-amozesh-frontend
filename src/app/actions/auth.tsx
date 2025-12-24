// app/actions/auth.tsx
"use server";

import { AuthService } from "@/lib/api/auth";
import { redirect } from "next/navigation";

interface LoginFormData {
  email: string;
  password: string;
}

interface RegisterFormData {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  password2: string;
}

// تبدیل FormData به LoginFormData
function parseLoginForm(formData: FormData): LoginFormData | null {
  const email = formData.get("email");
  const password = formData.get("password");

  if (typeof email !== "string" || typeof password !== "string") return null;
  return { email, password };
}

// تبدیل FormData به RegisterFormData
function parseRegisterForm(formData: FormData): RegisterFormData | null {
  const first_name = formData.get("first_name");
  const last_name = formData.get("last_name");
  const email = formData.get("email");
  const password = formData.get("password");
  const password2 = formData.get("password2");

  if (
    typeof first_name !== "string" ||
    typeof last_name !== "string" ||
    typeof email !== "string" ||
    typeof password !== "string" ||
    typeof password2 !== "string"
  )
    return null;

  return { first_name, last_name, email, password, password2 };
}

export async function loginAction(_prevState: unknown, formData: FormData) {
  const data = parseLoginForm(formData);
  if (!data)
    return { success: false, error: "Email and password are required" };
  console.log("Login Data:", data);
  const result = await AuthService.login(data);
  console.log("Login Result:", result);

  if (result.success) redirect("/dashboard");
  return result;
}

export async function registerAction(_prevState: unknown, formData: FormData) {
  const data = parseRegisterForm(formData);
  if (!data)
    return { success: false, error: "Please enter all required fields" };

  console.log("Register Data:", data);
  const result = await AuthService.register(data);
  console.log("Register Result:", result);

  if (result.success) {
    const loginResult = await AuthService.login({
      email: data.email,
      password: data.password,
    });
    console.log("Auto Login Result:", loginResult);

    if (loginResult.success) redirect("/dashboard");
  }

  return result;
}

export async function logoutAction() {
  await AuthService.logoutServer();
  redirect("/");
}
