import { useState } from "react";
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

  const handleAddTask = () => {
    if (taskName.length <= 4 || taskDescription.length <= 10) {
      setError("Title must be > 4 chars and description > 10 chars.");
      return;
    }
    setTasks([
      ...tasks,
      { title: taskName, description: taskDescription, status: true },
    ]);
    setTaskName("");
    setTaskDescription("");
    setError(null);
  };

  const handleToggle = (idx) => {
    setTasks((prev) =>
      prev.map((task, i) =>
        i === idx ? { ...task, status: !task.status } : task,
      ),
    );
  };

  const handleDelete = (idx) => {
    setTasks((prev) => prev.filter((_, i) => i !== idx));
  };

  const handleEdit = (idx) => {
    setEditingTaskIdx(idx);
    setIsEditModalOpen(true);
  };

  const handleEditClose = () => {
    setIsEditModalOpen(false);
    setEditingTaskIdx(null);
  };

  const handleEditSave = (updatedData) => {
    setTasks((prev) =>
      prev.map((task, i) =>
        i === editingTaskIdx
          ? {
              ...task,
              title: updatedData.title,
              description: updatedData.description,
            }
          : task,
      ),
    );
    handleEditClose();
  };
  return (
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
                  <td>{task.title}</td>
                  <td>{task.description}</td>
                  <td>{task.status ? "Completed" : "Pending"}</td>
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
  );
};

export default Tasks;
