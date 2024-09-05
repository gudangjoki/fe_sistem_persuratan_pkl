import { createContext, useState } from "react";
import PropTypes from 'prop-types';

// import axios from 'axios';
import Cookies from 'js-cookie';
import axios from "axios";

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
  otp: null,
  setOtp: () => {},
  indexPin: 0,
  setIndexPin: () => {},
  passReset: {},
  setPassReset: () => {}
});

export const AuthenticationProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [passReset, setPassReset] = useState({
    "password": "",
    "confirm_password": ""
  });
  const [accessToken, setAccessToken] = useState(null);
  const [url, setUrl] = useState("http://localhost:8000/api/login");
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [indexPin, setIndexPin] = useState(0);

  const saveTokenToCookie = (access_token, refresh_token) => {
    Cookies.set('access_token', access_token);
    Cookies.set('refresh_token', refresh_token, { expires: 7 });
  };

  const getAccessTokenFromCookie = () => {
    return Cookies.get('access_token');
  }

  const getRefreshTokenFromCookie = () => {
    const token = Cookies.get('refresh_token');
    console.log(token);
    return JSON.stringify({ refresh_token: token });
  }

  const BASE_URL = 'http://localhost:8000/api/refresh_token';

  const getNewAccessToken = async () => {
    const refreshToken = getRefreshTokenFromCookie();
    const accessToken = getAccessTokenFromCookie();
    const options = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      },
      withCredential: true
    }
    try {
      const response = await axios.post(BASE_URL, refreshToken, options);
      console.log(response.data);
      Cookies.set('access_token', response.data.access_token, { expires: 1 / 1440 });
      //
      return response.data;
    } catch (err) {
      console.error(err);
    }
  }


  const authenticationContextValue = {
    user,
    setUser,
    url,
    setUrl,
    accessToken,
    setAccessToken,
    saveTokenToCookie,
    getNewAccessToken,
    getAccessTokenFromCookie,
    otp,
    setOtp,
    indexPin,
    setIndexPin,
    passReset,
    setPassReset
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