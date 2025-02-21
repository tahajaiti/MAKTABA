import { useEffect, useState } from "react"
import { Book, Calendar, Edit, Hash, Trash, User } from "lucide-react"
import { formatDistance } from "date-fns"
import BookType from "../types/Book"
import { useBookStore } from "../stores/bookStore"
import { useAuthStore } from "../stores/authStore"
import EditBook from "./EditBook"
import borrowService from "../services/borrowService"
import Borrow from "../types/Borrow"

interface props {
    book: BookType
}

const API_URL = import.meta.env.VITE_BACKEND_URL;

export function BookCard({ book }: props) {
    const [showEdit, setShowEdit] = useState(false);
    const [borrows, setBorrows] = useState<Borrow[]>([]);
    const { role } = useAuthStore();
    const store = useBookStore();
    const imageUrl = book.cover ? `${API_URL}/${book.cover}` : "/placeholder.jpg";

    const handleDelete = () => {
        store.delete(book.id);
    }

    const handleBorrow = async () => {
        try {
            store.getAll(store.current_page);
            const response = await borrowService.borrow(book.id);
            get();
            console.log(response);
        } catch (err: any) {
            console.error(err);
        }
    }

    const handleReturn = async () => {
        try {
            store.getAll(store.current_page);
            const response = await borrowService.returnBook(book.id);
            get();
            console.log(response);
        } catch (err: any) {
            console.error(err);
        }
    }

    const get = async () => {
        const response = await borrowService.getMyBorrows();
        if (response.data.data) {
            setBorrows(response.data.data);
        }
    }

    useEffect(() => {
        get();
    }, []);


    const getButton = () => {
        if (role === 'admin') {
            return (
                <div className="flex flex-col gap-4 h-full justify-between">
                    <button onClick={() => setShowEdit(!showEdit)}
                        className="text-2xl text-blue-500 cursor-pointer hover:text-blue-800 transition-all">
                        <Edit />
                    </button>
                    <button onClick={handleDelete} className="text-2xl text-red-500 cursor-pointer hover:text-red-800 transition-all">
                        <Trash />
                    </button>
                </div>
            )
        } else {
            if (borrows.find(borrow => borrow.book_id === book.id && borrow.is_returned === false)) {
                return (
                    <button onClick={handleReturn}
                        className="bg-jet self-start cursor-pointer hover:bg-dun/50 hover:border-jet hover:border hover:text-jet transition-all text-white px-4 py-2 rounded-lg">
                        Return
                    </button>
                )
            } else if (book.quantity > 0) {
                return (
                    <button onClick={handleBorrow}
                        className="bg-jet self-start cursor-pointer hover:bg-dun/50 hover:border-jet hover:border hover:text-jet transition-all text-white px-4 py-2 rounded-lg">
                        Borrow
                    </button>
                )
            }
        }
    }

    console.log(borrows);


    const timeAgo = formatDistance(new Date(book.created_at), new Date(), { addSuffix: true });

    return (
        <>
            {showEdit && <EditBook handle={() => setShowEdit(!showEdit)} book={book} />}
            <div className="group relative overflow-hidden rounded-lg border bg-dun p-6 transition-all hover:shadow-lg">
                <div className="flex gap-6">
                    {/* Book Cover */}
                    <div className="relative h-[180px] w-[120px] shrink-0 overflow-hidden rounded-md border bg-white text-black shadow-sm">
                        {book.cover ? (
                            <img
                                src={imageUrl}
                                alt={`${book.title} cover`}
                                className="h-full w-full object-cover"
                            />
                        ) : (
                            <div className="flex h-full w-full items-center justify-center">
                                <Book className="h-12 w-12 text-night" />
                            </div>
                        )}
                    </div>

                    {/* Book Details */}
                    <div className="flex justify-between w-full items-center">
                        <div className="flex flex-col justify-between">
                            <div className="space-y-2">
                                <h3 className="text-xl font-semibold text-night">{book.title}</h3>
                                <div className="flex items-center gap-2 text-jet">
                                    <User className="h-4 w-4" />
                                    <span>{book.author}</span>
                                </div>
                                <div className="flex items-center gap-2 text-jet">
                                    <Hash className="h-4 w-4" />
                                    <span>ID: {book.id}</span>
                                </div>
                                <div className="flex items-center gap-2 text-jet">
                                    <Book className="h-4 w-4" />
                                    <span>Quantity: {book.quantity}</span>
                                </div>
                            </div>

                            <div className="space-y-1">
                                <div className="flex items-center gap-2 text-sm text-gris">
                                    <Calendar className="h-4 w-4" />
                                    <span>Added {timeAgo}</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-gris">
                                    <Edit className="h-4 w-4" />
                                    <span>
                                        Last borrowing{" "}
                                        {formatDistance(new Date(book.updated_at), new Date(), {
                                            addSuffix: true,
                                        })}
                                    </span>
                                </div>
                            </div>
                        </div>
                        {
                            getButton()
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

