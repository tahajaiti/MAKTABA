import { create } from 'zustand';
import authService from "../services/authService";

interface AuthState {
    isAuth: boolean;
    loading: boolean;
    error: string | null;
    login: (email: string, password: string) => Promise<void>;
    register: (name: string, email: string, password: string, password_confirmation: string) => Promise<void>;
    logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
    isAuth: !!localStorage.getItem('token'),
    loading: false,
    error: null,

    login: async (email, password) => {
        set({ loading: true, error: null });
        try {
            const response = await authService.login({ email, password });

            if (response.data?.data?.access_token) {
                localStorage.setItem('token', response.data.data.access_token);
                set({ isAuth: true });
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
            await authService.logout();
        } catch {
            set({ error: "Logout failed, please try again." });
        } finally {
            set({ loading: false });
        }
    },
}));
