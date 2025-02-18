import axios, { AxiosError, InternalAxiosRequestConfig, AxiosResponse } from 'axios';

interface LaravelValidationError {
    message: string;
    errors: Record<string, string[]>;
}

interface LaravelApiError {
    message: string;
    errors?: Record<string, string[]>;
    exception?: string;
}

const API_URL = import.meta.env.VITE_API_URL ?? 'http://127.0.0.1:8000/api';

const apiClient = axios.create({
    baseURL: API_URL,
    timeout: 60000,
    withCredentials: true,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    }
});

apiClient.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {

        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error: AxiosError) => {
        return Promise.reject(error);
    }
);

apiClient.interceptors.response.use(
    (response: AxiosResponse) => {
        return response;
    },
    (error: AxiosError<LaravelApiError>) => {
        // Handle network errors
        if (!error.response) {
            return Promise.reject({
                message: 'Network error - please check your connection',
                status: 'network_error'
            });
        }

        const { status, data } = error.response;

        console.log(data);

        // Handle different error status codes
        switch (status) {
            case 401: // Unauthorized
                localStorage.removeItem('token');
                window.location.replace('/login');
                return Promise.reject({
                    message: 'Session expired - please log in again',
                    status: 'unauthorized'
                });

            case 403: // Forbidden
                return Promise.reject({
                    message: data?.message || 'You do not have permission to perform this action',
                    status: 'forbidden'
                });

            case 404: // Not Found
                return Promise.reject({
                    message: data?.message || 'The requested resource was not found',
                    status: 'not_found'
                });

            case 422: { // Validation Error
                const validationError = error.response.data as LaravelValidationError;
                return Promise.reject({
                    message: validationError.message || 'Validation failed',
                    errors: validationError.errors,
                    status: 'validation_error'
                });
            }
            case 429: // Too Many Requests
                return Promise.reject({
                    message: 'Too many requests - please try again later',
                    status: 'rate_limited'
                });

            case 500: // Server Error
                return Promise.reject({
                    message: 'An unexpected error occurred - please try again later',
                    status: 'server_error',
                    error: data
                });

            default:
                return Promise.reject({
                    message: data?.message || 'An unexpected error occurred',
                    status: 'unknown_error',
                    error: data
                });
        }
    }
);

export const api = {
    get: <T>(url: string, config = {}) =>
        apiClient.get<T>(url, config),

    post: <T>(url: string, data = {}, config = {}) =>
        apiClient.post<T>(url, data, config),

    put: <T>(url: string, data = {}, config = {}) =>
        apiClient.put<T>(url, data, config),

    patch: <T>(url: string, data = {}, config = {}) =>
        apiClient.patch<T>(url, data, config),

    delete: <T>(url: string, config = {}) =>
        apiClient.delete<T>(url, config)
};

export default api;