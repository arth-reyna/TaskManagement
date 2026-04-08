import { createSlice } from "@reduxjs/toolkit";
import {
  addTasks,
  getAllTasks,
  deleteTasks,
  toggleTasks,
  updateTasks,
} from "./tasksAsyncAction";

export const initialState = {
  data: [],
  isLoading: false,
  error: null,
};

export const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    clearTasksData: (state) => {
      state.data = [];
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getAllTasks.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getAllTasks.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload.data;
      })
      .addCase(getAllTasks.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(addTasks.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addTasks.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data.push(action.payload.data);
      })
      .addCase(addTasks.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(deleteTasks.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteTasks.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = state.data.filter(
          (task) => task._id !== action.payload.data._id,
        );
      })
      .addCase(deleteTasks.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(toggleTasks.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(toggleTasks.fulfilled, (state, action) => {
        state.isLoading = false;
        const updatedTask = action.payload.data;
        state.data = state.data.map((task) =>
          task._id === updatedTask._id ? updatedTask : task,
        );
      })
      .addCase(toggleTasks.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(updateTasks.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateTasks.fulfilled, (state, action) => {
        state.isLoading = false;
        const updatedTask = action.payload.data;
        state.data = state.data.map((task) =>
          task._id === updatedTask._id ? updatedTask : task,
        );
      })
      .addCase(updateTasks.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export const { clearTasksData } = tasksSlice.actions;
export default tasksSlice.reducer;
