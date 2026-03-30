import ErrorBoundary from "./components/error-boundary/index";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { routesData } from "./routes";
import MainLayout from "./pages/main-layout";
import Homepage from "./pages/home";
import ProtectedRoute from "./components/protected-route";
import { ToastContainer } from "react-toastify";


const App = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <ToastContainer position="top-right" autoClose={2500} hideProgressBar={false} newestOnTop closeOnClick pauseOnFocusLoss draggable pauseOnHover />
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Homepage />} />
            {routesData.map((route, idx) => (
              <Route
                key={idx}
                path={route.path}
                element={
                  route.isPublic ? (
                    route.element
                  ) : (
                    <ProtectedRoute>{route.element}</ProtectedRoute>
                  )
                }
              />
            ))}
          </Route>
        </Routes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default App;
