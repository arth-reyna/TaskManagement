import { useState } from "react";
import { useNavigate } from "react-router-dom";
// import styles from "./styles.module.scss"
import styles from "../login/styles.module.scss"


const Register = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoggedIn, setisLoggedIn] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password || !name) {
      setError("Please fill in all fields");
      return;
    }
    const result = await fetch("http://localhost:5000/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        email: email,
        password: password,
      }),
    });

    if (!result.ok) throw new Error("Error during frontend register");
    
    setisLoggedIn(true);
    navigate("/tasks");

    console.log("Register attempt:", { email, password });
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginCard}>
        <div className={styles.loginHeader}>
          <h1>Welcome !!</h1>
          <p>Sign up</p>
        </div>

        <form onSubmit={handleRegister} className={styles.loginForm}>
          <div className={styles.formGroup}>
            <label htmlFor="name">Name</label>
            <input
              type="name"
              name="name"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="john doe"
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              name="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
              minLength={8}
            />
          </div>

          {error && <div className={styles.error}>{error}</div>}

          <button type="submit" className={styles.loginBtn}>
            Sign In
          </button>
        </form>

        <div className={styles.footer}>
          <p>
            Don't have an account?{" "}
            <button
              type="button"
              className={styles.signupLink}
              onClick={() => navigate("/register")}
            >
              Sign up
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
