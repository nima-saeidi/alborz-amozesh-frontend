// types/course.ts
export interface CourseSession {
  id: number;
  title: string;
  description?: string;
  video?: string;
  pdf?: string;
  created_at?: string;
}

export interface TeacherCourse {
  id: number;
  title: string;
  description?: string;
  short_description?: string;
  category?: string;
  level?: string;
  cost?: string;
  discount_price?: string;
  logo?: string;
  tags?: string;
  requirements?: string;
  teacher: number;
  sessions: CourseSession[];
  total_students?: string;
  start_date?: string;
  end_date?: string;
  limit_students?: number;
  rating_avg?: string;
}

export interface CourseStudent {
  id: number;
  full_name: string;
  email: string;
}
