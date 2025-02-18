import { useState } from "react";
import authService from "../services/authService";
import AuthData from "../types/Auth";
import Response from "../types/Response";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/auth";


const useAuthController = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [authData, setAuthData] = useState<Response<AuthData> | null>(null);
    const navigate = useNavigate();
    const { login, logout } = useAuth();

    const handleLogin = async (email: string, password: string) => {
        setLoading(true);
        setError(null);
        try {
            const response = await authService.login({ email, password });
            if (response.data.data) {
                setAuthData(response.data as Response<AuthData>);
                login(response.data.data.access_token || '');
            }

            navigate('/');
        } catch (err: unknown) {
            if (err instanceof Error && 'email' in err) {
                setError('Invalid email');
            }

            if (err instanceof Error && 'password' in err) {
                setError('Invalid password');
            }
            setError('Login failed, Invalid credentials');
        } finally {
            setLoading(false);
        }
    }

    const register = async (name: string, email: string, password: string, password_confirmation: string) => {
        setLoading(true);
        setError(null);
        try {
            const response = await authService.register({ name, email, password, password_confirmation });
            setAuthData(response.data as Response<AuthData>);
            localStorage.setItem('token', JSON.stringify(response.data.data?.access_token));
            localStorage.setItem('user', JSON.stringify(response.data.data?.user));
            navigate('/');
        } catch (err: unknown) {
            setError('Registration failed' + err);
        } finally {
            setLoading(false);
        }
    }

    const handleLogout = async () => {
        await authService.logout();
        setAuthData(null);
        logout();
        navigate('/login');
    }

    return {
        loading,
        error,
        authData,
        handleLogin,
        register,
        handleLogout
    }
}

export default useAuthController;