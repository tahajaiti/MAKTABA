import { ReactNode, useEffect, useState } from 'react';
import { BookContext } from './BookContext';
import Book from '../../types/Book';
import useBookController from '../../controllers/bookController';

export const BookProvider = ({ children }: { children: ReactNode }) => {
    const [books, setBooks] = useState<Book[]>([]);
    const { getAll } = useBookController();

    useEffect(() => {
        const fetchData = async () => {
            const data = await getAll();
            if (data) {
                setBooks(data);
            }
        };
        fetchData();
    }, [getAll]);

    const getAllBooks = () => {
        return books;
    }

    

    return (
        <BookContext.Provider value={{ books, getAllBooks }}>
            {children}
        </BookContext.Provider>
    );
};
