import axios from 'axios'

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
        // Modify the response data here (e.g., parse, transform)

        return response;
    },
    (error) => {
        // Handle response errors here
        if(error.response.status === 401){
            localStorage.removeItem("token");
            window.location.href = "/auth/login";
        }
        return Promise.reject(error);
    },

);

export default axiosInstance;