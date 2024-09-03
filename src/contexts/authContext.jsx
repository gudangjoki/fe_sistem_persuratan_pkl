import { createContext, useState } from "react";
import PropTypes from 'prop-types';

// import axios from 'axios';
import Cookies from 'js-cookie';

// export interface User {
//   email: string;
//   password: string;
//   fname: string;
//   lname: string;
// }

// interface Props {
//   children?: ReactNode;
// }

// interface AuthenticationContextType {
//   user: User | null;
//   setUser: (user: User | null | ((prevUser: User | null) => User)) => void;
//   url: string;
//   setUrl: (url: string) => void;
// }

export const AuthContext = createContext({
  user: null,
  setUser: () => {},
  url: "",
  setUrl: () => {},
});

export const AuthenticationProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [url, setUrl] = useState("http://localhost:8000/api/login");

  const saveTokenToCookie = (access_token, refresh_token) => {
    Cookies.set('access_token', access_token);
    Cookies.set('refresh_token', refresh_token, { expires: 7 });
  };


  const authenticationContextValue = {
    user,
    setUser,
    url,
    setUrl,
    accessToken,
    setAccessToken,
    saveTokenToCookie
  };

  return (
    <AuthContext.Provider value={authenticationContextValue}>
      {children}
    </AuthContext.Provider>
  );
};

AuthenticationProvider.propTypes = {
    children: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default AuthContext;