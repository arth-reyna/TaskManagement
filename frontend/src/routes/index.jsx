import { roles } from "../constants/roles";
import About from "../pages/about";
import LoginPage from "../pages/login";
import Profile from "../pages/profile";
import Register from "../pages/register";
import Tasks from "../pages/tasks";

import { Navigate } from "react-router-dom";

const Logout = () => {
  localStorage.removeItem("isAuthenticated");
  localStorage.removeItem("userEmail");
  return <Navigate to="/login" replace />;
};

export const routesData = [
  {
    path: "tasks",
    element: <Tasks />,
    role: [roles.user],
  },
  {
    path: "profile",
    element: <Profile />,
    role: [roles.user],
  },
  {
    path: "logout",
    element: <Logout />,
    role: [roles.user, roles.admin],
  },
  {
    path: "about",
    element: <About />,
    role: [roles.user, roles.admin],
  },
  {
    path: "overview",
    element: <h1>Admin Dashboard</h1>,
    role: [roles.admin],
  },
  {
    path: "login",
    element: <LoginPage />,
    isPublic: true,
  },
  {
    path: "register",
    element: <Register />,
    isPublic: true,
  },
];
