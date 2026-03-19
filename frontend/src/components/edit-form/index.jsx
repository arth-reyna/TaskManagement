import { useState } from "react";
import Button from "../button";
import TextBox from "../text-box";
import styles from "./styles.module.scss";

const EditTask = ({ task, onClose, onSave }) => {
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [error, setError] = useState(null);

  const handleSubmit = () => {
    if (title.length <= 4 || description.length <= 10) {
      setError("Title must be > 4 chars and description > 10 chars.");
      return;
    }
    onSave({ title, description });
  };

  return (
    <div className={styles.formContainer}>
      <h2>Edit Task</h2>
      <div className={styles.field}>
        <label htmlFor="edit-title">Task Title</label>
        <TextBox
          props={{
            id: "edit-title",
            styles: styles.input,
            value: title,
            onchange: (e) => setTitle(e.target.value),
          }}
        />
      </div>

      <div className={styles.field}>
        <label htmlFor="edit-description">Task Description</label>
        <textarea
          id="edit-description"
          className={styles.input}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      {error && <p className={styles.error}>{error}</p>}

      <div className={styles.actions}>
        <Button props={{ text: "Save", onClick: handleSubmit }} />
        <Button props={{ text: "Cancel", onClick: onClose }} />
      </div>
    </div>
  );
};

export default EditTask;
