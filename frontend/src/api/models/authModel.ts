import Response from "../../types/Response";
import axios from "../apiClient";



const AuthModel = {
    login: async <T, K>(creds: T): Promise<Response<K>> => {
        try {
            const response = await axios.post('auth/login', creds);
            return response.data as Response<K>;
        } catch (error) {
            console.error("Login Error:", error);
            throw error; 
        }
    },

    register: async <T, K>(creds: T): Promise<Response<K>> => {
        try {
            const response = await axios.post('auth/register', creds);
            return response.data as Response<K>;
        } catch (error) {
            console.error("Registration Error:", error);  
            throw error;
        }
    }
};

export default AuthModel;
