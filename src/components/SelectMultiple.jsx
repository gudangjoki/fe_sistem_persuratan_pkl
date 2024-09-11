import { useState, useEffect } from "react";
import Select from "react-select";
import axios from "axios";
import { useLetter } from "../hooks/useLetter";
import Cookies from 'js-cookie';

/* eslint-disable react/prop-types */
export default function SelectMultiple(props) {
  const { name, tokenProps, disabledSelect, defaultData } = props;

  const { loadingFetch, setLoadingFetch } = useLetter();

  const [success, setSuccess] = useState(false);
  const [types, setTypes] = useState([]);
  const [loading, setLoading] = useState(false);

  const getCookie = Cookies.get('access_token');

  const [token, setToken] = useState(getCookie);

  const { letterData, setLetterData } = useLetter();

  // const BASE_URL = 'http://localhost:8000/api/keywords?index=0&search=ma';
  const BASE_URL = "http://localhost:8000/api/keywords";
  const options = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const getAllType = async () => {
    setToken(getCookie);
    setLoading(true);
    try {
      const response = await axios.get(BASE_URL, options);
      const { index, keywords } = response.data;
      setSuccess(true);
      setTypes(
        keywords.map((keyword) => ({
          value: keyword.id,
          label: keyword.keyword_name,
        }))
      );
    } catch (err) {
      setSuccess(false);
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const [letterKeyAh, setLetterKeyAh] = useState([]);
  //combine with select item component, data letter full butuh buat update
  const [letterFull, setLetterFull] = useState([]);
  const [loadNew, setLoadNew] = useState(null);

  const getKeywordEdit = async (letterId) => {
    setToken(getCookie);
    setLoadNew(true);
    setLoadingFetch(true);

    const SECONDARY_URL = `http://localhost:8000/api/letter/${letterId}`;
    try {
      const response = await axios.get(SECONDARY_URL, options);
      const { data, keywords_data } = response.data;
      console.log(response.data);
      // setSuccess(true);
      // setTypes(types);
      setLetterKeyAh(
        keywords_data.map((keyword_data) => ({
          value: keyword_data.id,
          label: keyword_data.keyword_name,
        }))
      );
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
      sessionStorage.getItem("activeMenu") !== "buat_surat"
    )
    if (!sessionStorage.getItem("edit") && !sessionStorage.getItem("detail")) {
      return;
    } else {
      const letterId = Cookies.get('letterId');
      getKeywordEdit(letterId);  
    }

    getAllType();
  }, [token]);

  const handleKeywords = (selectedKeywords) => {
    const newKeywordTemp = [];
    selectedKeywords.map((val) => {
      newKeywordTemp.push(val.value);
    });
    if (sessionStorage.getItem('edit')) {
      setLetterKeyAh((prev) => ({
        ...prev,
        letter_keywords: newKeywordTemp,
      }));
      return;
    }
    // console.log(newKeywordTemp);
    setLetterData((prev) => ({
      ...prev,
      letter_keywords: newKeywordTemp,
    }));
  };

  useEffect(() => {
    console.log(letterData);
  }, [letterData]);

  useEffect(() => {
    console.log(letterKeyAh);
  }, [letterKeyAh]);


  const customStyles = {
    control: (provided) => ({
      ...provided,
      padding: "4px 4px",
      borderColor: "rgb(209 213 219)",
      boxShadow: "0 1px 2px rgba(0, 0, 0, 0.1)",
      borderRadius: "0.375rem",
      width: "100%",
      backgroundColor: "white",
      "&:hover": {
        borderColor: "indigo",
      },
      "&:focus": {
        borderColor: "indigo",
      },
    }),
    placeholder: (provided) => ({
      ...provided,
      color: "gray",
      fontSize: "0.875rem",
    }),
    menu: (provided) => ({
      ...provided,
      borderRadius: "0.375rem",
      boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? "indigo" : "white",
      color: state.isSelected ? "white" : "black",
      "&:hover": {
        backgroundColor: "indigo",
        color: "white",
      },
    }),
  };

  if (loading || loadingFetch && !sessionStorage.getItem("detail")) {
    return (
      <div className="flex animate-pulse">
        {/* <div className="shrink-0">
              <span className="size-12 block bg-gray-200 rounded-full dark:bg-neutral-700"></span>
            </div> */}

        <div className="w-full">
          {/* <p className="h-4 bg-gray-200 rounded-full dark:bg-neutral-700" style={{ width: "40%"}}></p> */}

          <ul className="mt-3 space-y-3 mr-5">
            <li className="w-full h-4 bg-gray-200 rounded-full dark:bg-neutral-700"></li>
          </ul>
        </div>
      </div>
    );
  }

  return (
    <Select
      name={name}
      options={types}
      isMulti
      placeholder="Select options..."
      className="basic-multi-select"
      classNamePrefix="select"
      onChange={handleKeywords}
      styles={customStyles}
      isDisabled={disabledSelect}
      style={{ appearance: "none", background: "none", paddingRight: "30px" }}
      value={(!loadingFetch && letterKeyAh.length > 0) ? letterKeyAh : undefined}
    />
  );
}
