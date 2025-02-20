import { create } from 'zustand';
import authService from "../services/authService";
import User from '../types/User';

interface AuthState {
    isAuth: boolean;
    user: User | null;
    role: string | null;
    loading: boolean;
    error: string | null;
    login: (email: string, password: string) => Promise<void>;
    register: (name: string, email: string, password: string, password_confirmation: string) => Promise<void>;
    logout: () => Promise<void>;
}

const storedUser = localStorage.getItem('user');
const storedRole = localStorage.getItem('role');


export const useAuthStore = create<AuthState>((set) => ({
    isAuth: !!localStorage.getItem('token'),
    user: storedUser ? JSON.parse(storedUser) : null,
    role: storedRole || null,
    loading: false,
    error: null,

    login: async (email, password) => {
        set({ loading: true, error: null });
        try {
            const response = await authService.login({ email, password });

            if (response.data?.data?.access_token) {
                localStorage.setItem('token', response.data.data.access_token);
                localStorage.setItem('user', JSON.stringify(response.data.data.user));
                localStorage.setItem('role', response.data.data.user.role);
                set({ isAuth: true, user: response.data.data.user, role: response.data.data.user.role });
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
                localStorage.setItem('user', JSON.stringify(response.data.data.user));
                localStorage.setItem('role', response.data.data.user.role);
                set({ isAuth: true, user: response.data.data.user, role: response.data.data.user.role });
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
            localStorage.removeItem('user');
            localStorage.removeItem('role');
            set({ isAuth: false, user: null, role: null });
            await authService.logout();
        } catch {
            set({ error: "Logout failed, please try again." });
        } finally {
            set({ loading: false });
        }
    },
}));
