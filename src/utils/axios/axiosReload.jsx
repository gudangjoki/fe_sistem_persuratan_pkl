import axios from "axios";

const BASE_URL = 'http://localhost:8000';

export const axiosReload = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json'
    },
    withCredentials: true
});