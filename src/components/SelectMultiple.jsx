import { useState, useEffect } from "react";
import Select from "react-select";
import axios from "axios";
import { useLetter } from "../hooks/useLetter";

/* eslint-disable react/prop-types */
export default function SelectMultiple(props) {
  const { name, token, disabledSelect } = props;

  const [success, setSuccess] = useState(false);
  const [types, setTypes] = useState([]);
  const [loading, setLoading] = useState(true);

  const { letterData, setLetterData } = useLetter();

      // const BASE_URL = 'http://localhost:8000/api/keywords?index=0&search=ma';
      const BASE_URL = 'http://localhost:8000/api/keywords';
      const options = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      };
  
      const getAllType = async () => {
        setLoading(true);
        try {
          const response = await axios.get(BASE_URL, options);
          const { index, keywords } = response.data;
          setSuccess(true);
          setTypes(keywords.map(keyword => ({ value: keyword.id, label: keyword.keyword_name })));
        } catch (err) {
          setSuccess(false);
          console.log(err);
        } finally {
          setLoading(false);
        }
      };

  useEffect(() => {

    if (sessionStorage.getItem('activeMenu') !== 'buat_surat') return;

    getAllType();
  }, []);

  const handleKeywords = (selectedKeywords) => {
    const newKeywordTemp = [];
    selectedKeywords.map((val) => {
        newKeywordTemp.push(val.value);
    })
    // console.log(newKeywordTemp);
    setLetterData((prev) => ({
      ...prev,
      letter_keywords: newKeywordTemp
    }))
  }

  useEffect(() => {
    console.log(letterData)
  }, [letterData])
  
    const customStyles = {
        control: (provided) => ({
        ...provided,
        padding: '4px 4px',
        borderColor: 'rgb(209 213 219)',
        boxShadow: '0 1px 2px rgba(0, 0, 0, 0.1)',
        borderRadius: '0.375rem',
        width: '100%',
        backgroundColor: 'white',
        '&:hover': {
            borderColor: 'indigo',
        },
        '&:focus': {
            borderColor: 'indigo',
        }
        }),
        placeholder: (provided) => ({
        ...provided,
        color: 'gray',
        fontSize: '0.875rem',
        }),
        menu: (provided) => ({
        ...provided,
        borderRadius: '0.375rem',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
        }),
        option: (provided, state) => ({
        ...provided,
        backgroundColor: state.isSelected ? 'indigo' : 'white',
        color: state.isSelected ? 'white' : 'black',
        '&:hover': {
            backgroundColor: 'indigo',
            color: 'white',
        }
        })
    };
  if (loading) {
    return <div>Loading...</div>;
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
    />
  );
}
