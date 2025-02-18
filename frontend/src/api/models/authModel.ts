import Response from "../../types/Response";
import axios from "../apiClient";

interface LoginCreds {
    email: string;
    password: string;
}

interface RegisterCreds {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
}

const AuthModel = {
    login: async <T>(creds: LoginCreds): Promise<Response<T>> => {
        try {
            const response = await axios.post('auth/login', creds);
            return response.data as Response<T>;
        } catch (error) {
            console.error("Login Error:", error);
            throw error; 
        }
    },

    register: async <T>(creds: RegisterCreds): Promise<Response<T>> => {
        try {
            const response = await axios.post('auth/register', creds);
            return response.data as Response<T>;
        } catch (error) {
            console.error("Registration Error:", error);  
            throw error;
        }
    }
};

export default AuthModel;
