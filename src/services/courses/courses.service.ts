// src/services/courses/courses.service.ts
import axiosInstance from "@/lib/axiosInstance";
import { TeacherCourse, CourseStudent } from "@/types/course";

export const teacherCoursesService = {
  list: async (): Promise<TeacherCourse[]> => {
    const res = await axiosInstance.get<TeacherCourse[]>("/teacher/courses/");
    return res.data;
  },

  create: async (data: Omit<TeacherCourse, "id" | "sessions" | "total_students">) => {
    const res = await axiosInstance.post("/teacher/courses/create/", data);
    return res.data;
  },

  detail: async (courseId: string | number): Promise<TeacherCourse> => {
    const res = await axiosInstance.get<TeacherCourse>(`/teacher/courses/${courseId}/`);
    return res.data;
  },

  update: async (courseId: string | number, data: Partial<TeacherCourse>) => {
    const res = await axiosInstance.put(`/teacher/courses/${courseId}/update/`, data);
    return res.data;
  },

  delete: async (courseId: string | number) => {
    return axiosInstance.delete(`/teacher/courses/${courseId}/delete/`);
  },

  students: async (courseId: string | number): Promise<CourseStudent[]> => {
    const res = await axiosInstance.get<CourseStudent[]>(`/teacher/courses/${courseId}/students/`);
    return res.data;
  },
};
