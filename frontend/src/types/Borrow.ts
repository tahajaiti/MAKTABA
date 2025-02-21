import Book from "./Book";

interface Borrow {
    book: Book | null;
    user_id: number;
    book_id: number;
    borrow_date: string;
    return_date: string; 
    is_returned: boolean;
}

export default Borrow;