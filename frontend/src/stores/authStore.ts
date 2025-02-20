import { create } from 'zustand';
import authService from "../services/authService";
import User from '../types/User';

interface AuthState {
    isAuth: boolean;
    user: User | null;
    loading: boolean;
    error: string | null;
    login: (email: string, password: string) => Promise<void>;
    register: (name: string, email: string, password: string, password_confirmation: string) => Promise<void>;
    logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
    isAuth: !!localStorage.getItem('token'),
    user: null,
    loading: false,
    error: null,

    login: async (email, password) => {
        set({ loading: true, error: null });
        try {
            const response = await authService.login({ email, password });

            if (response.data?.data?.access_token) {
                localStorage.setItem('token', response.data.data.access_token);
                set({ isAuth: true });
                set({ user: response.data.data.user });
            } else {
                throw new Error("Invalid credentials, please try again.");
            }
        } catch (err: any) {
            set({ error: err?.response?.data?.message || "Login failed, please try again." });
        } finally {
            set({ loading: false });
        }
    },

    register: async (name, email, password, password_confirmation) => {
        set({ loading: true, error: null });
        try {
            const response = await authService.register({ name, email, password, password_confirmation });

            if (response.data?.data?.access_token) {
                localStorage.setItem('token', response.data.data.access_token);
                set({ isAuth: true });
                set({ user: response.data.data.user });
            } else {
                throw new Error("Registration failed, please try again.");
            }
        } catch (err: any) {
            set({ error: err?.response?.data?.message || "Register failed, please try again." });
        } finally {
            set({ loading: false });
        }
    },

    logout: async () => {
        set({ loading: true });
        try {
            localStorage.removeItem('token');
            set({ isAuth: false });
            set({ user: null });
            await authService.logout();
        } catch {
            set({ error: "Logout failed, please try again." });
        } finally {
            set({ loading: false });
        }
    },
}));
