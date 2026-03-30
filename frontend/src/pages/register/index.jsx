import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../login/styles.module.scss";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const Register = () => {
  const navigate = useNavigate();
  const form = useForm();
  const { formState, register, handleSubmit } = form;
  const { errors } = formState;
  const [error, setError] = useState("");

  const handleRegister = async (formData) => {
    setError("");

    try {
      const result = await fetch("http://localhost:5000/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await result.json().catch(() => null);

      if (!result.ok) {
        const message =
          data?.message ||
          data?.error ||
          "Registration failed. Please try again.";
        setError(message);
        toast.error(message);
        return;
      }

      toast.success("Registered successfully!");
      navigate("/login");
    } catch {
      const message = "Registration failed. Please try again.";
      setError(message);
      toast.error(message);
    }
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginCard}>
        <div className={styles.loginHeader}>
          <h1>Welcome !!</h1>
          <p>Sign up</p>
        </div>

        <form
          onSubmit={handleSubmit(handleRegister)}
          className={styles.loginForm}
        >
          <div className={styles.formGroup}>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              {...register("name", {
                required: "name is required",
              })}
            />

            <p className={styles.errorClass}>{errors.name?.message}</p>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              {...register("email", {
                required: "email is required",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "email format is invalid",
                },
              })}
            />

            <p className={styles.errorClass}>{errors.email?.message}</p>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              {...register("password", {
                required: "password is required",
                minLength: {
                  value: 6,
                  message: "minimum 6 characters",
                },
              })}
            />

            <p className={styles.errorClass}>{errors.password?.message}</p>
          </div>

          {error && <div className={styles.error}>{error}</div>}

          <button type="submit" className={styles.loginBtn}>
            Sign Up
          </button>
        </form>

        <div className={styles.footer}>
          <p>
            Already have an account?{" "}
            <button
              type="button"
              className={styles.signupLink}
              onClick={() => navigate("/login")}
            >
              Sign in
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
