import React, { useEffect, useState } from 'react';
import { useBookStore } from '../stores/bookStore';
import { BookCard } from '../components/BookCard';
import { useAuthStore } from '../stores/authStore';
import BookForm from '../components/BookForm';

const Books: React.FC = () => {
  const [showForm, setShowForm] = useState(false);
  const { books, getAll, nextPage, prevPage, current_page, last_page } = useBookStore();
  const { role } = useAuthStore();

  const pages = Array.from({ length: last_page }, (_, i) => i + 1);

  useEffect(() => {
    getAll(current_page);
  }, [current_page, getAll]);

  const fetch = (page: number) => {
    getAll(page);
  }

  return (
    <>
      {showForm && <BookForm handle={() => setShowForm(!showForm)} />}
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

        <div className='flex items-center justify-center gap-2'>
          {current_page === last_page &&
            <button
              onClick={() => prevPage()}
              className="px-4 py-2 rounded-sm bg-dun hover:bg-dun/50 cursor-pointer"
            >
              Prev
            </button>}

          {pages.map(num => (
            <button
              key={num}
              className={`px-4 py-2 rounded-sm ${num === current_page ? 'bg-jet text-dun' : 'bg-dun hover:bg-dun/50'} transition-all cursor-pointer`}
              onClick={() => fetch(num)}
            >
              {num}
            </button>
          ))}

          {current_page === 1 &&
            <button
              onClick={() => nextPage()}
              className="px-4 py-2 rounded-sm bg-dun hover:bg-dun/50 cursor-pointer"
            >
              Next
            </button>}
        </div>

      </div>
    </>
  );
};

export default Books;