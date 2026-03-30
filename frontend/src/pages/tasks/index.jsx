import { useEffect, useState } from "react";
import Button from "../../components/button";
import TextBox from "../../components/text-box";
import Modal from "../../components/modal";
import EditTask from "../../components/edit-form";
import styles from "./styles.module.scss";

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [taskName, setTaskName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [error, setError] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingTaskIdx, setEditingTaskIdx] = useState(null);
  const [search, setSearch] = useState("");

  const handleAddTask = async () => {
    try {
      if (taskName.length <= 4 || taskDescription.length <= 10) {
        setError("Title must be > 4 chars and description > 10 chars.");
        return;
      }
      const result = await fetch("http://localhost:5000/api/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          title: taskName,
          description: taskDescription,
          status: true,
        }),
      });

      if (!result.ok) throw new Error("HTTP Error");

      const data = await result.json();
      console.log("data: ", data);
      console.log("Tasks: ", tasks);
      setTasks((prev) => [...prev, data.data]);

      setTaskName("");
      setTaskDescription("");
      setError(null);
    } catch (error) {
      console.error(error);
    }
  };

  const handleToggle = async (idx) => {
    const taskToToggle = tasks[idx];
    const id = taskToToggle._id;

    const result = await fetch(`http://localhost:5000/api/task/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    if (!result.ok) throw new Error("Error Updating Status");

    const data = await result.json();
    console.log("data: ", data);

    setTasks((prev) =>
      prev.map((task, i) =>
        i === idx ? { ...task, status: !task.status } : task,
      ),
    );
  };

  const handleDelete = async (idx) => {
    const taskToDelete = tasks[idx];
    const taskId = taskToDelete._id;

    const result = await fetch(`http://localhost:5000/api/task/${taskId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    if (!result.ok) throw new Error("Unable to Delete Task");

    setTasks((prev) => prev.filter((_, i) => i !== idx));
    setError(null);
  };

  useEffect(() => {
    const fetchTasks = async () => {
      const result = await fetch("http://localhost:5000/api/tasks", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!result.ok) throw new Error("Unable to fetch tasks");

      const data = await result.json();
      setTasks(data.data);
    };

    fetchTasks();
  }, []);

  const handleEdit = (idx) => {
    setEditingTaskIdx(idx);
    setIsEditModalOpen(true);
  };

  const handleEditClose = () => {
    setIsEditModalOpen(false);
    setEditingTaskIdx(null);
  };


  const handleEditSave = async (updatedData) => {
    const taskToEdit = tasks[editingTaskIdx];
    const taskId = taskToEdit._id;
    console.log("Edit Task ID: ", taskId);

    const result = await fetch(`http://localhost:5000/api/task/${taskId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(updatedData),
    });
    if (!result.ok) throw new Error("Unable to update task details");

    const fetchResponse = await fetch("http://localhost:5000/api/tasks", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    const data = await fetchResponse.json();
    setTasks(data.data);
    handleEditClose();
  };

  return (
    <>
      {/* <Navbar /> */}
      <div className={styles.page}>
        <h1>Add Task</h1>
        
        <hr />
        <div className={styles.form}>
          <div className={styles.field}>
            <label htmlFor="task-name">Task Title</label>
            <TextBox
              props={{
                name: "task-name",
                id: "task-name",
                styles: styles.input,
                value: taskName,
                onchange: (e) => setTaskName(e.target.value),
              }}
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="task-description">Task Description</label>
            <textarea
              id="task-description"
              className={styles.input}
              value={taskDescription}
              onChange={(e) => setTaskDescription(e.target.value)}
            />
          </div>

          {error && <p className={styles.error}>{error}</p>}

          <Button props={{ text: "Add Task", onClick: handleAddTask }} />
        </div>

        <div className={styles.list}>
          {tasks.length === 0 ? (
            <p>No tasks added yet.</p>
          ) : (
            
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Title</th>
                  <th>Description</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {tasks.map((task, idx) => (
                  <tr key={idx}>
                    <td>{idx + 1}</td>
                    <td>{task.task_title}</td>
                    <td>{task.task_description}</td>
                    <td>{task.status ? "Pending" : "Completed"}</td>
                    <td className={styles.actions}>
                      <Button
                        props={{
                          text: "Toggle",
                          onClick: () => handleToggle(idx),
                        }}
                      />
                      <Button
                        props={{
                          text: "Edit",
                          onClick: () => handleEdit(idx),
                        }}
                      />
                      <Button
                        props={{
                          text: "Delete",
                          onClick: () => handleDelete(idx),
                        }}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        <Modal isOpen={isEditModalOpen} onClose={handleEditClose}>
          {editingTaskIdx !== null && (
            <EditTask
              task={tasks[editingTaskIdx]}
              onClose={handleEditClose}
              onSave={handleEditSave}
            />
          )}
        </Modal>
      </div>
    </>
  );
};

export default Tasks;
