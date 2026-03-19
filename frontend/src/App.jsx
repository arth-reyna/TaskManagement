import ErrorBoundary from "./components/error-boundary/index";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { routesData } from "./routes";
import MainLayout from "./pages/main-layout";
import Homepage from "./pages/home";

const App = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Homepage />} />
            {routesData.map((route, idx) => (
              <Route key={idx} path={route.path} element={route.element} />
            ))}
          </Route>
        </Routes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default App;
