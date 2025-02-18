import apiClient from "../api/apiClient";
import AuthData from "../types/Auth";
import Response from "../types/Response";
import User from "../types/User";

interface creds {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
}


const login = (creds: Pick<creds, 'email'|'password'>) => apiClient.post<Response<AuthData>>('/auth/login', creds);
const register = (creds: creds) => apiClient.post<Response<AuthData>>('/auth/register', creds);
const logout = () => apiClient.post<Response<null>>('/auth/logout');
const profile = () => apiClient.get<Response<User>>('/auth/profile');

const authService = {
    login,
    register,
    logout,
    profile
}

export default authService;