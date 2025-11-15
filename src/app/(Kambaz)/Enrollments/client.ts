/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";

const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;
const COURSES_API = `${HTTP_SERVER}/api/courses`;
const ENROLLMENTS_API = `${HTTP_SERVER}/api/enrollments`;

export const enrollInCourse = async (courseId: string, enrollment: any) => {
  const { data } = await axios.post(`${COURSES_API}/${courseId}/enrollments`, enrollment);
  return data;
};

export const findEnrollmentsForCourse = async (courseId: string) => {
  const { data } = await axios.get(`${COURSES_API}/${courseId}/enrollments`);
  return data;
};

export const findEnrollmentsForUser = async (userId: string) => {
  const { data } = await axios.get(`${HTTP_SERVER}/api/users/${userId}/enrollments`);
  return data;
};

export const deleteEnrollment = async (enrollmentId: string) => {
  const { data } = await axios.delete(`${ENROLLMENTS_API}/${enrollmentId}`);
  return data;
};
