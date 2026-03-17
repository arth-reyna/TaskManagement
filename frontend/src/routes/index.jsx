import { roles } from "../constants/roles";
import About from "../pages/about";
import Profile from "../pages/profile";
import Tasks from "../pages/tasks";

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
    element: <h1>logout page</h1>,
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
];
