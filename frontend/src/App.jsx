import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorBoundary from "./components/error-boundary/index";
import { routesData } from "./routes";
import MainLayout from "./pages/main-layout";
import Homepage from "./pages/home";
import ProtectedRoute from "./components/protected-route";
import { ToastContainer } from "react-toastify";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <Homepage /> },
      ...routesData.map((route) => ({
        path: route.path,
        element: route.isPublic ? (
          route.element
        ) : (
          <ProtectedRoute>{route.element}</ProtectedRoute>
        ),
      })),
    ],
  },
]);

const App = () => {
  return (
    <ErrorBoundary>
      <ToastContainer
        position="top-right"
        autoClose={2500}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <RouterProvider router={router} />
    </ErrorBoundary>
  );
};

export default App;
