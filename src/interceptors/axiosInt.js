import axios from 'axios'
import {notify} from "@/hooks/notify";

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_SERVER_URL,
});
// Request interceptor
axiosInstance.interceptors.request.use(
    (config) => {
        // Modify the request config here (e.g., add headers, authentication tokens)
        const accessToken = localStorage.getItem("token");

        // ** If token is present add it to request's Authorization Header
        if (accessToken) {
            if (config.headers) config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor
axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response.status === 401) {
            if (localStorage.getItem('tryRefresh') >= '1') {
                localStorage.removeItem('tryRefresh');
                window.location.href = '/auth/login';
                return Promise.reject(error);
            }
            localStorage.setItem('tryRefresh', '0');
            refreshToken();
        }
        if (error.response.data.message !== "Expired JWT token!") {
            notify(error.response.data.message, 'error');
        }
        return Promise.reject(error);
    },
);
const refreshToken = async () => {
    try {
        const response = await axios({
            method: 'get',
            url: import.meta.env.VITE_SERVER_URL + '/auth/refresh',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('refreshToken')}`
            }
        });
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('refreshToken', response.data.refreshToken);
        window.location.reload();
    } catch (error) {
        localStorage.setItem('tryRefresh', '1');
    }
};
export default axiosInstance;