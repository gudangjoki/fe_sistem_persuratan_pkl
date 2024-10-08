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
import Board from "./pages/Board";
import Profile from "./pages/Profile";
import SubContent from "./components/Content";
import { AuthenticationProvider } from "./contexts/authContext";

const Root = () => {
  const location = useLocation();

  // Preline autoInit for route changes
  useEffect(() => {
    if (window.HSStaticMethods && typeof window.HSStaticMethods.autoInit === "function") {
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

          <Route element={<RoleBasedRoutes allowedRoles={["no_auth", "forget_acc"]} />}>
            <Route path="/otp-verification" element={<VerifikasiOTP />} />
            <Route path="/reset-password" element={<ResetPassword />} />
          </Route>
          
          <Route path="/" element={<Dashboard />}>
            <Route path="board" element={<Board />} />
            <Route path="profile" element={<Profile />} />
            <Route path="dashboard" element={<SubContent />} />
          </Route>
        </Routes>
      </AuthenticationProvider>
    </Suspense>
  );
};

export default Root;
