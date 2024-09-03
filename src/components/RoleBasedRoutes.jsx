import { useLocation, Navigate, Outlet } from "react-router-dom";
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

  console.log(allowedRoles);

  useEffect(() => {
    const fetchToken = async () => {
      const token = getTokenFromCookie()
      if (token) {
        try {
          const decodedToken = jwtDecode(token);
          setDecoded(decodedToken);
          console.log(decodedToken)
          // console.log("Decoded token role:", decodedToken.role);
          // console.log(allowedRoles)
          setLoading(false);
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
    // console.log(decoded?.roles);
    const roles = decoded?.roles
    console.log(roles);
    if (!roles) return;
    // const isAllowed = allowedRoles?.includes(roles[0]);

    const isRoleAllowed = roleAuthorized(allowedRoles, roles);
    if (allowedRoles[0] == '') {
      setGuarded(false);
      return;
    }
    console.log(isRoleAllowed);
    setGuarded(isRoleAllowed);
  }, [decoded, allowedRoles])

  while (loading) return <div>Loading....</div>;

  // allowedRoles[0] == decoded?.role
  return decoded && guarded ? (
    // return decoded ? (
    <Outlet context={{ "role": decoded?.role }} />
  ) : allowedRoles[0] != "" ? (
    <Navigate to="/login" state={{ from: location }} replace />
  ) : (
    <Navigate to={location.state?.from} state={{ from: location }} replace />
  );
};

RoleBasedRoutes.propTypes = {
  allowedRoles: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default RoleBasedRoutes;
