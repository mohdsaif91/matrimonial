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
// import { useDrawer } from "./context/DrawerContext";

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
      <Header className={``} />
      {/* <div className="flex min-h-screen"> */}
      {/* <NavigationDrawer openFlag={isOpen} /> */}
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
          </Routes>
        </Suspense>
      </div>
      {/* </div> */}
      <Footer />
    </AuthProvider>
  );
}

export default App;
