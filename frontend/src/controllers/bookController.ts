import { useCallback, useState } from 'react';
import bookService from '../services/bookService';



const useBookController = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const getAll = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await bookService.getAll();
            if (response.data) {
                return response.data.data;
            }
        }catch(err: unknown){
            console.log(err);
            setError(err.message || 'Failed to fetch books'); 
        } finally {
            setLoading(false);
        }
    }, []);


    return {
        loading,
        error,
        getAll,
    };
}


export default useBookController;