import axios from "axios";
import {
  DELETE_TASKS_URL,
  GET_TASKS_URL,
  POST_TASKS_URL,
  UPDATE_TASKS_URL,
  TOGGLE_TASKS_URL,
} from "../../../constants/config";

const getAuthToken = () => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("Session expired. Please login again.");
  return token;
};

export const getAllTasksList = async () => {
  const token = getAuthToken();
  const response = await axios.get(GET_TASKS_URL, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const postTask = async (data) => {
  const token = getAuthToken();
  const response = await axios.post(POST_TASKS_URL, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const deleteTask = async (id) => {
  const token = getAuthToken();
  const response = await axios.delete(`${DELETE_TASKS_URL}/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const updateTask = async ({ id, data }) => {
  const token = getAuthToken();
  const response = await axios.put(`${UPDATE_TASKS_URL}/${id}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const toggleTask = async (id) => {
  const token = getAuthToken();
  const response = await axios.patch(
    `${TOGGLE_TASKS_URL}/${id}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return response.data;
};
