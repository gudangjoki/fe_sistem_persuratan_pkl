import { createContext, useState } from "react";
import PropTypes from 'prop-types';

export const LetterContext = createContext({
  keywords: null,
  setKeywords: () => {},
  letterData: null,
  setLetterData: () => {},
  viewLetter: null,
  setViewLetter: () => {},
  loadingFetch: null,
  setLoadingFetch: () => {},
  letterKeyAh: null,
  setLetterKeyAh: () => {},
  letterFull: null,
  setLetterFull: () => {},
});

export const LetterManagementProvider = ({ children }) => {
  const [keywords, setKeywords] = useState([]);
  const [letterData, setLetterData] = useState({
    "letter_title": "",
    "letter_id_type": 0,
    "letter_keywords": [{
      "label": null,
      "value": null
    }],
    "letter_path": "",
    "letter_no": ""
  });
  const [viewLetter, setViewLetter] = useState([]);
  const [loadingFetch, setLoadingFetch] = useState(null);

  const [letterKeyAh, setLetterKeyAh] = useState([]);
  // const [letterTypeAh, setLetterTypeAh] = useState({});
  const [letterFull, setLetterFull] = useState(null);


  const letterContextValue = {
    keywords,
    setKeywords,
    letterData,
    setLetterData,
    viewLetter,
    setViewLetter,
    loadingFetch,
    setLoadingFetch,
    letterKeyAh,
    setLetterKeyAh,
    letterFull,
    setLetterFull
  };

  return (
    <LetterContext.Provider value={letterContextValue}>
      {children}
    </LetterContext.Provider>
  );
};

LetterManagementProvider.propTypes = {
    children: PropTypes.arrayOf(PropTypes.string).isRequired,
};