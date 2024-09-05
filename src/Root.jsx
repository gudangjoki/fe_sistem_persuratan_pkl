import { Suspense, useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import ForgotAccount from "./pages/ForgotAccount";
import "preline/preline";
import Dashboard from "./pages/Dashboard";
import VerifikasiOTP from "./pages/VerifikasiOTP";
import ResetPassword from "./pages/ResetPassword";
import RoleBasedRoutes from "./components/RoleBasedRoutes";
import { AuthenticationProvider } from "./contexts/AuthContext";

const Root = () => {
  const location = useLocation();

  useEffect(() => {
    if (
      window.HSStaticMethods &&
      typeof window.HSStaticMethods.autoInit === "function"
    ) {
      window.HSStaticMethods.autoInit();
    }
  }, [location.pathname]);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AuthenticationProvider>
        <Routes>
          <Route element={<RoleBasedRoutes allowedRoles={["aa", "admin"]} />}>
            <Route path="/home" element={<Home />} />
          </Route>
          <Route element={<RoleBasedRoutes allowedRoles={["no_auth"]} />}>
            <Route path="/login" element={<Login />} />
          </Route>
          
          <Route path="/forgot-account" element={<ForgotAccount />} />
          <Route path="/otp-verification" element={<VerifikasiOTP />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          
          <Route path="/dashboard" element={<Dashboard />} />
          
        </Routes>
      </AuthenticationProvider>
    </Suspense>
  );
};

export default Root;
