import { create } from 'zustand';

interface AuthState {
    isAuth: boolean;
    login: (token: string) => void;
    logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
    isAuth: !!localStorage.getItem('token'),
    login: (token) => {
        localStorage.setItem('token', token);
        set({ isAuth: true });
    },
    logout: () => {
        localStorage.removeItem('token');
        set({ isAuth: false });
    },
}));