import axios from "axios";
import { useEffect, useState } from "react";
import { useLetter } from "../hooks/useLetter";

/* eslint-disable react/prop-types */
export default function SelectItem(props) {
  const { name, token, disabledSelect } = props;

  const [success, setSuccess] = useState(false);
  const [types, setTypes] = useState([]);
  const { letterData, setLetterData } = useLetter();
  const [loading, setLoading] = useState(true);

  const BASE_URL = "http://localhost:8000/api/letter_types";
  const options = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const getAllType = async () => {
    setLoading(true);
    try {
      const response = await axios.get(BASE_URL, options);
      const { success, types } = response.data;
      setSuccess(success);
      setTypes(types);
      // localStorage.setItem('types');
    } catch (err) {
      setSuccess(false);
      console.log(err);
    } finally {
      setLoading(false); // Fetch selesai, set loading false
    }
  };


  useEffect(() => {
    if (sessionStorage.getItem('activeMenu') !== 'buat_surat') return;
    getAllType();
  }, []);

  const changeSelectType = (e) => {
    setLetterData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  // useEffect(() => {
  //   console.log(letterData);
  // }, [letterData]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="relative">
      <select
        data-hs-select='{
                  "placeholder": "<span class=\"inline-flex items-center\">Tipe Surat</span>",
                  "toggleTag": "<button type=\"button\"></button>",
                  "toggleClasses": "hs-select-disabled:pointer-events-none hs-select-disabled:opacity-50 relative py-3 px-4 pe-9 flex text-nowrap w-full cursor-pointer bg-white border border-gray-200 rounded-lg text-start text-sm focus:border-blue-500 focus:ring-blue-500 before:absolute before:inset-0 before:z-[1] dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600",
                  "dropdownClasses": "mt-2 z-50 w-full max-h-[300px] p-1 space-y-0.5 bg-white border border-gray-200 rounded-lg overflow-hidden overflow-y-auto dark:bg-slate-900 dark:border-gray-700",
                  "optionClasses": "py-2 px-4 w-full text-sm text-gray-800 cursor-pointer hover:bg-gray-100 rounded-lg focus:outline-none focus:bg-gray-100 dark:bg-slate-900 dark:hover:bg-slate-800 dark:text-gray-200 dark:focus:bg-slate-800",
                  "optionTemplate": "<div class=\"flex justify-between items-center w-full\"><span data-title></span><span class=\"hidden hs-selected:block\"><svg class=\"flex-shrink-0 w-3.5 h-3.5 text-blue-600 dark:text-blue-500\" xmlns=\"http:.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><polyline points=\"20 6 9 17 4 12\"/></svg></span></div>"
                }'
        id={name}
        name="letter_id_type"
        disabled={disabledSelect}
        onChange={changeSelectType}
        className="block w-full px-3 py-3 mt-1 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        style={{ appearance: "none", background: "none", paddingRight: "30px" }}
      >
        <option value="">Pilih Tipe Surat</option>
        {success &&
          types.map((val) => (
            <option key={val.id} value={val.id}>
              {val.letter_type_name}
            </option>
          ))}
      </select>
      <div className="absolute -translate-y-1/2 top-1/2 end-3">
        <svg
          className="flex-shrink-0 w-3.5 h-3.5 text-gray-500 dark:text-gray-500"
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
          <path d="m7 15 5 5 5-5" />
          <path d="m7 9 5-5 5 5" />
        </svg>
      </div>
    </div>
  );
}
