import { useContext } from "react";
import { AxiosReloadContext } from "../contexts/AxiosReloadContext";



export const useAxiosReload = () => {
    return useContext(AxiosReloadContext);
};