import axios from "axios";
import { useEffect, useState } from "react";
import { useLetter } from "../hooks/useLetter";
import Cookies from 'js-cookie';

/* eslint-disable react/prop-types */
export default function SelectItem(props) {
  const { name, tokenProps, disabledSelect, waiting, letterType } = props;

  const { loadingFetch, setLoadingFetch } = useLetter();

  const [success, setSuccess] = useState(false);
  const [types, setTypes] = useState([]);
  const { letterData, setLetterData } = useLetter();
  const [loading, setLoading] = useState(true);

  const [token, setToken] = useState(Cookies.get('access_token'));
  const [selectedType, setSelectedType] = useState(-1);
  // const [selectedType, setSelectedType] = useState(letterType); // state for selected letterType

  const BASE_URL = `http://localhost:8000/api/letter_types?selected=${selectedType}`;
  const options = {
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
  };

  const getAllType = async () => {
    setLoading(true);
    try {
      const response = await axios.get(BASE_URL, options);
      const { success, types } = response.data;
      setSuccess(true);
      setTypes(types);
    } catch (err) {
      setSuccess(false);
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const [letterFull, setLetterFull] = useState(null);
  const [letterTypeAh, setLetterTypeAh] = useState({});
  const [loadNew, setLoadNew] = useState(null);

  const getLetterEdit = async (letterId) => {
    setLoadNew(true);
    setLoadingFetch(true);

    const SECONDARY_URL = `http://localhost:8000/api/letter/${letterId}`;
    try {
      const response = await axios.get(SECONDARY_URL, options);
      const { data, keywords_data } = response.data;
      console.log(response.data);
      // setSuccess(true);
      // setTypes(types);

      setLetterFull(keywords_data);
      // data.letter_id_type.map((val, idx) => {
      //   if(idx === val - 1)
      //     setLetterTypeAh(val);
      //     return;
      // });
      setLetterTypeAh(data.letter_id_type);
      setSelectedType(data.letter_id_type.id);
    } catch (err) {
      // setSuccess(false);
      console.log(err);
    } finally {
      setLoadNew(false);
      setLoadingFetch(false);
    }
  };

  useEffect(() => {
    if (
      sessionStorage.getItem("activeMenu") !== "buat_surat" &&
      !sessionStorage.getItem("detail")
    )
      if (!sessionStorage.getItem("edit")) {
        return;
      } 
      else {
        const letterId = Cookies.get('letterId');
        getLetterEdit(letterId);
      }

    getAllType();
  }, [selectedType]);

  const changeSelectType = (e) => {
    const value = e.target.value;
    // setSelectedType(value); // Update selected type when user changes
    if (sessionStorage.getItem('edit')) {
      setLetterFull((prev) => ({
        ...prev,
        [e.target.name]: value,
      }));
      return;
    }
    setLetterData((prev) => ({
      ...prev,
      [e.target.name]: value,
    }));
  };

  // useEffect(() => {
  //   console.log('ayam ' + letterData);
  // }, [letterData]);

  useEffect(() => {
    console.log(letterTypeAh);
  }, [letterTypeAh]);

  if (loading && !sessionStorage.getItem("detail")) {
    return (
      <div className="flex animate-pulse">
        <div className="w-full">
          <ul className="mt-3 space-y-3 mr-5">
            <li className="w-full h-4 bg-gray-200 rounded-full dark:bg-neutral-700"></li>
          </ul>
        </div>
      </div>
    );
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
        disabled={loadNew}
        // disabled={disabledSelect}
        onChange={changeSelectType}
        // value={selectedType} // Use the selected type state
        className={`block w-full px-3 py-3 mt-1 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
        style={{ appearance: "none", background: "none", paddingRight: "30px" }}
      >
        {loadNew ? (<option value="">Pilih Tipe Surat</option>):(<option value={letterTypeAh.id}>{letterTypeAh.letter_type_name}</option>)}
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
