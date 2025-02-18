import { useState } from "react";
import authService from "../services/authService";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/auth";


const useAuthController = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();
    const { login, logout } = useAuth();

    const handleLogin = async (email: string, password: string) => {
        setLoading(true);
        setError(null);
        try {
            const response = await authService.login({ email, password });
            if (response.data.data) {
                login(response.data.data);
            }

            navigate('/');
        } catch (err: unknown) {
            setError('Login failed, Invalid credentials' + err);
        } finally {
            setLoading(false);
        }
    }

    const register = async (name: string, email: string, password: string, password_confirmation: string) => {
        setLoading(true);
        setError(null);
        try {
            const response = await authService.register({ name, email, password, password_confirmation });
            if (response.data.data) {
                login(response.data.data);
            }
            navigate('/');
        } catch (err: unknown) {
            setError('Registration failed' + err);
        } finally {
            setLoading(false);
        }
    }

    const handleLogout = async () => {
        await authService.logout();
        logout();
        navigate('/login');
    }

    return {
        loading,
        error,
        handleLogin,
        register,
        handleLogout
    }
}

export default useAuthController;