import { create } from "zustand";
import Book from '../types/Book';
import bookService from '../services/bookService';

interface BookStore {
    books: Book[];
    loading: boolean;
    error: string | null;
    getAll: () => Promise<void>;
    get: (id: number) => Promise<Book | null>;
    add: (bookData: Omit<Book, "id">) => Promise<void>;
    update: (id: number, bookData: Partial<Book>) => Promise<void>;
    delete: (id: number) => Promise<void>;
}


export const useBookStore = create<BookStore>((set) => ({
    books: [],
    loading: false,
    error: null,


    getAll: async () => {
        set({ loading: true, error: null });
        try {
            const books = (await bookService.getAll()).data.data;
            set({ books });
        } catch (err: any) {
            set({ error: err?.response?.data?.message || "Failed to fetch books." });
        } finally {
            set({ loading: false });
        }
    },

    get: async (id) => {
        set({ loading: true, error: null });
        try {
            const response = await bookService.get(id);
            if (response.data.data) {
                return response.data.data;
            }
            return null;
        } catch (err: any) {
            set({ error: err?.response?.data?.message || "Failed to fetch book." });
            return null;
        } finally {
            set({ loading: false });
        }
    },

    add: async (bookData) => {
        set({ loading: true, error: null });
        try {
            await bookService.create(bookData);
            await useBookStore.getState().getAll();
        } catch (err: any) {
            set({ error: err?.response?.data?.message || "Failed to add book." });
        } finally {
            set({ loading: false });
        }
    },

    update: async (id, bookData) => {
        set({ loading: true, error: null });
        try {
            await bookService.update(id, bookData);
            await useBookStore.getState().getAll();
        } catch (err: any) {
            set({ error: err?.response?.data?.message || "Failed to update book." });
        } finally {
            set({ loading: false });
        }
    },

    delete: async (id) => {
        set({ loading: true, error: null });
        try {
            await bookService.remove(id);
            await useBookStore.getState().getAll();
        } catch (err: any) {
            set({ error: err?.response?.data?.message || "Failed to delete book." });
        } finally {
            set({ loading: false });
        }
    }

}));