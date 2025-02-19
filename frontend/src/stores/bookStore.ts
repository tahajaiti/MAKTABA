// import { create } from "zustand";
// import Book from '../types/Book'

// interface BookStore {
//     books: Book[];
//     loading: boolean;
//     error: string | null;
//     fetchBooks: () => Promise<void>;
//     getBookById: (id: number) => Promise<Book | null>;
//     addBook: (bookData: Omit<Book, "id">) => Promise<void>;
//     updateBook: (id: number, bookData: Partial<Book>) => Promise<void>;
//     deleteBook: (id: number) => Promise<void>;
// }


// export const useBookStore = create<BookStore>((set) => {
//     const {getAll, getById, create, update, remove} = useBookController();

//     return {
//         books: [],
//         loading: false,
//         error: null,

//         fetchBooks: async () => {
//             set({ loading: true });
//             const books = await getAll();
//             if (books) set({ books });
//             set({ loading: false });  
//         },

//         getBookById: async (id) => {
//             set({ loading: true });
//             const book = await getById(id);
//             set({ loading: false });
//             return book;
//         },

//         addBook: async (bookData) => {
//             set({ loading: true });
//             await create(bookData);
//             set({ loading: false });
//         },

//         updateBook: async (id, bookData) => {
//             set({ loading: true });
//             await update(id, bookData);
//             set({ loading: false });
//         },


//         deleteBook: async (id) => {
//             set({ loading: true });
//             await remove(id);
//             set({ loading: false });
//         }
//     }   

// });