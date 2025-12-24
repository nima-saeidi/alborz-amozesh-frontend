// src/services/courses/courses.endpoints.ts

const COURSES_BASE = "/courses";

export const coursesEndpoints = {
  // GET /courses/
  list: (page?: number, pageSize?: number) =>
    `${COURSES_BASE}/?page=${page ?? 1}&page_size=${pageSize ?? 10}`,

  // GET /courses/{id}/
  detail: (id: number | string) =>
    `${COURSES_BASE}/${id}/`,

  // GET /courses/{course_id}/sessions/
  sessions: (courseId: number | string, page?: number, pageSize?: number) =>
    `${COURSES_BASE}/${courseId}/sessions/?page=${page ?? 1}&page_size=${pageSize ?? 10}`,
};
