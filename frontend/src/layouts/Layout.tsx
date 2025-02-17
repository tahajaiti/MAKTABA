import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Layout: React.FC = () => {
  return (
    <>
      <Navbar />
      <main className="min-h-[84vh]">
        <Outlet/>
      </main>
      <Footer />
    </>
  );
};

export default Layout;