/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice } from "@reduxjs/toolkit";
import { enrollments as dbEnrollments } from "../Database";
import { v4 as uuidv4 } from "uuid";

export type Enrollment = { _id: string; user: string; course: string };

type EnrollmentsState = { enrollments: Enrollment[] };

const initialState: EnrollmentsState = {
  enrollments: (dbEnrollments as any[]).map((e: any) => ({
    _id: e._id?.toString() ?? uuidv4(),
    user: e.user,
    course: e.course,
  })),
};

const enrollmentsSlice = createSlice({
  name: "enrollments",
  initialState,
  reducers: {
    enroll: (state, { payload }: { payload: { user: string; course: string } }) => {
      const exists = state.enrollments.some(
        (e) => e.user === payload.user && e.course === payload.course
      );
      if (!exists) {
        state.enrollments.push({ _id: uuidv4(), user: payload.user, course: payload.course });
      }
    },
    unenroll: (state, { payload }: { payload: { user: string; course: string } }) => {
      state.enrollments = state.enrollments.filter(
        (e) => !(e.user === payload.user && e.course === payload.course)
      );
    },
  },
});

export const { enroll, unenroll } = enrollmentsSlice.actions;
export default enrollmentsSlice.reducer;
