/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";

const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;
const COURSES_API = `${HTTP_SERVER}/api/courses`;
const ENROLLMENTS_API = `${HTTP_SERVER}/api/enrollments`;

export const enrollInCourse = async (courseId: string, userId: string) => {
  const { data } = await axios.post(`${COURSES_API}/${courseId}/enrollments`, { user: userId });
  return data;
};

export const unenrollFromCourse = async (enrollmentId: string) => {
  const { data } = await axios.delete(`${ENROLLMENTS_API}/${enrollmentId}`);
  return data;
};

export const findEnrollmentsForUser = async (userId: string) => {
  const { data } = await axios.get(`${HTTP_SERVER}/api/users/${userId}/enrollments`);
  return data;
};

export const findEnrollmentsForCourse = async (courseId: string) => {
  const { data } = await axios.get(`${COURSES_API}/${courseId}/enrollments`);
  return data;
};