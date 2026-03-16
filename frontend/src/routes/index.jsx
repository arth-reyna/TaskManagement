import { roles } from "../constants/roles";

export const routesData = [
  {
    path: "tasks",
    element: <h1>task page</h1>,
    role: [roles.user],
  },
  {
    path: "profile",
    element: <h1>profile page</h1>,
    role: [roles.user],
  },
  {
    path: "logout",
    element: <h1>logout page</h1>,
    role: [roles.user, roles.admin],
  },
  {
    path: "overview",
    element: <h1>Admin Dashboard</h1>,
    role: [roles.admin],
  },
];
