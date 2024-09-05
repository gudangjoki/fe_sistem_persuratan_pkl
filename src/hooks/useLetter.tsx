import { useContext } from "react";
import { LetterContext } from "../contexts/LetterContext";


export const useLetter = () => {
    return useContext(LetterContext);
};