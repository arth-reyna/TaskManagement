import { useState } from "react";
import Button from "../../components/button";
import TextBox from "../../components/text-box";
import styles from "./styles.module.scss";

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [taskName, setTaskName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [error, setError] = useState(null);

  const handleAddTask = () => {
    const newTask = {
      title: taskName,
      description: taskDescription,
    };

    if (newTask.title.length <= 4 || newTask.description.length <= 10) {
      setError("Length very short");
    } else {
      setTasks([...tasks, newTask]);
      setTaskDescription("");
      setTaskName("");
    }
  };

  return (
    <div className={styles.mainbody}>
      <h1>Task Management</h1>

      <div className={styles.addTaskBody}>
        <div className={styles.addtask}>
          <label htmlFor="task-name">Task Title</label>
          <TextBox
            props={{
              name: "addtask",
              id: "task",
              styles: styles.textbox,
              value: taskName,
              onchange: (e) => {
                setTaskName(e.target.value);
              },
            }}
          />
        </div>

        <div className={styles.addtask}>
          <label htmlFor="task-description">Task Description</label>
          <textarea
            name="task-des"
            id="task-description"
            className={styles.textbox}
            value={taskDescription}
            onChange={(e) => setTaskDescription(e.target.value)}
            minLength={10}
          ></textarea>
        </div>

        <Button props={{ text: "Add Task", onClick: handleAddTask }} />

        {<p>{error}</p>}
      </div>

      <div className={styles.viewTask}>
        <h1 style={{ textAlign: "left" }}>Your Tasks</h1>
        <ol>
          {tasks.map((task, idx) => (
            <div key={idx} className={styles.addtask}>
              <li>
                <strong>{task.title}</strong>
              </li>
              <p>{task.description}</p>
            </div>
          ))}
        </ol>
      </div>
    </div>
  );
};

export default Tasks;
