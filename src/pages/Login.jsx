import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
// import { useAuth } from '../hooks/useAuth';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const bg = "/bg.jpg";

const Login = () => {
  const { setAccessToken } = useAuth();
  const navigate = useNavigate();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [success, setSuccess] = useState(false);

  const [credential, setCredential] = useState({
    "email": "",
    "password": ""
  });

  const [errMsg, setErrMsg] = useState("");

  // const { url, setUser, saveTokenToCookie } = useAuth();

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const changeCredential = (e) => {
    const { name, value } = e.target;
    setCredential((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  useEffect(() => {
    console.log(credential)
  }, [credential])

  const handleSubmitCredential = async (e) => {
    e.preventDefault();

    const options = {
      headers: {
          'Content-Type': 'application/json',
      }, withCredential: true
    };

    try {
      const response = await axios.post("http://localhost:8000/api/login", credential, options);
      const { access_token, refresh_token } = response.data;
      if (access_token) {
        Cookies.set('access_token', access_token, { expires: 15 / 1440 });
        if (Cookies.get('refresh_token') == null) {
          Cookies.set('refresh_token', refresh_token, { expires: 7 });
        }
        setSuccess(true);
        setAccessToken(access_token);
      }
    } catch (err) {
      if (err.response?.status === 400) {
        setErrMsg(err.response.data.message);
        // console.log(err.response.data.message);
      }
    }
  }

  useEffect(() => {
    if (success) navigate('/dashboard');

    return () => {
      setCredential(null);
      setSuccess(false);
    }
  }, [success]);

  return (
    <div className="relative flex items-center justify-center min-h-screen overflow-hidden bg-gray-100">
      <div
        className="absolute top-0 left-0 w-full h-full bg-center bg-cover animate-ambient"
        style={{ backgroundImage: `url(${bg})` }}
      />
      <motion.div
        className="relative w-full max-w-lg pt-6 bg-white border border-gray-200 shadow-sm rounded-xl sm:py-10 sm:px-6"
        initial={{ opacity: 0, y: 50 }}  // Starts from below and transparent
        animate={{ opacity: 1, y: 0 }}   // Ends at normal position and fully visible
        transition={{ duration: 0.6 }}   // Animation duration
      >
        { errMsg && <div className="bg-red-50 border border-red-200 text-sm text-red-800 rounded-lg p-4 dark:bg-red-800/10 dark:border-red-900 dark:text-red-500" role="alert" tabIndex="-1" aria-labelledby="hs-with-list-label">
  <div className="flex">
    <div className="shrink-0">
      <svg className="shrink-0 size-4 mt-0.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"></circle>
        <path d="m15 9-6 6"></path>
        <path d="m9 9 6 6"></path>
      </svg>
    </div>
    <div className="ms-4">
      <h3 id="hs-with-list-label" className="text-sm font-semibold">
        {errMsg}.
      </h3>
      <div className="mt-2 text-sm text-red-700 dark:text-red-400">
        <ul className="list-disc space-y-1 ps-5">
          <li>
            {"Username and your password doesn't match in database"}
          </li>
        </ul>
      </div>
    </div>
  </div>
</div>}
        <div className="p-4 sm:p-7">
          <div className="text-center">
            <h1 className="block text-2xl font-bold text-gray-800">Sign in</h1>
          </div>
          <div className="mt-5">
            <form>
              <div className="grid gap-y-4">
                <div>
                  <label htmlFor="email" className="block mb-2 text-sm">Email address</label>
                  <div className="relative">
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className="block w-full px-4 py-3 text-sm border border-gray-200 rounded-lg focus:border-blue-500 focus:ring-blue-500"
                      required
                    //   aria-describedby="email-error"
                      placeholder="Enter your email"
                      onChange={changeCredential}
                    />
                  </div>
                  <p className="hidden mt-2 text-xs text-red-600" id="email-error">
                    Please include a valid email address so we can get back to you
                  </p>
                </div>

                <div>
                  <div className="flex items-center justify-between">
                    <label htmlFor="password" className="block mb-2 text-sm">Password</label>
                    <a
                      className="cursor-pointer inline-flex items-center text-sm font-medium text-blue-600 gap-x-1 decoration-2 hover:underline focus:outline-none focus:underline"
                      // href="/forgot-account"
                      onClick={() => {
                        navigate('../forgot-account');
                      }}
                    >
                      Forgot password?
                    </a>
                  </div>
                  <div className="relative">
                    <input
                      id="password"
                      type={passwordVisible ? 'text' : 'password'}
                      className="block w-full px-4 py-3 text-sm border border-gray-200 rounded-lg focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                      placeholder="Enter your password"
                      name="password"
                      onChange={changeCredential}
                    />
                    <button
                      type="button"
                      onClick={togglePasswordVisibility}
                      className="absolute top-0 end-0 p-3.5 rounded-e-md dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                    >
                      <svg
                        className={`flex-shrink-0 w-3.5 h-3.5 ${passwordVisible ? 'text-gray-400' : 'text-neutral-600'}`}
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        {passwordVisible ? (
                          <>
                            <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                            <circle cx="12" cy="12" r="3" />
                          </>
                        ) : (
                          <>
                            <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
                            <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
                            <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
                            <line x1="2" x2="22" y1="2" y2="22" />
                          </>
                        )}
                      </svg>
                    </button>
                  </div>
                  <p className="hidden mt-2 text-xs text-red-600" id="password-error">
                    8+ characters required
                  </p>
                </div>

                <div className="flex items-center">
                  <div className="flex">
                    <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      className="shrink-0 mt-0.5 border-gray-200 rounded text-blue-600 focus:ring-blue-500"
                    />
                  </div>
                  <div className="ms-3">
                    <label htmlFor="remember-me" className="text-sm">Remember me</label>
                  </div>
                </div>

                <button
                  onClick={handleSubmitCredential}
                  type="submit"
                  className="inline-flex items-center justify-center w-full px-4 py-3 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-lg gap-x-2 hover:bg-blue-700 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
                >
                  Sign in
                </button>
              </div>
            </form>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
