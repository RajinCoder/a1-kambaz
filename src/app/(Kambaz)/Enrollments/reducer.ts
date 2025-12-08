/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

export type Enrollment = { _id: string; user: string; course: string };

type EnrollmentsState = { enrollments: Enrollment[] };

const initialState: EnrollmentsState = {
  enrollments: [],  // Start empty, fetch from server
};

const enrollmentsSlice = createSlice({
  name: "enrollments",
  initialState,
  reducers: {
    setEnrollments: (state, { payload }: { payload: Enrollment[] }) => {
      state.enrollments = payload;
    },
    enroll: (state, { payload }: { payload: Enrollment }) => {
      state.enrollments.push(payload);
    },
    unenroll: (state, { payload }: { payload: { user: string; course: string } }) => {
      state.enrollments = state.enrollments.filter(
        (e) => !(e.user === payload.user && e.course === payload.course)
      );
    },
  },
});

export const { setEnrollments, enroll, unenroll } = enrollmentsSlice.actions;
export default enrollmentsSlice.reducer;