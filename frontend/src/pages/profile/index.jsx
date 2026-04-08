import styles from "./styles.module.scss";

const Profile = () => {
  const email = localStorage.getItem("userEmail") || "-";
  const createdAtRaw = localStorage.getItem("userCreatedAt");
  const createdAt = createdAtRaw
  ? new Date(createdAtRaw).toLocaleString()
    : "-";

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <h1>Profile</h1>
        <div className={styles.row}>
          <span>Email</span>
          <span>{email}</span>
        </div>
        <div className={styles.row}>
          <span>Created At</span>
          <span>{createdAt}</span>
        </div>
      </div>
    </div>
  );
};

export default Profile;