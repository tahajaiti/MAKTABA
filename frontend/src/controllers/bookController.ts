import { useCallback, useState } from "react";
import bookService from "../services/bookService";

const useBookController = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const getAll = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await bookService.getAll();
            return response.data.data;
        } catch (err: any) {
            console.log(err);
            setError(err.message || "Failed to fetch books");
            return null;
        } finally {
            setLoading(false);
        }
    }, []);

    const getById = useCallback(async (id: number) => {
        setLoading(true);
        setError(null);
        try {
            const response = await bookService.getById(id);
            return response.data;
        } catch (err: any) {
            console.log(err);
            setError(err.message || "Failed to fetch book");
            return null;
        } finally {
            setLoading(false);
        }
    }, []);

    const create = useCallback(async (bookData: any) => {
        setLoading(true);
        setError(null);
        try {
            const response = await bookService.create(bookData);
            return response.data;
        } catch (err: any) {
            console.log(err);
            setError(err.message || "Failed to create book");
            return null;
        } finally {
            setLoading(false);
        }
    }, []);

    const update = useCallback(async (id: number, bookData: any) => {
        setLoading(true);
        setError(null);
        try {
            const response = await bookService.update(id, bookData);
            return response.data;
        } catch (err: any) {
            console.log(err);
            setError(err.message || "Failed to update book");
            return null;
        } finally {
            setLoading(false);
        }
    }, []);

    const remove = useCallback(async (id: number) => {
        setLoading(true);
        setError(null);
        try {
            await bookService.remove(id);
            return true;
        } catch (err: any) {
            console.log(err);
            setError(err.message || "Failed to delete book");
            return false;
        } finally {
            setLoading(false);
        }
    }, []);

    return {
        loading,
        error,
        getAll,
        getById,
        create,
        update,
        remove,
    };
};

export default useBookController;
