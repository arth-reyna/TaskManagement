import {
  find,
  findByIdAndDelete,
  findByIdAndUpdate,
  insertOne,
} from "../utils/db.helper.js";
import { Task } from "../models/tasks.js";

export const getTasksBL = async () => {
  try {
    const data = await find({
      model: Task,
      filter: {},
    });

    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const postTaskBL = async (data) => {
  try {
    const { title, description, status } = data;
    console.log("BL Data: ", data);
    const result = await insertOne({
      model: Task,
      filter: {
        task_title: title,
        task_description: description,
        status: status,
      },
    });

    return result;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const deleteTaskBL = async (id) => {
  try {
    console.log("BL ID DELETE: ", id);
    const result = await findByIdAndDelete({
      model: Task,
      filter: { _id: id },
    });

    if (!result) throw new Error("error deleting task");

    return result;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const toggleTaskStatusBL = async (id) => {
  try {
    const result = await findByIdAndUpdate({
      model: Task,
      id: id,
      filter: [{ $set: { status: { $not: "$status" } } }],
      option: { new: true, updatePipeline: true },
    });

    return result;
  } catch (error) {
    throw new Error(error);
  }
};

export const updateTaskBL = async (id, data) => {
  try {
    const { title, description } = data;

    const result = await findByIdAndUpdate({
      model: Task,
      id: id,
      filter: {
        task_title: title,
        task_description: description,
        },
    });
    console.log(result);
    if (!result) throw new Error("Unable to update details");

    return result;
  } catch (error) {
    throw new Error({
      message: "Error updating details",
      error: error,
    });
  }
};
