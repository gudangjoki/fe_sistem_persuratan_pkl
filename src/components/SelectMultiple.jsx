import { useState, useEffect } from "react";
import Select from "react-select";
import axios from "axios";
import { useLetter } from "../hooks/useLetter";

/* eslint-disable react/prop-types */
export default function SelectMultiple(props) {
  const { name, token } = props;

  const [success, setSuccess] = useState(false);
  const [types, setTypes] = useState([]);
  const [loading, setLoading] = useState(true);

  const { letterData, setLetterData } = useLetter();

  useEffect(() => {
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

    getAllType();
  }, [token]);

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
    />
  );
}
