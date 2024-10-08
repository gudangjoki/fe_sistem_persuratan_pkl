import { useEffect } from "react";
import { useAuth } from "../hooks/useAuth";

/* eslint-disable react/prop-types */
export default function TogglePasswordItem(props) {

  const { setPassReset, passReset } = useAuth();
  const { groupId } = props;

  const changeInputPassword = (e) => {
    const { name, value } = e.target;
    setPassReset((prev) => ({
      ...prev,
      [name]: value
    }));
  }

  useEffect(() => {
    console.log(passReset);
  }, [passReset]);

  return (
    <div className="space-y-5" data-hs-toggle-password-group>
      <div className="max-w-sm">
        <label
          htmlFor={`hs-toggle-password-${groupId}-np`}
          className="block mb-2 text-sm dark:text-white"
        >
          New password
        </label>
        <div className="relative">
          <input
            id={`hs-toggle-password-${groupId}-np`}
            type="password"
            className="block w-full px-4 py-3 text-sm border-gray-200 rounded-lg focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
            placeholder="Enter new password"
            name="password"
            onChange={changeInputPassword}
          />
          <button
            type="button"
            data-hs-toggle-password={`{
              "target": ["#hs-toggle-password-${groupId}", "#hs-toggle-password-${groupId}-np"]
            }`}
            className="absolute top-0 end-0 p-3.5 rounded-e-md dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
          >
            <svg
              className="flex-shrink-0 w-3.5 h-3.5 text-gray-400 dark:text-neutral-600"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path
                className="hs-password-active:hidden"
                d="M9.88 9.88a3 3 0 1 0 4.24 4.24"
              />
              <path
                className="hs-password-active:hidden"
                d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"
              />
              <path
                className="hs-password-active:hidden"
                d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"
              />
              <line
                className="hs-password-active:hidden"
                x1="2"
                x2="22"
                y1="2"
                y2="22"
              />
              <path
                className="hidden hs-password-active:block"
                d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"
              />
              <circle
                className="hidden hs-password-active:block"
                cx="12"
                cy="12"
                r="3"
              />
            </svg>
          </button>
        </div>
      </div>

      <div className="max-w-sm">
        <label
          htmlFor={`hs-toggle-password-${groupId}`}
          className="block mb-2 text-sm dark:text-white"
        >
          Confirm password
        </label>
        <div className="relative">
          <input
            id={`hs-toggle-password-${groupId}`}
            type="password"
            className="block w-full px-4 py-3 text-sm border-gray-200 rounded-lg focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
            placeholder="Enter confirm password"
            name="confirm_password"
            onChange={changeInputPassword}
          />
          <button
            type="button"
            data-hs-toggle-password={`{
              "target": ["#hs-toggle-password-${groupId}", "#hs-toggle-password-${groupId}-np"]
            }`}
            className="absolute top-0 end-0 p-3.5 rounded-e-md dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
          >
            <svg
              className="flex-shrink-0 w-3.5 h-3.5 text-gray-400 dark:text-neutral-600"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path
                className="hs-password-active:hidden"
                d="M9.88 9.88a3 3 0 1 0 4.24 4.24"
              />
              <path
                className="hs-password-active:hidden"
                d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"
              />
              <path
                className="hs-password-active:hidden"
                d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"
              />
              <line
                className="hs-password-active:hidden"
                x1="2"
                x2="22"
                y1="2"
                y2="22"
              />
              <path
                className="hidden hs-password-active:block"
                d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"
              />
              <circle
                className="hidden hs-password-active:block"
                cx="12"
                cy="12"
                r="3"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
