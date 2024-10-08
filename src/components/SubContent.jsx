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

import { Menu } from "@headlessui/react";
import { InvalidTokenError } from "jwt-decode";
import { motion } from 'framer-motion';
// const lazyListLetter = lazy(() => import('./ListLetter'));

import _, { snakeCase } from "lodash";

/* eslint-disable react/prop-types */
function ActionDropdown(props) {
  const { letterId } = props;
  const [detailLetter, setDetailLetter] = useState({});
  const [keywordLetter, setKeywordLetter] = useState([]);

  const getCookie = Cookies.get("access_token");
  const [token, setToken] = useState(getCookie);

  const [isDetailOpen, setIsDetailOpen] = useState(false);

  const [defaultKeyLetterId, setDefaultKeyLetterId] = useState([]);

  const [isEditOpen, setIsEditOpen] = useState(false);

  const { loadingFetch, setLoadingFetch } = useLetter();

  // const [fetched, setFetched] = useState(false);
  const openDetailModal = (letterIdPassed) => {
    console.log(letterIdPassed);
    Cookies.set("letterId", letterIdPassed);
    sessionStorage.setItem("detail", true);
    setIsDetailOpen(true);
  };

  const closeDetailModal = () => {
    setIsDetailOpen(false);
    sessionStorage.removeItem("detail");
    // Cookies.remove('letter_id');
    // setFetched(false);
  };

  // const [letter, setLetter] = useState({
  //   "letter_id": "",
  //   "letter_no": "",
  //   "letter_title": "",
  //   "letter_path": "",
  //   "letter_type": "",
  //   "author_email": "",
  //   "author_name": "",
  //   "author_username": "",
  //   "letter_keywords": [],
  //   "letter_created_at": ""
  // });

  const openEditModal = () => {
    Cookies.set("letterId", letterId);
    sessionStorage.setItem("edit", true);
    setIsEditOpen(true);
  };

  const closeEditModal = () => {
    setIsEditOpen(false);
    sessionStorage.removeItem("edit");
    // Cookies.remove('letter_id');
  };

  //   useEffect(() => {
  //   if (isDetailOpen && letterId && !fetched) {
  //     getDetailLetter(letterId);
  //   }
  // }, [isDetailOpen, letterId, fetched]);

  useEffect(() => {
    const letterIdPassed = Cookies.get("letterId");
    if (isDetailOpen || isEditOpen) {
      getDetailLetter(letterIdPassed);
      // setFetched(true);
    }
  }, [isDetailOpen, isEditOpen]);

  const getDetailLetter = async (letterId) => {
    // if (!letterId) return;
    setToken(getCookie);
    const BASE_URL = `http://localhost:8000/api/letter/${letterId}`;
    const options = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const response = await axios.get(BASE_URL, options);
      console.log(response.data.data.created_at);

      const letterDateString = response.data.data.created_at;

      const date = new Date(letterDateString);

      const day = String(date.getDate()).padStart(2, "0");
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const year = date.getFullYear();

      const formattedDate = `${day}/${month}/${year}`;

      response.data.data.created_at = formattedDate;

      const { data, keywords_data } = response.data;

      setDetailLetter(data);
      let datas = [];
      let keysDataLetters = [];
      let keyword = {
        value: "",
        label: "",
      };
      keywords_data.forEach((val) => {
        let keyword = {
          value: val.keyword_name,
          label: val.id,
        };
        keysDataLetters.push(val.id);
        datas.push(keyword);
      });
      setDefaultKeyLetterId(keysDataLetters);
      setKeywordLetter(datas);
      // setFetched(true);
      // Cookies.remove("letterId");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    console.log(detailLetter);
  }, [detailLetter]);

  // useEffect(() => {
  //   const letterId = Cookies.get('letter_id');

  // }, []);

  const { letterKeyAh, letterFull } = useLetter();

  useEffect(() => {
    console.log(defaultKeyLetterId);
  }, [defaultKeyLetterId])

  const editChangeLetter = (e) => {
    const { name, value } = e.target;
    setDetailLetter((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const updateLetter = async () => {
    const letterIdPassed = Cookies.get("letterId"); 
    setToken(getCookie);
    const BASE_URL = `http://localhost:8000/api/letter/${letterIdPassed}`;
    
    const options = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
  
    const payload = {
      letter_no: detailLetter.letter_no,
      letter_title: detailLetter.letter_title,
      letter_id_type: letterFull.letter_id_type !== undefined ? letterFull.letter_id_type : detailLetter.letter_id_type.id,
      letter_keywords: letterKeyAh.letter_keywords ?? defaultKeyLetterId,
      letter_path: detailLetter.letter_path,
    };
  
    try {
      const response = await axios.put(BASE_URL, payload, options);
      console.log("Surat berhasil diperbarui:", response.data);
      closeEditModal();
    } catch (error) {
      console.error("Gagal memperbarui surat:", error);
    }
  };
  
  useEffect(() => {
    console.log(detailLetter);
  }, [detailLetter]);

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
        <Menu.Items className="fixed right-0 z-50 w-48 mt-2 bg-white divide-y divide-gray-100 rounded-md shadow-lg focus:outline-none">
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
                  onClick={() => openEditModal(letterId)}
                  className={`${
                    active ? "bg-gray-100 text-gray-900" : "text-gray-700"
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
                    active ? "bg-gray-100 text-gray-900" : "text-gray-700"
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
          <Dialog.Title className="text-lg font-bold">
            Detail Surat
          </Dialog.Title>
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
                    <SelectItem
                      name="hs-tipe-surat"
                      token=""
                      disabledSelect="true"
                      typeLetter={detailLetter.letter_type}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="hs-keyword-surat"
                      className="block mb-2 text-sm font-medium text-gray-700 dark:text-white"
                    >
                      List Keyword
                    </label>
                    <SelectMultiple
                      name="hs-list-keyword"
                      token=""
                      disabledSelect="true"
                      keywordsLetter={detailLetter.letter_keywords}
                    />
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
                      name="letter_no"
                      onChange={editChangeLetter}
                      value={detailLetter.letter_no}
                      id="edit-id-surat"
                      className="block w-full px-4 py-3 text-sm border border-gray-200 rounded-lg focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                      disabled
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
                      type="text"
                      name="hs-tanggal-surat"
                      id="edit-tanggal-surat"
                      onChange={editChangeLetter}
                      value={detailLetter.created_at}
                      disabled
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
                    onChange={editChangeLetter}
                    value={detailLetter.letter_title}
                    name="letter_title"
                    disabled={loadingFetch}
                    id="edit-judul-surat"
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
                      token={token}
                      onChange=""
                      defaultData={detailLetter.letter_type}
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
                      token={token}
                      onChange=""
                      defaultData={keywordLetter}
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
                      saveLetter={updateLetter}
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

function CreateRole() {
  const getCookie = Cookies.get("access_token");
  const [token, setToken] = useState(getCookie);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [permissions, setPermissions] = useState([]);
  const [fetchPermissionLoading, setFetchPermissionLoading] = useState(null);

  const getAllPermissionPoints = async () => {
    setToken(getCookie);
    setFetchPermissionLoading(true);
    const BASE_URL = "http://localhost:8000/api/permissions";
    const options = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const response = await axios.get(BASE_URL, options);
      console.log(response.data);
      const { success, data } = response.data;
      setPermissions(data);
    } catch (error) {
      console.log(error);
    } finally {
      setFetchPermissionLoading(false);
    }
  };

  useEffect(() => {
    if (!isCreateOpen) return;
    getAllPermissionPoints();
  }, [isCreateOpen]);

  const openCreateModal = () => {
    setIsCreateOpen(true);
  };

  const closeCreateModal = () => {
    setIsCreateOpen(false);
  };

  const [checkedPermissions, setCheckedPermissions] = useState({
    role_name: "",
    permission_id: [],
  });

  const handleRoleName = (e) => {
    const { name, value } = e.target;
    setCheckedPermissions((prev) => ({
      ...prev,
      [name]: snakeCase(value),
    }));
  };

  const handleCheckboxChange = (val) => {
    setCheckedPermissions((prevState) => {
      if (prevState.permission_id.includes(val.id)) {
        // Jika checkbox dimatikan, hapus dari array
        return {
          ...prevState,
          permission_id: prevState.permission_id.filter((id) => id !== val.id),
        };
      } else {
        // Jika checkbox dinyalakan, tambahkan ke array
        return {
          ...prevState,
          permission_id: [...prevState.permission_id, val.id],
        };
      }
    });
  };

  const addNewRole = async (e) => {
    e.preventDefault();
    setToken(getCookie);

    const BASE_URL = "http://localhost:8000/api/role";
    const options = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const body = JSON.stringify(checkedPermissions);

    try {
      const response = await axios.post(BASE_URL, body, options);
      console.log(response.data);
      setCheckedPermissions({
        role_name: "",
        permission_id: [],
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    console.log(checkedPermissions);
  }, [checkedPermissions]);

  useEffect(() => {
    console.log(permissions);
  }, [permissions]);

  return (
    <>
      <a
        className="inline-flex items-center px-3 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-lg gap-x-2 hover:bg-blue-700 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
        onClick={openCreateModal}
      >
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
          <path d="M5 12h14" />
          <path d="M12 5v14" />
        </svg>
        Add role
      </a>
      <Dialog
        open={isCreateOpen}
        onClose={closeCreateModal}
        className="fixed inset-0 z-[999] flex items-center justify-center overflow-y-auto bg-black bg-opacity-50"
      >
        <div className="p-6 m-3 mx-auto bg-white rounded-md sm:w-full sm:mx-auto sm:max-w-4xl h-fit">
          <Dialog.Title className="text-lg font-bold">Add Role</Dialog.Title>
          <Dialog.Description className="mt-2">
            <form>
              <div className="grid gap-4 mt-6 lg:gap-6">
                <div>
                  <label
                    htmlFor="hs-judul-surat"
                    className="block mb-2 text-sm font-medium text-gray-700 dark:text-white"
                  >
                    Nama
                  </label>
                  <input
                    type="text"
                    onChange={handleRoleName}
                    // value={checkedPermissions.role_name}
                    name="role_name"
                    id="hs-judul-surat"
                    autoComplete="email"
                    className="block w-full px-4 py-3 text-sm border border-gray-200 rounded-lg focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                  />
                </div>
                <div>
                  <label
                    htmlFor="hs-judul-surat"
                    className="block mb-2 text-sm font-medium text-gray-700 dark:text-white"
                  >
                    Permission Access
                  </label>
                  <div className="border border-gray-200 rounded-lg">
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-neutral-700 ">
                      <tbody className="divide-y divide-gray-200 dark:divide-neutral-700">
                        {!fetchPermissionLoading ? (
                          <>
                            <tr className="divide-x divide-gray-200 dark:divide-neutral-700">
                              <td className="size-px whitespace-nowrap">
                                <div className="px-6 py-3">
                                  <span className="font-bold text-gray-600 text-md dark:text-neutral-400">
                                    Manajemen Surat
                                  </span>
                                </div>
                              </td>
                            </tr>
                            {permissions?.letter?.map((val) => (
                              <tr
                                key={val.id}
                                className="divide-x divide-gray-200 dark:divide-neutral-700"
                              >
                                <td className="size-px whitespace-nowrap">
                                  <div className="px-6 py-3">
                                    <span className="text-sm text-gray-600 dark:text-neutral-400">
                                      {val.permission_name}
                                    </span>
                                  </div>
                                </td>

                                <td className="size-px whitespace-nowrap">
                                  <div className="py-3 ps-6">
                                    <label
                                      htmlFor={`letter-checkbox-${val.id}`}
                                      className="flex"
                                    >
                                      <input
                                        type="checkbox"
                                        className="text-blue-600 border-gray-300 rounded shrink-0 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-600 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
                                        id={`letter-checkbox-${val.id}`}
                                        checked={checkedPermissions.permission_id.includes(
                                          val.id
                                        )}
                                        onChange={() =>
                                          handleCheckboxChange(val)
                                        }
                                      />
                                      <span className="sr-only">Checkbox</span>
                                    </label>
                                  </div>
                                </td>
                              </tr>
                            ))}

                            <tr className="divide-x divide-gray-200 dark:divide-neutral-700">
                              <td className="size-px whitespace-nowrap">
                                <div className="px-6 py-3">
                                  <span className="font-bold text-gray-600 text-md dark:text-neutral-400">
                                    Manajemen User
                                  </span>
                                </div>
                              </td>
                            </tr>

                            {permissions?.user?.map((val) => (
                              <tr
                                key={val.id}
                                className="divide-x divide-gray-200 dark:divide-neutral-700"
                              >
                                <td className="size-px whitespace-nowrap">
                                  <div className="px-6 py-3">
                                    <span className="text-sm text-gray-600 dark:text-neutral-400">
                                      {val.permission_name}
                                    </span>
                                  </div>
                                </td>

                                <td className="size-px whitespace-nowrap">
                                  <div className="py-3 ps-6">
                                    <label
                                      htmlFor={`users-checkbox-${val.id}`}
                                      className="flex"
                                    >
                                      <input
                                        type="checkbox"
                                        className="text-blue-600 border-gray-300 rounded shrink-0 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-600 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
                                        id={`users-checkbox-${val.id}`}
                                        checked={checkedPermissions.permission_id.includes(
                                          val.id
                                        )}
                                        onChange={() =>
                                          handleCheckboxChange(val)
                                        }
                                      />
                                      <span className="sr-only">Checkbox</span>
                                    </label>
                                  </div>
                                </td>
                              </tr>
                            ))}

                            <tr className="divide-x divide-gray-200 dark:divide-neutral-700">
                              <td className="size-px whitespace-nowrap">
                                <div className="px-6 py-3">
                                  <span className="font-bold text-gray-600 text-md dark:text-neutral-400">
                                    Manajemen Role
                                  </span>
                                </div>
                              </td>
                            </tr>

                            {permissions?.role?.map((val) => (
                              <tr
                                key={val.id}
                                className="divide-x divide-gray-200 dark:divide-neutral-700"
                              >
                                <td className="size-px whitespace-nowrap">
                                  <div className="px-6 py-3">
                                    <span className="text-sm text-gray-600 dark:text-neutral-400">
                                      {val.permission_name}
                                    </span>
                                  </div>
                                </td>

                                <td className="size-px whitespace-nowrap">
                                  <div className="py-3 ps-6">
                                    <label
                                      htmlFor={`users-checkbox-${val.id}`}
                                      className="flex"
                                    >
                                      <input
                                        type="checkbox"
                                        className="text-blue-600 border-gray-300 rounded shrink-0 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-600 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
                                        id={`users-checkbox-${val.id}`}
                                        checked={checkedPermissions.permission_id.includes(
                                          val.id
                                        )}
                                        onChange={() =>
                                          handleCheckboxChange(val)
                                        }
                                      />
                                      <span className="sr-only">Checkbox</span>
                                    </label>
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </>
                        ) : (
                          <tr>
                            <td colSpan="2"></td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </form>
          </Dialog.Description>
          <div className="flex justify-between mt-5">
            <button
              onClick={closeCreateModal}
              className="px-4 py-2 mt-4 text-white bg-blue-500 rounded-md"
            >
              Close
            </button>

            <button
              // onClick={}
              className="px-4 py-2 mt-4 ml-2 text-white bg-green-600 rounded-md"
              onClick={addNewRole}
            >
              Save
            </button>
          </div>             
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
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M11 4h9m-9 0H7m4 4h4m-4 4h4m-4 4h4m-4 0v-8"
      />
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
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6 18V6m12 12V6m-9 9h6m-6-6h6"
      />
    </svg>
  );
}

export default function SubContent({ activeMenu }) {
  // const {  } = useAuth();
  const { letterData, setLetterData } = useLetter();

  const [msgSuccess, setMsgSuccess] = useState("");

  const [errMsg, setErrMsg] = useState(null);

  const [errData, setErrData] = useState([]);
  const [isMsgErr, setIsMsgErr] = useState(false);

  const [loading, setLoading] = useState(false);

  // const [viewLetter, setViewLetter] = useState([]);

  const getCookie = Cookies.get("access_token");
  const [token, setToken] = useState(getCookie);
  const [disableNext, setDisableNext] = useState(false);

  // useEffect(() => {
  //   setToken();
  // }, [token]);

  // const [search, setSearch] = useState("");

  const getAllLetters = async () => {
    setToken(getCookie);
    const BASE_URL = `http://localhost:8000/api/letters?type=&index=${page}&keyword=${debouncedSearch}`;
    const options = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const response = await axios.get(BASE_URL, options);
      const letter = response.data;
      console.log(letter.data);
      setLetterData(letter.data);
      // setLetterTotalFetched()
      if (letter.data.length < 10) {
        setDisableNext(true);
      } else {
        setDisableNext(false);
      }
      setLoading(true);
    } catch (err) {
      console.log(err);
    }
  };

  const [page, setPage] = useState(0);

  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState(search);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
    }, 250);

    return () => {
      clearTimeout(handler);
    };
  }, [search]);

  useEffect(() => {
    if (sessionStorage.getItem('activeMenu') !== "list_surat") return;
    if (debouncedSearch !== null && debouncedSearch !== undefined) {
      getAllLetters();
    }
  }, [debouncedSearch, page]);

  const createLetterInput = (e) => {
    const { name, value } = e.target;
    setLetterData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const submitNewLetter = async () => {
    setToken(getCookie);
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

  const [datas, setDatas] = useState([]);
  const [loadingFetchRoles, setLoadingFetchRoles] = useState(null);

  const fetchAllRolesWithPermissions = async () => {
    setToken(getCookie);
    setLoadingFetchRoles(true);

    const options = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const BASE_URL = "http://localhost:8000/api/roles";
    try {
      const response = await axios.get(BASE_URL, options);
      const { success, data } = response.data;
      if (success) {
        setDatas(data);
        // setLetterData({});
      }
    } catch (error) {
      // const { errors, message } = error.response.data;
      console.log(error);
      // setErrMsg(error.response?.data);
    } finally {
      setLoadingFetchRoles(false);
    }
  };

  useEffect(() => {
    if (sessionStorage.getItem("activeMenu") !== "manajemen_role") return;

    fetchAllRolesWithPermissions();
  }, []);

  useEffect(() => {
    console.log(datas["client"]);
  }, [datas]);

  return (
    <motion.div className="col-span-2 p-4 bg-white rounded-lg shadow-md lg:h-fit"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
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
                  <SelectItem name="hs-tipe-surat" tokenProps={token} />
                </div>

                <div>
                  <label
                    htmlFor="hs-keyword-surat"
                    className="block mb-2 text-sm font-medium text-gray-700 dark:text-white"
                  >
                    List Keyword
                  </label>
                  <SelectMultiple name="hs-list-keyword" tokenProps={token} />
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
                <div className="grid grid-cols-2 gap-2 py-4 border-b border-gray-200 md:flex md:justify-between md:items-center dark:border-neutral-700">
                  <div className="col-span-1" style={{ width: "30%" }}>
                    <label
                      htmlFor="hs-as-table-product-review-search"
                      className="sr-only"
                    >
                      Search
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        id="hs-as-table-product-review-search"
                        name="hs-as-table-product-review-search"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="block w-full px-3 py-2 text-sm border border-gray-200 rounded-lg ps-11 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                        placeholder="Search"
                      />
                      <div className="absolute inset-y-0 flex items-center pointer-events-none start-0 ps-4">
                        <svg
                          className="text-gray-400 shrink-0 size-4 dark:text-neutral-500"
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
                          <circle cx="11" cy="11" r="8" />
                          <path d="m21 21-4.3-4.3" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="overflow-hidden">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead>
                      <tr>
                        <th
                          scope="col"
                          className="px-6 py-3 text-xs font-medium text-gray-500 uppercase text-start"
                        >
                          ID
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-xs font-medium text-gray-500 uppercase text-start"
                        >
                          Judul
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-xs font-medium text-gray-500 uppercase text-start"
                        >
                          Tanggal
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-xs font-medium text-gray-500 uppercase text-start"
                        >
                          Tipe
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-xs font-medium text-gray-500 uppercase text-start"
                        >
                          Keyword
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-xs font-medium text-gray-500 uppercase text-end"
                        >
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {loading &&
                        letterData.map((val) => {
                          return (
                            <tr
                              key={val.letter_id}
                              className="odd:bg-white even:bg-gray-100 hover:bg-gray-100 dark:odd:bg-neutral-800 dark:even:bg-neutral-700 dark:hover:bg-neutral-700"
                            >
                              <td className="px-6 py-4 text-sm font-medium text-gray-800 break-words whitespace-normal">
                                {val.letter_no}
                              </td>
                              <td className="max-w-xs px-6 py-4 overflow-hidden text-sm text-gray-800 break-words whitespace-normal">
                                {val.letter_title}
                              </td>
                              <td className="max-w-xs px-6 py-4 overflow-hidden text-sm text-gray-800 whitespace-nowrap">
                                {val.letter_created_at}
                              </td>
                              <td className="max-w-xs px-6 py-4 overflow-hidden text-sm text-gray-800 break-words whitespace-normal">
                                {val.letter_type}
                              </td>
                              <td className="max-w-xs px-6 py-4 space-x-2 space-y-2 overflow-hidden text-sm text-gray-800 break-words whitespace-normal">
                                {val.letter_keywords.length != 0 &&
                                  val.letter_keywords.map((word, idx) => {
                                    return (
                                      <span
                                        key={idx}
                                        className="inline-flex items-center gap-x-1.5 py-1.5 px-3 rounded-full text-xs font-medium bg-blue-600 text-white dark:bg-blue-500"
                                      >
                                        {word}
                                      </span>
                                    );
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
                          );
                        })}
                    </tbody>
                  </table>
                </div>
                <div className="grid gap-3 px-6 py-4 border-t border-gray-200 md:flex md:justify-between md:items-center dark:border-neutral-700">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-neutral-400">
                      <span className="font-semibold text-gray-800 dark:text-neutral-200">
                        22
                      </span>{" "}
                      results
                    </p>
                  </div>

                  <div>
                    {/* <div className="inline-flex gap-x-2">
                            <button type="button" className="py-1.5 px-2 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:bg-gray-50 dark:bg-transparent dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800">
                              <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
                              Prev
                            </button>

                            <button type="button" className="py-1.5 px-2 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:bg-gray-50 dark:bg-transparent dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800">
                              Next
                              <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
                            </button>
                          </div> */}
                    <nav
                      className="flex items-center gap-x-1"
                      aria-label="Pagination"
                    >
                      {/* <button type="button" onClick={(e) => setPage(page - 1)} className="min-h-[38px] min-w-[38px] py-2 px-2.5 inline-flex justify-center items-center gap-x-1.5 text-sm rounded-lg text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10" aria-label="Previous" disabled="true"> */}
                      <button
                        type="button"
                        onClick={(e) => setPage(page - 1)}
                        className="min-h-[38px] min-w-[38px] py-2 px-2.5 inline-flex justify-center items-center gap-x-1.5 text-sm rounded-lg text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10"
                        aria-label="Previous"
                        disabled={page === 0 ? true : false}
                      >
                        <svg
                          className="shrink-0 size-3.5"
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
                          <path d="m15 18-6-6 6-6"></path>
                        </svg>
                        <span>Previous</span>
                      </button>
                      <div className="flex items-center gap-x-1">
                        <button
                          type="button"
                          className="min-h-[38px] min-w-[38px] flex justify-center items-center bg-gray-200 text-gray-800 py-2 px-3 text-sm rounded-lg focus:outline-none focus:bg-gray-300 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-600 dark:text-white dark:focus:bg-neutral-500"
                          aria-current="page"
                        >
                          1
                        </button>
                        <button
                          type="button"
                          className="min-h-[38px] min-w-[38px] flex justify-center items-center text-gray-800 hover:bg-gray-100 py-2 px-3 text-sm rounded-lg focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10"
                        >
                          2
                        </button>
                        <button
                          type="button"
                          className="min-h-[38px] min-w-[38px] flex justify-center items-center text-gray-800 hover:bg-gray-100 py-2 px-3 text-sm rounded-lg focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10"
                        >
                          3
                        </button>
                      </div>
                      <button
                        type="button"
                        onClick={(e) => setPage(page + 1)}
                        className="min-h-[38px] min-w-[38px] py-2 px-2.5 inline-flex justify-center items-center gap-x-1.5 text-sm rounded-lg text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10"
                        aria-label="Next"
                        disabled={disableNext}
                      >
                        <span>Next</span>
                        <svg
                          className="shrink-0 size-3.5"
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
                          <path d="m9 18 6-6-6-6"></path>
                        </svg>
                      </button>
                    </nav>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {activeMenu === "manajemen_role" && (
        <div>
          <div className="flex items-center justify-between">
            <h2 className="mb-3 text-xl font-semibold text-gray-800 dark:text-neutral-200">
              Manajemen Role
            </h2>
            <CreateRole />
          </div>
          <div className="flex flex-col">
            <div className="-m-1.5 overflow-x-auto">
              <div className="p-1.5 min-w-full inline-block align-middle">
                <div className="overflow-hidden">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead>
                      <tr>
                        <th
                          scope="col"
                          className="px-6 py-3 text-xs font-medium text-gray-500 uppercase text-start"
                        >
                          Role
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-xs font-medium text-gray-500 uppercase text-start"
                        >
                          Access
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {!loadingFetchRoles &&
                        Object.entries(datas).map(
                          ([role, permissions], idx) => (
                            <tr key={idx}>
                              <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap">
                                {_.startCase(_.toLower(role))}
                              </td>
                              <td className="px-6 py-4 text-sm font-medium whitespace-nowrap text-end">
                                <div className="flex gap-x-6">
                                  {permissions.map((permission) => (
                                    <div
                                      key={permission.permission_id}
                                      className="flex"
                                    >
                                      <input
                                        type="checkbox"
                                        className="shrink-0 mt-0.5 border-gray-200 rounded text-blue-600 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                                        id={`checkbox-${permission.permission_id}`}
                                      />
                                      <label
                                        htmlFor={`checkbox-${permission.permission_id}`}
                                        className="text-sm text-gray-500 ms-3"
                                      >
                                        {permission.permission_name}
                                      </label>
                                    </div>
                                  ))}
                                </div>
                              </td>
                            </tr>
                          )
                        )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {activeMenu === "ubah_role" && (
        <div>
          <div className="flex items-center justify-between">
            <h2 className="mb-3 text-xl font-semibold text-gray-800 dark:text-neutral-200">
              Ubah Role
            </h2>
          </div>
          <form>
            <div className="grid gap-4 mt-6 lg:gap-6">
              <div>
                <label
                  htmlFor="hs-judul-surat"
                  className="block mb-2 text-sm font-medium text-gray-700 dark:text-white"
                >
                  Email
                </label>
                <input
                  type="email"
                  onChange=""
                  name="hs-email-user"
                  id="hs-email-user"
                  className="block w-full px-4 py-3 text-sm border border-gray-200 rounded-lg focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                />
              </div>

              <div className="block mb-2 text-sm font-medium text-gray-700 dark:text-white">
                <div>
                  <label
                    htmlFor="hs-tipe-surat"
                    className="block mb-2 text-sm font-medium text-gray-700 dark:text-white"
                  >
                    Role User
                  </label>
                  <SelectItem name="hs-role-user" tokenProps="" />
                </div>
              </div>
              <div>
                <div className="flex justify-end">
                  <Button
                    name="btn-save-role"
                    property="mt-5 px-10 "
                    content="Save"
                    saveLetter=""
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
    </motion.div>
  );
}
