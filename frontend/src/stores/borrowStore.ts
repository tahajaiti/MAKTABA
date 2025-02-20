import { create } from "zustand";
import Borrow from '../types/Borrow';
import borrowService from '../services/borrowService';

interface BorrowStore {
    borrows: Borrow[];
    loading: boolean;
    error: string | null;
    getAll: () => Promise<void>;
    borrow: (id: number) => Promise<void>;
    returnBook: (id: number) => Promise<void>;
}

export const borrowStore = create<BorrowStore>((set) => ({
    borrows: [],
    loading: false,
    error: null,

    getAll: async () => {
        set({ loading: true, error: null });
        try {
            const response = await borrowService.getAll();
            set({borrows: response.data.data});
        } catch (err: any) {
            set({ error: err?.response?.data?.message || "Failed to fetch borrows." });
        } finally {
            set({ loading: false });
        }
    },

    borrow: async (id) => {
        set({ loading: true, error: null });
        try {
            await borrowService.borrow(id);
            await borrowStore.getState().getAll();
        } catch (err: any) {
            set({ error: err?.response?.data?.message || "Failed to borrow book." });
        } finally {
            set({ loading: false });
        }
    },

    returnBook: async (id) => {
        set({ loading: true, error: null });
        try {
            await borrowService.returnBook(id);
            await borrowStore.getState().getAll();
        } catch (err: any) {
            set({ error: err?.response?.data?.message || "Failed to return book." });
        } finally {
            set({ loading: false });
        }
    }
}));