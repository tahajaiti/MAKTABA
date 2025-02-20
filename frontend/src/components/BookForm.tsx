import React, { useState } from 'react';
import { Book, User, Hash, Image } from 'lucide-react';
import { BookAdd } from '../types/Book';
import { useBookStore } from '../stores/bookStore';

const BookForm = () => {
    const { add, getAll } = useBookStore();
    const [formData, setFormData] = useState<BookAdd>({
        title: '',
        author: '',
        cover: null,
        quantity: 1
    });

    const [preview, setPreview] = useState<string>('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const form = new FormData();
        form.append('title', formData.title);
        form.append('author', formData.author);
        form.append('quantity', formData.quantity.toString());
        form.append('cover', formData.cover as File);

        await add(form);
        getAll();
        setFormData({
            title: '',
            author: '',
            cover: null,
            quantity: 1
        });
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files;
        if (file && file[0]) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const imageUrl = reader.result as string;
                setPreview(imageUrl);
                setFormData(prev => ({
                    ...prev,
                    cover: file[0]
                }));
            };
            reader.readAsDataURL(file[0]);
        }
    };

    return (
        <div className="w-full h-full fixed top-0 z-10 rounded-lg bg-black/30 backdrop-blur-sm p-8 flex justify-center items-center">
            <div className='w-1/2 bg-dun p-4 rounded-md'>
                <h2 className="mb-6 text-2xl text-center font-bold text-night">Add New Book</h2>
                <form onSubmit={handleSubmit} className="space-y-6 text-white" encType='multipart/form-data'>
                    {/* Cover Input */}
                    <div className='flex flex-col justify-center items-center gap-4'>
                        <input
                            onChange={handleImageChange}
                            className="text-white bg-jet p-2 rounded-lg cursor-pointer"
                            id="cover"
                            accept="image/*"
                            name="cover"
                            type="file"
                        />
                        {preview ? (
                            <img
                                src={preview}
                                alt="Book cover preview"
                                className="h-52 w-32 rounded-lg object-cover"
                            />
                        ) : (
                            <div className="flex h-52 w-32 bg-jet rounded-md flex-col items-center justify-center gap-2 text-white">
                                <Image className="h-8 w-8" />
                            </div>
                        )}
                    </div>

                    {/* Title Input */}
                    <div className="space-y-2">
                        <label htmlFor="title" className="flex text-night items-center gap-2 ">
                            <Book className="h-4 w-4" />
                            <span>Book Title</span>
                        </label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            className="w-full rounded-lg border border-gris bg-smoke p-3  outline-none focus:border-platinum"
                            placeholder="Enter book title"
                            required
                        />
                    </div>

                    {/* Author Input */}
                    <div className="space-y-2">
                        <label htmlFor="author" className="flex  text-night items-center gap-2 ">
                            <User className="h-4 w-4" />
                            <span>Author</span>
                        </label>
                        <input
                            type="text"
                            id="author"
                            name="author"
                            value={formData.author}
                            onChange={handleChange}
                            className="w-full rounded-lg border border-gris bg-smoke p-3  outline-none focus:border-platinum"
                            placeholder="Enter author name"
                            required
                        />
                    </div>

                    {/* Quantity Input */}
                    <div className="space-y-2">
                        <label htmlFor="quantity" className="flex text-night items-center gap-2 ">
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
                            className="w-full rounded-lg border border-gris bg-smoke p-3  outline-none focus:border-platinum"
                            required
                        />
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="mt-6 w-full rounded-lg bg-night px-6 py-3 text-flash transition-colors hover:bg-jet focus:outline-none focus:ring-2 focus:ring-platinum"
                    >
                        Add Book
                    </button>
                </form>
            </div>
        </div>
    );
};

export default BookForm;