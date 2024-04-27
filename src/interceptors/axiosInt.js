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
        return response;
    },
    (error) => {
        if (error.response.status === 401) {
            if (localStorage.getItem('tryRefresh') === '1') {

                localStorage.removeItem('tryRefresh')
                window.location.href = '/auth/login'
                return Promise.reject(error);
            }
            (async () => {
                localStorage.setItem('tryRefresh', '0')

                await axios({
                    method: 'get',
                    url: import.meta.env.VITE_SERVER_URL + '/auth/refresh',
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('refreshToken')}`
                    }
                }).then((response) => {
                    localStorage.setItem('token', response.data.token)
                    localStorage.setItem('refreshToken', response.data.refreshToken)
                    window.location.reload()
                }).catch((error) => {
                    console.error(error)
                    localStorage.setItem('tryRefresh', '1');
                })
            })()
        }
    },
);

export default axiosInstance;