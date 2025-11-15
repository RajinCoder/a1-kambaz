/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  modules: [] as any[],
};

const modulesSlice = createSlice({
  name: "modules",
  initialState,
  reducers: {
    setModules: (state, action) => {
      state.modules = action.payload;
    },
    addModule: (state, action) => {
      state.modules.push(action.payload);
    },
    deleteModule: (state, action) => {
      state.modules = state.modules.filter(
        (m: any) => m._id !== action.payload
      );
    },
    updateModule: (state, action) => {
      state.modules = state.modules.map((m: any) =>
        m._id === action.payload._id ? action.payload : m
      );
    },
    editModule: (state, action) => {
      state.modules = state.modules.map((m: any) =>
        m._id === action.payload._id
          ? { ...m, editing: action.payload.editing }
          : m
      );
    },
  },
});

export const { addModule, deleteModule, updateModule, editModule, setModules } =
  modulesSlice.actions;
export default modulesSlice.reducer;
