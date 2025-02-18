import { useState } from "react";
import authService from "../services/authService";
import AuthData from "../types/Auth";


const useAuthController = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [authData, setAuthData] = useState<AuthData | null>(null);


    const login = async (email: string, password: string) => {
        setLoading(true);
        setError(null);
        try {
            const response = await authService.login({email, password});
            setAuthData(response.data.data as AuthData);
        } catch (err: unknown){
            setError('Login failed' + err);
        } finally {
            setLoading(false);
        }
    }

    const register = async (name: string, email: string, password: string, password_confirmation: string) => {
        setLoading(true);
        setError(null);
        try {
            const response = await authService.register({name, email, password, password_confirmation});
            setAuthData(response.data.data as AuthData);
        } catch (err: unknown){
            setError('Registration failed' + err);
        } finally {
            setLoading(false);
        }
    }

    const logout = async () => {
        await authService.logout();
        setAuthData(null);
    }

    return {
        loading,
        error,
        authData,
        login,
        register,
        logout
    }
}

export default useAuthController;