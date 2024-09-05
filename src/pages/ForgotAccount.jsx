import axios from "axios";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const bg = "/bg.jpg";

const ForgotAccount = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const changeEmail = (e) => {
    setEmail((prev) => ({
      ...prev,
      email: e.target.value,
    }));
  };

  const submitFormEmail = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading spinner

    const BASE_URL = "http://localhost:8000/api/forget_password";
    const options = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const response = await axios.post(BASE_URL, email, options);
      setSuccess(response.data?.success);
      console.log(response.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (success) {
      navigate("../otp-verification");
    }

    return () => {
      setSuccess(false);
      setLoading(false);
    };
  }, [success, navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 relative">
      <div
        className="absolute top-0 left-0 w-full h-full bg-center bg-cover animate-ambient"
        style={{ backgroundImage: `url(${bg})` }}
      />

      {loading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div
            className="animate-spin inline-block w-16 h-16 border-[6px] border-current border-t-transparent text-blue-600 rounded-full dark:text-blue-500"
            role="status"
            aria-label="loading"
          >
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      )}

      <motion.div
        className="relative w-full max-w-lg p-6 bg-white border border-gray-200 shadow-sm rounded-xl sm:p-10 z-10"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="p-4 sm:p-7">
          <div className="text-center">
            <h1 className="block text-2xl font-bold text-gray-800">
              Forgot password?
            </h1>
            <p className="mt-2 text-sm text-gray-600">
              Remember your password?
              <a
                className="ml-2 font-medium text-blue-600 decoration-2 hover:underline focus:outline-none focus:underline cursor-pointer"
                onClick={() => {
                  navigate("../login");
                }}
              >
                Sign in here
              </a>
            </p>
          </div>

          <div className="mt-5">
            <form>
              <div className="grid gap-y-4">
                <div>
                  <label htmlFor="email" className="block mb-2 text-sm">
                    Email address
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      id="email"
                      onChange={changeEmail}
                      name="email"
                      className="block w-full px-4 py-3 text-sm border border-gray-200 rounded-lg dark:bg-slate-900 dark:border-gray-700"
                      required
                      aria-describedby="email-error"
                      placeholder="Enter your email"
                    />
                    <div className="absolute inset-y-0 hidden pointer-events-none end-0 pe-3">
                      <svg
                        className="text-red-500 size-5"
                        width="16"
                        height="16"
                        fill="currentColor"
                        viewBox="0 0 16 16"
                        aria-hidden="true"
                      >
                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
                      </svg>
                    </div>
                  </div>
                  <p
                    className="hidden mt-2 text-xs text-red-600"
                    id="email-error"
                  >
                    Please include a valid email address so we can get back to
                    you
                  </p>
                </div>

                <button
                  type="submit"
                  className="inline-flex items-center justify-center w-full px-4 py-3 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-lg gap-x-2 hover:bg-blue-700 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
                  onClick={submitFormEmail}
                >
                  Reset password
                </button>
              </div>
            </form>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
export default ForgotAccount;
