import React, { useEffect, useState } from 'react';
import { useBookStore } from '../stores/bookStore';
import { BookCard } from '../components/BookCard';
import { useAuthStore } from '../stores/authStore';
import BookForm from '../components/BookForm';

const Books: React.FC = () => {
  const [showForm, setShowForm] = useState(false);
  const { books, getAll } = useBookStore();
  const { role } = useAuthStore();


  useEffect(() => {
    getAll();
  }, [getAll]);

  return (
    <>
    {showForm && <BookForm handle={setShowForm}/>}
    <div className='container mx-auto p-10'>
      <div className='w-full px-4 flex justify-between items-center'>
        <h1 className='text-2xl font-bold text-dun'>Books</h1>
        {role === 'admin' ?
          (<button onClick={() => setShowForm(!showForm)}
            className='py-2 px-4 cursor-pointer bg-dun hover:bg-dun/50 text-black transition-all rounded-md'>
            Add book
          </button>) : ''}
      </div>

      <section className='p-4 flex flex-col gap-4'>
        {books.map(b => (
          <BookCard key={b.id} book={b} />
        ))}
      </section>
    </div>
    </>
  );
};

export default Books;