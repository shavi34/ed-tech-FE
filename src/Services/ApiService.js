import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;
const axiosInstance = axios.create({
    baseURL: `${apiUrl}/api`,
});
export const setHeaders = () => {
    const token = localStorage.getItem('token');
    axiosInstance.defaults.headers.common['Accept'] = 'application/json';
    axiosInstance.defaults.headers.common[
        "Authorization"
        ] = `Bearer ${token}`;

};
export default axiosInstance;

