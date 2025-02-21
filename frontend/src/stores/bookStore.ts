import { create } from "zustand";
import Book from '../types/Book';
import bookService from '../services/bookService';

interface BookStore {
    books: Book[];
    loading: boolean;
    error: string | null;
    current_page: number;
    last_page: number;
    getAll: (page: number) => Promise<void>;
    get: (id: number) => Promise<Book | null>;
    add: (bookData: FormData) => Promise<void>;
    update: (id: number, bookData: Partial<Book>) => Promise<void>;
    delete: (id: number) => Promise<void>;
    nextPage: () => void;
    prevPage: () => void;
}


export const useBookStore = create<BookStore>((set) => ({
    books: [],
    loading: false,
    error: null,
    current_page: 1,
    last_page: 1,


    getAll: async (page) => {
        set({ loading: true, error: null });
        try {
            const response = await bookService.getAll(page);
            set({ books: response.data.data.data, current_page: response.data.data.current_page, last_page: response.data.data.last_page });
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
            return response.data.data || null;
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
            const currPage = useBookStore.getState().current_page;
            const response =await bookService.create(bookData);
            console.log(response);
            await useBookStore.getState().getAll(currPage);
        } catch (err: any) {
            set({ error: err?.response?.data?.message || "Failed to add book." });
        } finally {
            set({ loading: false });
        }
    },

    update: async (id, bookData) => {
        set({ loading: true, error: null });
        try {
            const currPage = useBookStore.getState().current_page;
            const response = await bookService.update(id, bookData);
            console.log(response);
            await useBookStore.getState().getAll(currPage);
        } catch (err: any) {
            set({ error: err?.response?.data?.message || "Failed to update book." });
        } finally {
            set({ loading: false });
        }
    },

    delete: async (id) => {
        set({ loading: true, error: null });
        try {
            const currPage = useBookStore.getState().current_page;

            await bookService.remove(id);
            await useBookStore.getState().getAll(currPage);
        } catch (err: any) {
            set({ error: err?.response?.data?.message || "Failed to delete book." });
        } finally {
            set({ loading: false });
        }
    },

    nextPage: () => {
        set((state) => {
            const newPage = Math.min(state.current_page + 1, state.last_page);
            return { current_page: newPage };
        });
    },
    
    prevPage: () => {
        set((state) => {
            const newPage = Math.max(state.current_page - 1, 1);
            return { current_page: newPage };
        });
    },

}));