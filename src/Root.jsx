import { Suspense, useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import "preline/preline";
import Dashboard from "./pages/Dashboard";
import RoleBasedRoutes from "./components/RoleBasedRoutes";

const Root = () => {
  const location = useLocation();

  useEffect(() => {
    if (window.HSStaticMethods && typeof window.HSStaticMethods.autoInit === 'function') {
      window.HSStaticMethods.autoInit();
    }
  }, [location.pathname]);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
      <Route element={<RoleBasedRoutes allowedRoles={["aa", "admin"]} />}>
        <Route path="/home" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Route>
      </Routes>
    </Suspense>
  );
};

export default Root;
