// import { useAuth } from '../hooks/useAuth';
import axios from "axios";
import { useLetter } from "../hooks/useLetter";
import UploadFile from "./DropFile";
import UploadFileReader from "./DropFileReader";
import SelectItem from "./SelectItem";
import SelectMultiple from "./SelectMultiple";
import Cookies from "js-cookie";
import { lazy, useEffect, useState } from "react";
import Button from "./SingleButton";
import OverlayItem from "./OverlayItem";
// import DropdownItem from "./DropdownItem";
import { Dialog } from "@headlessui/react";

import { Menu } from '@headlessui/react';
// const lazyListLetter = lazy(() => import('./ListLetter'));

/* eslint-disable react/prop-types */
function ActionDropdown(props) {
  const { letterId } = props;
  const [detailLetter, setDetailLetter] = useState({});
  const token = Cookies.get('access_token'); 

  const [isDetailOpen, setIsDetailOpen] = useState(false);
 
  const [isEditOpen, setIsEditOpen] = useState(false);
  const openEditModal = () => setIsEditOpen(true);
  const closeEditModal = () => setIsEditOpen(false);
  const [fetched, setFetched] = useState(false);
  const openDetailModal = (letterIdPassed) => {
    console.log(letterIdPassed)
    Cookies.set('letterId', letterIdPassed);
    setIsDetailOpen(true);
    // if (!fetched) {
      // getDetailLetter(letterIdPassed);
    //   // setFetched(false)
    // }
  }
  const closeDetailModal = () => setIsDetailOpen(false);

//   useEffect(() => {
//   if (isDetailOpen && letterId && !fetched) {
//     getDetailLetter(letterId);
//   }
// }, [isDetailOpen, letterId, fetched]);

  useEffect(() => {
    const letterIdPassed = Cookies.get('letterId');
    if (isDetailOpen) {
      getDetailLetter(letterIdPassed);
    }
  }, [isDetailOpen])

  const getDetailLetter = async (letterId) => {
    // if (!letterId) return;
    const BASE_URL = `http://localhost:8000/api/letter/${letterId}`;
    const options = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    }

    try {
      const response = await axios.get(BASE_URL, options);
      console.log(response.data.data.created_at);

      const letterDateString = response.data.data.created_at

      const date = new Date(letterDateString);

      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const year = date.getFullYear();

      const formattedDate = `${day}/${month}/${year}`;

      response.data.data.created_at = formattedDate;

      setDetailLetter(response.data.data);
      // setFetched(true);
      Cookies.remove('letterId');
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    console.log(detailLetter);
  }, [detailLetter]);


  // useEffect(() => {
  //   const letterId = Cookies.get('letter_id');

  // }, []);

  return (
    <>
      <Menu key={letterId} as="div" className="relative inline-block text-left">
        {/* Button */}
        <Menu.Button className="inline-flex justify-center px-4 py-2 text-sm font-medium rounded-md shadow-sm hover:bg-gray-50">
          <svg
            className="hs-collapse-open:hidden size-4"
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
            <line x1="3" x2="21" y1="6" y2="6" />
            <line x1="3" x2="21" y1="12" y2="12" />
            <line x1="3" x2="21" y1="18" y2="18" />
          </svg>
        </Menu.Button>

        {/* Menu Items */}
        <Menu.Items
          className="fixed right-0 z-50 w-48 mt-2 bg-white divide-y divide-gray-100 rounded-md shadow-lg focus:outline-none"
        >
          <div className="px-1 py-1">
            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={() => openDetailModal(letterId)}
                  className={`${
                    active ? "bg-gray-100 text-gray-900" : "text-gray-700"
                  } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                >
                  <DetailIcon className="w-5 h-5 mr-3" />
                  Detail
                </button>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={openEditModal}
                  className={`${
                    active
                      ? "bg-gray-100 text-gray-900"
                      : "text-gray-700"
                  } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                >
                  <EditIcon className="w-5 h-5 mr-3" />
                  Edit
                </button>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <a
                  href="#"
                  className={`${
                    active
                      ? "bg-gray-100 text-gray-900"
                      : "text-gray-700"
                  } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                >
                  <DeleteIcon className="w-5 h-5 mr-3" />
                  Hapus
                </a>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Menu>
      <Dialog
        open={isDetailOpen}
        onClose={closeDetailModal}
        className="fixed inset-0 z-[999] flex items-center justify-center overflow-y-auto bg-black bg-opacity-50"
      >
        <div className="p-6 m-3 mx-auto bg-white rounded-md sm:w-full sm:mx-auto sm:max-w-4xl h-fit">
          <Dialog.Title className="text-lg font-bold">Detail Surat</Dialog.Title>
          <Dialog.Description className="mt-2">
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
                      onChange=""
                      value={detailLetter.letter_no}
                      disabled
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
                      type="text"
                      disabled
                      value={detailLetter.created_at}
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
                    onChange=""
                    disabled
                    value={detailLetter.letter_title}
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
                    <SelectItem name="hs-tipe-surat" token="" disabledSelect="true"/>
                  </div>

                  <div>
                    <label
                      htmlFor="hs-keyword-surat"
                      className="block mb-2 text-sm font-medium text-gray-700 dark:text-white"
                    >
                      List Keyword
                    </label>
                    <SelectMultiple name="hs-list-keyword" token="" disabledSelect="true"/>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="hs-about-hire-us-1"
                    className="block mb-2 text-sm font-medium text-gray-700 dark:text-white"
                  >
                    File Surat
                  </label>
                  <UploadFileReader letterPath={detailLetter.letter_path} />
                </div>
              </div>
            </form>
          </Dialog.Description>

          <button
            onClick={closeDetailModal}
            className="px-4 py-2 mt-4 text-white bg-blue-500 rounded-md"
          >
            Close
          </button>
        </div>
      </Dialog>
      <Dialog
        open={isEditOpen}
        onClose={closeEditModal}
        className="fixed inset-0 z-[999] flex items-center justify-center overflow-y-auto bg-black bg-opacity-50"
      >
        <div className="p-6 m-3 mx-auto bg-white rounded-md sm:w-full sm:mx-auto sm:max-w-4xl h-fit">
          <Dialog.Title className="text-lg font-bold">Edit Surat</Dialog.Title>
          <Dialog.Description className="mt-2">
            <form>
              <div className="grid gap-4 mt-6 lg:gap-6">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:gap-6">
                  <div>
                    <label
                      htmlFor="edit-id-surat"
                      className="block mb-2 text-sm font-medium text-gray-700 dark:text-white"
                    >
                      ID Surat
                    </label>
                    <input
                      type="text"
                      onChange=""
                      name="letter_no"
                      value=""
                      id="edit-id-surat"
                      className="block w-full px-4 py-3 text-sm border border-gray-200 rounded-lg focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="edit-tanggal-surat"
                      className="block mb-2 text-sm font-medium text-gray-700 dark:text-white"
                    >
                      Tanggal Simpan
                    </label>
                    <input
                      type="date"
                      name="hs-tanggal-surat"
                      id="edit-tanggal-surat"
                      value=""
                      onChange=""
                      className="block w-full px-4 py-3 text-sm border border-gray-200 rounded-lg focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="edit-judul-surat"
                    className="block mb-2 text-sm font-medium text-gray-700 dark:text-white"
                  >
                    Judul
                  </label>
                  <input
                    type="text"
                    onChange=""
                    name="letter_title"
                    id="edit-judul-surat"
                    value=""
                    autoComplete="email"
                    className="block w-full px-4 py-3 text-sm border border-gray-200 rounded-lg focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                  />
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:gap-6">
                  <div>
                    <label
                      htmlFor="edit-tipe-surat"
                      className="block mb-2 text-sm font-medium text-gray-700 dark:text-white"
                    >
                      Tipe Surat
                    </label>
                    <SelectItem
                      name="edit-tipe-surat"
                      value=""
                      token=""
                      onChange= ""
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="edit-keyword-surat"
                      className="block mb-2 text-sm font-medium text-gray-700 dark:text-white"
                    >
                      List Keyword
                    </label>
                    <SelectMultiple
                      name="edit-list-keyword"
                      value=""
                      token=""
                      onChange=""
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="edit-file-surat"
                    className="block mb-2 text-sm font-medium text-gray-700 dark:text-white"
                  >
                    File Surat
                  </label>
                  <UploadFile token="" file="" />
                </div>

                <div>
                  <div className="flex justify-between">
                    <button
                      onClick={closeEditModal}
                      className="px-4 py-2 mt-4 text-white bg-blue-500 rounded-md"
                    >
                      Close
                    </button>
                    <Button
                      name="btn-save-edit-surat"
                      property="mt-5 px-10 bg-yellow-500 text-white hover:bg-yellow-600 focus:outline-none focus:bg-yellow-600 disabled:opacity-50 disabled:pointer-events-none"
                      content="Update"
                      saveLetter=""
                    />
                  </div>
                </div>
              </div>
            </form>
          </Dialog.Description>
        </div>
      </Dialog>
    </>

  );
}

// SVG Icons
function DetailIcon(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="2"
      stroke="currentColor"
      {...props}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
    </svg>
  );
}

function EditIcon(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="2"
      stroke="currentColor"
      {...props}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M11 4h9m-9 0H7m4 4h4m-4 4h4m-4 4h4m-4 0v-8" />
    </svg>
  );
}

function DeleteIcon(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="2"
      stroke="currentColor"
      {...props}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18V6m12 12V6m-9 9h6m-6-6h6" />
    </svg>
  );
}

// eslint-disable-next-line react/prop-types
export default function SubContent({ activeMenu }) {
  
  // const {  } = useAuth();
  const { letterData, setLetterData } = useLetter();

  const [msgSuccess, setMsgSuccess] = useState("");

  const [errMsg, setErrMsg] = useState(null);

  const [errData, setErrData] = useState([]);
  const [isMsgErr, setIsMsgErr] = useState(false);

  const [loading, setLoading] = useState(false);

  // const [viewLetter, setViewLetter] = useState([]);

  const token = Cookies.get("access_token");

  const getAllLetters = async () => {
    const BASE_URL = "http://localhost:8000/api/letters?type=&index=0";
    const options = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
      
    }
    
    try {
      const response = await axios.get(BASE_URL, options);
      const letter = response.data;
      console.log(letter.data);
      setLetterData(letter.data);
      setLoading(true)
    } catch(err) {
      console.log(err);
    }

  }

  useEffect(() => {
    getAllLetters();
  }, []);

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
    <div className="col-span-2 p-4 bg-white rounded-lg shadow-md lg:h-fit">
      {msgSuccess && (
        <div
          className="p-4 border-t-2 border-teal-500 rounded-lg bg-teal-50 dark:bg-teal-800/30"
          role="alert"
          tabIndex="-1"
          aria-labelledby="hs-bordered-success-style-label"
        >
          <div className="flex">
            <div className="shrink-0">
              <span className="inline-flex items-center justify-center text-teal-800 bg-teal-200 border-4 border-teal-100 rounded-full size-8 dark:border-teal-900 dark:bg-teal-800 dark:text-teal-400">
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
                className="font-semibold text-gray-800 dark:text-white"
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
          className="p-4 text-sm text-red-800 border border-red-200 rounded-lg bg-red-50 dark:bg-red-800/10 dark:border-red-900 dark:text-red-500"
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
                <ul className="space-y-1 list-disc ps-5">
                  {errData.map((val, idx) => (
                    <li key={idx}>{val}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
      {activeMenu === "buat_surat" && (
          <div>
              <h2 className="mb-3 text-xl font-semibold text-gray-800 dark:text-neutral-200">
                  Formulir Surat
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
                      <div className="flex justify-end">
                          <Button
                          name="btn-save-surat"
                          property="mt-5 px-10 "
                          content="Save"
                          saveLetter={submitNewLetter}
                          />
                      </div>
                      {/* <Button
                      type="button"
                      className="inline-flex items-center justify-center w-full px-4 py-3 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-lg gap-x-2 hover:bg-blue-700 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
                      
                      >
                      Create Letter */}
                  </div>
                  </div>
              </form>
          </div>
      )}
      {activeMenu === "list_surat" && (
          <div>
              <h2 className="mb-3 text-xl font-semibold text-gray-800 dark:text-neutral-200">
                  List Surat
              </h2>
              <div className="flex flex-col">
                  <div className="-m-1.5 overflow-x-auto">
                      <div className="p-1.5 min-w-full inline-block align-middle">
                      <div className="overflow-hidden">
                          <table className="min-w-full divide-y divide-gray-200">
                          <thead>
                              <tr>
                              <th scope="col" className="px-6 py-3 text-xs font-medium text-gray-500 uppercase text-start">ID</th>
                              <th scope="col" className="px-6 py-3 text-xs font-medium text-gray-500 uppercase text-start">Judul</th>
                              <th scope="col" className="px-6 py-3 text-xs font-medium text-gray-500 uppercase text-start">Tanggal</th>
                              <th scope="col" className="px-6 py-3 text-xs font-medium text-gray-500 uppercase text-start">Tipe</th>
                              <th scope="col" className="px-6 py-3 text-xs font-medium text-gray-500 uppercase text-start">Keyword</th>
                              <th scope="col" className="px-6 py-3 text-xs font-medium text-gray-500 uppercase text-end">Action</th>
                              </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-200">
                            {loading && letterData.map((val) => {
                              return (
                              <tr key={val.letter_id} className="odd:bg-white even:bg-gray-100 hover:bg-gray-100 dark:odd:bg-neutral-800 dark:even:bg-neutral-700 dark:hover:bg-neutral-700">
                                  <td className="px-6 py-4 text-sm font-medium text-gray-800 break-words whitespace-normal">{val.letter_no}</td>
                                  <td className="max-w-xs px-6 py-4 overflow-hidden text-sm text-gray-800 break-words whitespace-normal">{val.letter_title}</td>
                                  <td className="max-w-xs px-6 py-4 overflow-hidden text-sm text-gray-800 whitespace-nowrap">{val.letter_created_at}</td>
                                  <td className="max-w-xs px-6 py-4 overflow-hidden text-sm text-gray-800 break-words whitespace-normal">{val.letter_type}</td>
                                  <td className="max-w-xs px-6 py-4 space-x-2 space-y-2 overflow-hidden text-sm text-gray-800 break-words whitespace-normal">
                                    {val.letter_keywords.length != 0 && val.letter_keywords.map((word, idx) => {
                                      return (
                                      <span key={idx} className="inline-flex items-center gap-x-1.5 py-1.5 px-3 rounded-full text-xs font-medium bg-blue-600 text-white dark:bg-blue-500">{word}</span>
                                      )
                                    })}
                                    {/* <span className="inline-flex items-center gap-x-1.5 py-1.5 px-3 rounded-full text-xs font-medium bg-gray-800 text-white dark:bg-white dark:text-neutral-800">Badge</span>
                                    <span className="inline-flex items-center gap-x-1.5 py-1.5 px-3 rounded-full text-xs font-medium bg-gray-500 text-white">Badge</span>
                                    <span className="inline-flex items-center gap-x-1.5 py-1.5 px-3 rounded-full text-xs font-medium bg-teal-500 text-white">Badge</span>

                                    <span className="inline-flex items-center gap-x-1.5 py-1.5 px-3 rounded-full text-xs font-medium bg-red-500 text-white">Badge</span>
                                    <span className="inline-flex items-center gap-x-1.5 py-1.5 px-3 rounded-full text-xs font-medium bg-yellow-500 text-white">Badge</span>
                                    <span className="inline-flex items-center gap-x-1.5 py-1.5 px-3 rounded-full text-xs font-medium bg-white text-gray-600">Badge</span> */}
                                  </td>
                                  <td className="px-6 py-4 text-sm font-medium whitespace-nowrap text-end">
                                      <ActionDropdown letterId={val.letter_id} />
                                  </td>
                              </tr>
                              )
                            })}

                          </tbody>
                          </table>
                      </div>
                    </div>
                  </div>
              </div>
          </div>
      )}

      {activeMenu === "manajemen_role" && (
          <div>
              <h2 className="mb-3 text-xl font-semibold text-gray-800 dark:text-neutral-200">
                  Manajemen Role
              </h2>
              <div className="flex flex-col">
                <div className="-m-1.5 overflow-x-auto">
                  <div className="p-1.5 min-w-full inline-block align-middle">
                    <div className="overflow-hidden">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead>
                          <tr>
                            <th scope="col" className="px-6 py-3 text-xs font-medium text-gray-500 uppercase text-start">Role</th>
                            <th scope="col" className="px-6 py-3 text-xs font-medium text-gray-500 uppercase text-start">Access</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                          <tr>
                            <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap">Admin</td>
                            <td className="px-6 py-4 text-sm font-medium whitespace-nowrap text-end">
                                <div className="flex gap-x-6">
                                  <div className="flex">
                                    <input type="checkbox" className="shrink-0 mt-0.5 border-gray-200 rounded text-blue-600 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none" id="hs-checkbox-group-1" />
                                    <label htmlFor="hs-checkbox-group-1" className="text-sm text-gray-500 ms-3">Lorem, ipsum dolor sit amet consectetur adipisicing elit.</label>
                                  </div>

                                  <div className="flex">
                                    <input type="checkbox" className="shrink-0 mt-0.5 border-gray-200 rounded text-blue-600 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none" id="hs-checkbox-group-2" />
                                    <label htmlFor="hs-checkbox-group-2" className="text-sm text-gray-500 ms-3">Lorem ipsum dolor sit amet.</label>
                                  </div>

                                  <div className="flex">
                                    <input type="checkbox" className="shrink-0 mt-0.5 border-gray-200 rounded text-blue-600 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none" id="hs-checkbox-group-3" />
                                    <label htmlFor="hs-checkbox-group-3" className="text-sm text-gray-500 ms-3">Lorem ipsum dolor sit amet consectetur.</label>
                                  </div>
                                </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
          </div>
      )}
    </div>
  );
}
