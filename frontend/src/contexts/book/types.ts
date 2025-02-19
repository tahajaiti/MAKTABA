import Book from '../../types/Book';

export interface BookContextType {
    books: Book[];
    addBook: (Book: Omit<Book, 'id'>) => void;
    removeBook: (id: number) => void;
    editBook: (book: Book) => void;
    getBook: (id: number) => Book | undefined;
    getAllBooks: () => Book[];
}