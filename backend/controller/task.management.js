import {
  deleteTaskBL,
  getTasksBL,
  postTaskBL,
  toggleTaskStatusBL,
  updateTaskBL,
} from "../services/task.management.bl.js";

//Get Tasks
export const getTasks = async (req, res, next) => {
  try {
    const result = await getTasksBL();

    return res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const postTask = async (req, res, next) => {
  try {
    const data = req.body;
    console.log("Controller Data: ", data);

    const result = await postTaskBL(data);
    return res.status(201).json({
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteTask = async (req, res, next) => {
  try {
    const id = req.params.id;
    console.log("ID: ",id);
    const result = await deleteTaskBL(id);

    return res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const toggleTaskStatus = async (req, res, next) => {
  try {
    const id = req.params.id;

    const result = await toggleTaskStatusBL(id);

    return res.status(203).json({
      success: true,
      message: "toggled status sucessfully",
      data: result
    })
  } catch (error) {
    next(error)
  }
}

export const updateTask = async (req, res, next) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const result = await updateTaskBL(id, data);

    return res.status(200).json({
      success: true,
      message: "Task updated sucessfully",
      data: result
    });
  } catch (error) {
    next(error);
  }
}