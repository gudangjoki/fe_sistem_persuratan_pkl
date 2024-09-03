import { useLocation, Navigate, Outlet, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import Cookies from 'js-cookie';
import PropTypes from 'prop-types';

const getTokenFromCookie = () => {
  return Cookies.get('access_token');
};

const roleAuthorized = (allowedRoles, userRoles) => {
  return userRoles.some((val) => allowedRoles.includes(val));
};

const RoleBasedRoutes = ({ allowedRoles }) => {
  const [guarded, setGuarded] = useState(true);
  const location = useLocation();
  const [decoded, setDecoded] = useState(null);
  const [loading, setLoading] = useState(true);
  // const [isAuth, setIsAuth] = useState(true);
  const navigate = useNavigate();

  console.log(allowedRoles);

  useEffect(() => {
    const fetchToken = async () => {
      const token = getTokenFromCookie()
      if (token) {
        try {
          const decodedToken = jwtDecode(token);
          setDecoded(decodedToken);
          console.log(decodedToken)
          setLoading(false);
          // setIsAuth(true);
        } catch (error) {
          console.error("Error decoding token:", error);
        }
      } else {
        console.log("No token in cookies");
        setDecoded({ email: "", role: "" });
      }
    };

    fetchToken();
  }, []);

  useEffect(() => {
    const roles = decoded?.roles
    console.log(roles);
    if (!roles) return;

    const isRoleAllowed = roleAuthorized(allowedRoles, roles);
    if (allowedRoles[0] == '') {
      setGuarded(false);
      return;
    }
    console.log(isRoleAllowed);
    setGuarded(isRoleAllowed);
    setLoading(false);
  }, [decoded, allowedRoles]);

  useEffect(() => {
    const loadTimeout = setTimeout(() => {
      if (loading && location.pathname !== "/login") {
        alert("redirecting to login menu...");
        navigate("/login");
      }
    }, 3000);
    return () => clearTimeout(loadTimeout);
  }, [loading, navigate, location.pathname]);

  if (loading && location.pathname !== '/login') return <div>Loading.... you will redirected to login menu...</div>;


  return decoded && guarded ? (
    <Outlet context={{ "role": decoded?.role }} />
  ) : allowedRoles[0] != "" && !loading ? (
    // bisa ditambahin redirect ke tempat awal user
    <Navigate to="/" state={{ from: location }} replace />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

RoleBasedRoutes.propTypes = {
  allowedRoles: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default RoleBasedRoutes;
