import React, { useEffect } from 'react';
import { useBookStore } from '../stores/bookStore';
import { BookCard } from '../components/BookCard';
import { useAuthStore } from '../stores/authStore';

const Books: React.FC = () => {
  const { books, getAll } = useBookStore();
  const { isAuth, user } = useAuthStore();

  const getRole = () => {
    if (isAuth && user) {
      console.log(user);
      
      return user.role;
    }

    return '';
  }


  useEffect(() => {
    getAll();
  }, [getAll]);

  return (
    <div className='container mx-auto p-10'>
      <div className='w-full px-4 flex justify-between items-center'>
        <h1 className='text-2xl font-bold text-dun'>Books</h1>
        {getRole() === 'admin' ?
          (<button
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
  );
};

export default Books;