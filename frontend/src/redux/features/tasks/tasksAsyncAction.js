import { ADD_TASK, GET_ALL_TASKS, DELETE_TASK, UPDATE_TASK, TOGGLE_TASK } from "../../../constants/asyncActionType";
import { createAsyncThunkForSlice } from "../../../utils/utils";
import { getAllTasksList, postTask, deleteTask, updateTask, toggleTask} from "./tasksCrud";

export const getAllTasks = createAsyncThunkForSlice(GET_ALL_TASKS, getAllTasksList);
export const addTasks = createAsyncThunkForSlice(ADD_TASK, postTask);
export const deleteTasks = createAsyncThunkForSlice(DELETE_TASK, deleteTask);
export const updateTasks = createAsyncThunkForSlice(UPDATE_TASK, updateTask);
export const toggleTasks = createAsyncThunkForSlice(TOGGLE_TASK, toggleTask);