// import { useAuth } from '../hooks/useAuth';
import axios from "axios";
import { useLetter } from "../hooks/useLetter";
import UploadFile from "./DropFile";
import SelectItem from "./SelectItem";
import SelectMultiple from "./SelectMultiple";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import Button from "./SingleButton";

export default function SubContent() {
  // const {  } = useAuth();
  const { letterData, setLetterData } = useLetter();

  const [msgSuccess, setMsgSuccess] = useState("");

  const [errMsg, setErrMsg] = useState(null);

  const [errData, setErrData] = useState([]);
  const [isMsgErr, setIsMsgErr] = useState(false);

  const token = Cookies.get("access_token");

  const createLetterInput = (e) => {
    const { name, value } = e.target;
    setLetterData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const submitNewLetter = async () => {
    const options = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const BASE_URL = "http://localhost:8000/api/letter";
    try {
      const response = await axios.post(BASE_URL, letterData, options);
      const { success, message } = response.data;
      if (success) {
        setMsgSuccess(message);
        setLetterData({});
      }
    } catch (error) {
      const { errors, message } = error.response.data;
      console.log(errors);
      setErrMsg(error.response?.data);
    }
  };

  useEffect(() => {
    if (errMsg) {
      let errs = [];
      const { errors, message } = errMsg;
      if (errors) {
        for (const [key, value] of Object.entries(errors)) {
          console.log(`${key}: ${value}`); // Logs "a 5", "b 7", "c 9"
          errs[key] = value;
        }
        setErrData(errs);
      }
      setIsMsgErr(true);
      console.log(errs);
    }
  }, [errMsg]);

  return (
    <div className="col-span-2 p-4 bg-white rounded-lg shadow-md lg:h-full">
      {msgSuccess && (
        <div
          className="bg-teal-50 border-t-2 border-teal-500 rounded-lg p-4 dark:bg-teal-800/30"
          role="alert"
          tabIndex="-1"
          aria-labelledby="hs-bordered-success-style-label"
        >
          <div className="flex">
            <div className="shrink-0">
              <span className="inline-flex justify-center items-center size-8 rounded-full border-4 border-teal-100 bg-teal-200 text-teal-800 dark:border-teal-900 dark:bg-teal-800 dark:text-teal-400">
                <svg
                  className="shrink-0 size-4"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path>
                  <path d="m9 12 2 2 4-4"></path>
                </svg>
              </span>
            </div>
            <div className="ms-3">
              <h3
                id="hs-bordered-success-style-label"
                className="text-gray-800 font-semibold dark:text-white"
              >
                {msgSuccess}.
              </h3>
              <p className="text-sm text-gray-700 dark:text-neutral-400">
                You have successfully create a letter.
              </p>
            </div>
          </div>
        </div>
      )}

      {isMsgErr && (
        <div
          className="bg-red-50 border border-red-200 text-sm text-red-800 rounded-lg p-4 dark:bg-red-800/10 dark:border-red-900 dark:text-red-500"
          role="alert"
          tabIndex="-1"
          aria-labelledby="hs-with-list-label"
        >
          <div className="flex">
            <div className="shrink-0">
              <svg
                className="shrink-0 size-4 mt-0.5"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10"></circle>
                <path d="m15 9-6 6"></path>
                <path d="m9 9 6 6"></path>
              </svg>
            </div>
            <div className="ms-4">
              <h3 id="hs-with-list-label" className="text-sm font-semibold">
                A problem has been occurred while submitting your data.
              </h3>
              <div className="mt-2 text-sm text-red-700 dark:text-red-400">
                <ul className="list-disc space-y-1 ps-5">
                  {errData.map((val, idx) => (
                    <li key={idx}>{val}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      <h2 className="text-xl font-semibold text-gray-800 dark:text-neutral-200 mt-6">
        Fill in the form
      </h2>
      <form>
        <div className="grid gap-4 mt-6 lg:gap-6">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:gap-6">
            <div>
              <label
                htmlFor="hs-id-surat"
                className="block mb-2 text-sm font-medium text-gray-700 dark:text-white"
              >
                ID Surat
              </label>
              <input
                type="text"
                onChange={createLetterInput}
                name="letter_no"
                id="hs-id-surat"
                className="block w-full px-4 py-3 text-sm border border-gray-200 rounded-lg focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
              />
            </div>

            <div>
              <label
                htmlFor="hs-tanggal-surat"
                className="block mb-2 text-sm font-medium text-gray-700 dark:text-white"
              >
                Tanggal Simpan
              </label>
              <input
                type="date"
                name="hs-tanggal-surat"
                id="hs-tanggal-surat"
                className="block w-full px-4 py-3 text-sm border border-gray-200 rounded-lg focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="hs-judul-surat"
              className="block mb-2 text-sm font-medium text-gray-700 dark:text-white"
            >
              Judul
            </label>
            <input
              type="text"
              onChange={createLetterInput}
              name="letter_title"
              id="hs-judul-surat"
              autoComplete="email"
              className="block w-full px-4 py-3 text-sm border border-gray-200 rounded-lg focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
            />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:gap-6">
            <div>
              <label
                htmlFor="hs-tipe-surat"
                className="block mb-2 text-sm font-medium text-gray-700 dark:text-white"
              >
                Tipe Surat
              </label>
              <SelectItem name="hs-tipe-surat" token={token} />
            </div>

            <div>
              <label
                htmlFor="hs-keyword-surat"
                className="block mb-2 text-sm font-medium text-gray-700 dark:text-white"
              >
                List Keyword
              </label>
              <SelectMultiple name="hs-list-keyword" token={token} />
            </div>
          </div>
          <div>
            <label
              htmlFor="hs-about-hire-us-1"
              className="block mb-2 text-sm font-medium text-gray-700 dark:text-white"
            >
              File Surat
            </label>
            <UploadFile token={token} />
          </div>
          <div>
            <Button
              name="btn-save-surat"
              property="mt-5 px-10 "
              content="Save"
              saveLetter={submitNewLetter}
            />
            {/* <Button
              type="button"
              className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
              
            >
              Create Letter */}
          </div>
        </div>
      </form>
    </div>
  );
}
