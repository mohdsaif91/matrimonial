import { Routes, Route, useLocation } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { Suspense } from "react";
import LoginPage from "./pages/Login";
import Footer from "./layout/Footer";
import Header from "./layout/Header";
import { buildRoutes } from "./util/routeBuilder";
import { headerLinks } from "./data/header";
import LoadingPage from "./pages/Loading/Loading";
import PrivateRoute from "./util/PrivateRoute";
import ErrorPage from "./pages/ErrorPage";
import NoInternetPage from "./pages/NoInternet";
import { ToastContainer } from "react-toastify";
import ResetPassword from "./pages/ResetPassword";
import { noHeaderRoutes } from "./util/ClientUtils";

// import { pdfjs } from "react-pdf";
// import workerSrc from "pdfjs-dist/build/pdf.worker.min.js";

// pdfjs.GlobalWorkerOptions.workerSrc = workerSrc;

function App() {
  const routes = buildRoutes(headerLinks);
  const location = useLocation();

  if (location.pathname === "/") {
    return (
      <Routes>
        <Route path="/" element={<LoginPage />} />
      </Routes>
    );
  }

  return (
    <AuthProvider>
      <ToastContainer />
      {!noHeaderRoutes.includes(location.pathname) && <Header className={``} />}
      <div className={`flex-1 p-4 bg-[#F0F3F8]`}>
        <Suspense fallback={<LoadingPage />}>
          <Routes>
            {routes.map((r) => (
              <Route
                key={r.path}
                path={r.path}
                element={<PrivateRoute>{r.element}</PrivateRoute>}
              />
            ))}
            <Route key="error" path="/error" element={<ErrorPage />} />
            <Route
              key="error"
              path="/noInternet"
              element={<NoInternetPage />}
            />
            <Route
              key="resetPassword"
              path="/reset-password"
              element={<ResetPassword />}
            />
          </Routes>
        </Suspense>
      </div>
      <Footer />
    </AuthProvider>
  );
}

export default App;
