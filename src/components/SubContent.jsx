// import { useAuth } from '../hooks/useAuth';
import axios from "axios";
import { useLetter } from "../hooks/useLetter";
import UploadFile from "./DropFile";
import SelectItem from "./SelectItem";
import SelectMultiple from "./SelectMultiple";
import Cookies from "js-cookie";
import { useState } from "react";

export default function SubContent() {
  // const {  } = useAuth();
  const { letterData, setLetterData } = useLetter();

  const [msgSuccess, setMsgSuccess] = useState("");

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
      }
    } catch (error) {
      console.log(error);
    }
  };

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

      <h2 className="text-xl font-semibold text-gray-800 dark:text-neutral-200">
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
            <button
              type="button"
              className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
              onClick={submitNewLetter}
            >
              Create Letter
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
