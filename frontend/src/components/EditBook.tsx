import React, { useState } from 'react';
import { Book, User, Hash, XIcon } from 'lucide-react';
import BookType from '../types/Book';
import { useBookStore } from '../stores/bookStore';

interface Props {
    handle: () => void;
    book: BookType
}

const EditBook = ({ handle, book }: Props) => {
    const { update, getAll, current_page } = useBookStore();
    const [formData, setFormData] = useState<Partial<BookType>>({
        title: book.title,
        author: book.author,
        quantity: book.quantity
    });

    const [errors, setErrors] = useState<{ title?: string, author?: string, quantity?: string }>({});

    const validate = () => {
        const newErrors: typeof errors = {};

        if (!formData.title?.trim() || formData.title.length < 3) {
            newErrors.title = "Title must be at least 3 characters long.";
        }

        if (!formData.author?.trim() || formData.author.length < 3) {
            newErrors.author = "Author name must be at least 3 characters long.";
        }

        if (formData.quantity === undefined || formData.quantity < 1 || isNaN(formData.quantity)) {
            newErrors.quantity = "Quantity must be a positive number.";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate()) return;




        await update(book.id, formData);
        getAll(current_page);
        setFormData({ title: '', author: '', quantity: 1 });
        handle();
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === 'quantity' ? Math.max(1, parseInt(value)) : value
        }));
        validate();
    };

    return (
        <div className="w-full h-full fixed top-0 z-10 bg-black/30 backdrop-blur-sm p-8 flex justify-center items-center">
            <div className='w-1/2 bg-dun p-4 rounded-md'>
                <div className='flex justify-between items-center'>
                    <h2 className="mb-6 text-2xl font-bold text-night">Edit Book</h2>
                    <XIcon className='text-4xl text-red-600 cursor-pointer' onClick={handle} />
                </div>
                <form onSubmit={handleSubmit} className="space-y-6 text-white" encType='multipart/form-data'>

                    {/* Title Input */}
                    <div className="space-y-2">
                        <label htmlFor="title" className="flex text-night items-center gap-2">
                            <Book className="h-4 w-4" />
                            <span>Book Title</span>
                        </label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            className="w-full rounded-lg border border-gris bg-smoke p-3 outline-none focus:border-platinum"
                            placeholder="Enter book title"
                            required
                        />
                        {errors.title && <p className="text-red-500">{errors.title}</p>}
                    </div>

                    {/* Author Input */}
                    <div className="space-y-2">
                        <label htmlFor="author" className="flex text-night items-center gap-2">
                            <User className="h-4 w-4" />
                            <span>Author</span>
                        </label>
                        <input
                            type="text"
                            id="author"
                            name="author"
                            value={formData.author}
                            onChange={handleChange}
                            className="w-full rounded-lg border border-gris bg-smoke p-3 outline-none focus:border-platinum"
                            placeholder="Enter author name"
                            required
                        />
                        {errors.author && <p className="text-red-500">{errors.author}</p>}
                    </div>

                    {/* Quantity Input */}
                    <div className="space-y-2">
                        <label htmlFor="quantity" className="flex text-night items-center gap-2">
                            <Hash className="h-4 w-4" />
                            <span>Quantity</span>
                        </label>
                        <input
                            type="number"
                            id="quantity"
                            name="quantity"
                            value={formData.quantity}
                            onChange={handleChange}
                            min="1"
                            className="w-full rounded-lg border border-gris bg-smoke p-3 outline-none focus:border-platinum"
                            required
                        />
                        {errors.quantity && <p className="text-red-500">{errors.quantity}</p>}
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="mt-6 w-full rounded-lg bg-night px-6 py-3 text-flash transition-colors hover:bg-jet focus:outline-none focus:ring-2 focus:ring-platinum"
                    >
                        Apply
                    </button>
                </form>
            </div>
        </div>
    );
};

export default EditBook;
