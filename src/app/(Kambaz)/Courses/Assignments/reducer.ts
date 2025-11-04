/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice } from "@reduxjs/toolkit";
import { assignments as dbAssignments } from "../../Database";
import { v4 as uuidv4 } from "uuid";

export type Assignment = {
  _id: string;
  id?: string; // legacy id from db (e.g., A1)
  course: string; // course code like RS101
  title: string;
  description?: string;
  points?: number;
  dueDate?: string; // yyyy-mm-dd
  availableFrom?: string; // yyyy-mm-dd
  availableUntil?: string; // yyyy-mm-dd
  editing?: boolean;
};

type AssignmentsState = {
  assignments: Assignment[];
};

const initialState: AssignmentsState = {
  assignments: (dbAssignments as any[]).map((a: any) => ({
    _id: uuidv4(),
    id: a.id,
    course: a.course,
    title: a.title,
    description: a.description,
    points: a.points,
    dueDate: a.dueDate,
    availableFrom: a.availableDate, // map DB availableDate -> availableFrom
  })),
};

const assignmentsSlice = createSlice({
  name: "assignments",
  initialState,
  reducers: {
    addAssignment: (state, { payload }) => {
      const newAssignment: Assignment = {
        _id: uuidv4(),
        course: payload.course,
        title: payload.title ?? payload.name ?? "New Assignment",
        description: payload.description ?? "",
        points: Number(payload.points ?? 0),
        dueDate: payload.dueDate ?? "",
        availableFrom: payload.availableFrom ?? "",
        availableUntil: payload.availableUntil ?? "",
      };
      state.assignments = [...state.assignments, newAssignment];
    },
    deleteAssignment: (state, { payload: assignmentId }) => {
      state.assignments = state.assignments.filter((a) => a._id !== assignmentId);
    },
    updateAssignment: (state, { payload: assignment }) => {
      state.assignments = state.assignments.map((a) =>
        a._id === assignment._id ? { ...a, ...assignment } : a
      );
    },
    editAssignment: (state, { payload: assignmentId }) => {
      state.assignments = state.assignments.map((a) =>
        a._id === assignmentId ? { ...a, editing: true } : a
      );
    },
  },
});

export const { addAssignment, deleteAssignment, updateAssignment, editAssignment } =
  assignmentsSlice.actions;
export default assignmentsSlice.reducer;
