import styles from "./styles.module.scss";
import { useNavigate } from "react-router-dom";

const Homepage = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.homepage}>
      
      
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1>Welcome to Task Management</h1>
          <p className={styles.tagline}>
            Organize, prioritize, and accomplish your goals efficiently
          </p>
          <div className={styles.ctaButtons}>
            <button
              className={styles.btnPrimary}
              onClick={() => navigate("/login")}
            >
              Sign In
            </button>
            <button
              className={styles.btnSecondary}
              onClick={() => navigate("/tasks")}
            >
              View Tasks
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Homepage;
