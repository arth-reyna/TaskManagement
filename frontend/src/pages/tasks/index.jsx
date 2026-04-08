import { useEffect, useState } from "react";
import Button from "../../components/button";
import TextBox from "../../components/text-box";
import Modal from "../../components/modal";
import EditTask from "../../components/edit-form";
import styles from "./styles.module.scss";
import {
  Table,
  Header,
  HeaderRow,
  Body,
  Row,
  HeaderCell,
  Cell,
} from "@table-library/react-table-library/table";
import { useDispatch, useSelector } from "react-redux";
import { useTheme } from "@table-library/react-table-library/theme";
import {
  getAllTasks,
  addTasks,
  deleteTasks,
  updateTasks,
  toggleTasks,
} from "../../redux/features/tasks/tasksAsyncAction";

const Tasks = () => {
  const [taskName, setTaskName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [error, setError] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingTaskIdx, setEditingTaskIdx] = useState(null);

  const dispatch = useDispatch();
  const { data: tasksData, isLoading } = useSelector((state) => state.tasks);
  const tasks = Array.isArray(tasksData) ? tasksData : [];

  useEffect(() => {
    dispatch(getAllTasks());
  }, [dispatch]);

  const handleAddTask = async () => {
    try {
      if (taskName.length <= 4 || taskDescription.length <= 10) {
        setError("Title must be > 4 chars and description > 10 chars.");
        return;
      }
      dispatch(
        addTasks({
          title: taskName,
          description: taskDescription,
          status: true,
        }),
      );
      setTaskName("");
      setTaskDescription("");
      setError(null);
    } catch (error) {
      console.error(error);
    }
  };

  const handleToggle = async (idx) => {
    try {
      const taskToToggle = tasks[idx];
      const id = taskToToggle._id;

      await dispatch(toggleTasks(id)).unwrap();
      setError(null);
      dispatch(getAllTasks());
    } catch (error) {
      setError(error?.message || "Error Updating Status");
    }
  };

  const handleDelete = async (idx) => {
    try {
      const taskToDelete = tasks[idx];
      const taskId = taskToDelete._id;

      await dispatch(deleteTasks(taskId)).unwrap();
      setError(null);
    } catch (error) {
      setError(error?.message || "Unable to delete task.");
    }
  };

  const handleEdit = (idx) => {
    setEditingTaskIdx(idx);
    setIsEditModalOpen(true);
  };

  const handleEditClose = () => {
    setIsEditModalOpen(false);
    setEditingTaskIdx(null);
  };

  const handleEditSave = async (updatedData) => {
    try {
      const taskToEdit = tasks[editingTaskIdx];
      const taskId = taskToEdit._id;

      await dispatch(updateTasks({ id: taskId, data: updatedData })).unwrap();
      setError(null);
      dispatch(getAllTasks());
      handleEditClose();
    } catch (error) {
      setError(error?.message || "Unable to update task details");
    }
  };

  const theme = useTheme({
    Table: `
      --data-table-library_grid-template-columns: 60px 1fr 2fr 120px 280px;
      width: 100%;
      background: #ffffff;
      border-radius: 16px;
      overflow: hidden;
      box-shadow: 0 1px 3px rgba(2,52,63,0.12), 0 1px 2px rgba(2,52,63,0.24);
    `,
    HeaderRow: `background-color: #02343f`,
    HeaderCell: `
      padding: 24px 16px;
      color: #f0edcc;
      font-weight: 700;
      text-transform: uppercase;
      font-size: 0.80rem;
      letter-spacing: 1px;
      border-bottom: none;
      cursor: pointer;
    `,
    Row: `
      background-color: #ffffff;
      border-bottom: 1px solid rgba(2,52,63,0.08);
      &:nth-of-type(even) { background-color: rgba(240,237,204,0.15); }
      &:last-of-type { border-bottom: none; }
      &:hover { background-color: rgba(2,52,63,0.04); }
    `,
    Cell: `
      padding: 20px 16px;
      color: #02343f;
      font-size: 0.95rem;
      font-weight: 400;
      line-height: 1.5;
    `,
  });

  return (
    <>
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
          {isLoading ? (
            <p>Loading tasks...</p>
          ) : tasks.length === 0 ? (
            <p>No tasks added yet.</p>
          ) : (
            <Table data={{ nodes: tasks }} theme={theme}>
              {(tableList) => (
                <>
                  <Header>
                    <HeaderRow>
                      <HeaderCell>ID</HeaderCell>
                      <HeaderCell>Title</HeaderCell>
                      <HeaderCell>Description</HeaderCell>
                      <HeaderCell>Status</HeaderCell>
                      <HeaderCell>Action</HeaderCell>
                    </HeaderRow>
                  </Header>

                  <Body>
                    {tableList.map((task, idx) => (
                      <Row key={task._id} item={task}>
                        <Cell>{idx + 1}</Cell>
                        <Cell>{task.task_title}</Cell>
                        <Cell>{task.task_description}</Cell>
                        <Cell>{task.status ? "Pending" : "Completed"}</Cell>
                        <Cell>
                          <div className={styles.actions}>
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
                          </div>
                        </Cell>
                      </Row>
                    ))}
                  </Body>
                </>
              )}
            </Table>
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
