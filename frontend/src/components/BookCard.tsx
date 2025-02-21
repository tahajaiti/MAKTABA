import { useState } from "react"
import { Book, Calendar, Edit, Hash, Trash, User } from "lucide-react"
import { formatDistance } from "date-fns"
import BookType from "../types/Book"
import { useBookStore } from "../stores/bookStore"
import { useAuthStore } from "../stores/authStore"
import EditBook from "./EditBook"

interface props {
    book: BookType
}

const API_URL = import.meta.env.VITE_BACKEND_URL;

export function BookCard({ book }: props) {
    const [showEdit, setShowEdit] = useState(false);
    const { role } = useAuthStore();
    const store = useBookStore();
    const imageUrl = book.cover ? `${API_URL}/${book.cover}` : "/placeholder.jpg";

    const handleDelete = () => {
        store.delete(book.id);
    }

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
                                        Last updated{" "}
                                        {formatDistance(new Date(book.updated_at), new Date(), {
                                            addSuffix: true,
                                        })}
                                    </span>
                                </div>
                            </div>
                        </div>
                        {
                            role === 'user' && (
                                <button className="bg-jet self-start cursor-pointer hover:bg-dun/50 hover:border-jet hover:border hover:text-jet transition-all text-white px-4 py-2 rounded-lg">
                                    Borrow
                                </button>
                            )
                        }
                        
                        {
                            role === 'admin' && (
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
                        }

                    </div>
                </div>
            </div>
        </>
    )
}

