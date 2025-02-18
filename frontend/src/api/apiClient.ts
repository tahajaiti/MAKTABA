import axios from 'axios';

const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_URL ?? 'http://127.0.0.1:8000/api',
    timeout: 60000,
    withCredentials: true,
    xsrfCookieName: "XSRF-TOKEN",
    xsrfHeaderName: "X-XSRF-TOKEN",
    headers: {
        "Accept": "application/json",
        "Content-Type": 'application/json',
    }
});


//request interceptors to add the token to the request headers
apiClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers = config.headers || {};
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

apiClient.interceptors.response.use(
    (Response) => Response,
    (Error) => {
        if (!Error.response){
            return Promise.reject({message: 'Network Error'});
        }

        const {status, data} = Error.response;

        if (status === 401){
            console.log('unauthorized');

            localStorage.removeItem('token');
            window.location.href = '/login';
        }

        if (status === 422){
            console.log("Validation Error:", data.errors);
            return Promise.reject(data.errors); 
        }

        if (status === 500) {
            console.error("Server Error:", data);
            return Promise.reject({ message: "Something went wrong on the server." });
        }

        return Promise.reject(data);
    }
)

export default apiClient;