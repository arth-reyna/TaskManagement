import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import styles from "./styles.module.scss";
import { toast } from "react-toastify";

const LoginPage = () => {
  const navigate = useNavigate();
  const { formState, register, handleSubmit, setError, clearErrors } = useForm();
  const { errors } = formState;

  const handleLogin = async (formData) => {
    clearErrors();

    try {
      const result = await fetch("http://localhost:5000/api/login", {
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
          "Invalid email or password";

        setError("password", {
          type: "manual",
          message,
        });
        toast.error(message);
        return;
      }

      toast.success("Logged in!");
      // Store simple auth flag and user details
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("userEmail", formData.email);
      localStorage.setItem("token", data?.data?.token ?? "");
      localStorage.setItem("userCreatedAt", data?.data?.user?.createdAt ?? "");
      navigate("/tasks");
    } catch {
      const message = "Login failed. Please try again.";
      toast.error(message);
      setError("password", {
        type: "manual",
        message,
      });
    }
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginCard}>
        <div className={styles.loginHeader}>
          <h1>Welcome Back</h1>
          <p>Sign in to your account</p>
        </div>

        <form
          onSubmit={handleSubmit(handleLogin)}
          className={styles.loginForm}
          noValidate
        >
          <div className={styles.formGroup}>
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              {...register("email", {
                required: "email is required",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "email format invalid",
                },
              })}
            />

            <p className={styles.errorClass}>{errors.email?.message}</p>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              {...register("password", {
                required: "password is required",
                minLength: {
                  value: 6,
                  message: "min 6 characters required",
                },
              })}
            />

            <p className={styles.errorClass}>{errors.password?.message}</p>
          </div>

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

        {/* <div className={styles.loginCard}>
          <Counter />
        </div> */}
    </div>
  );
};

export default LoginPage;
