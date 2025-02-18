import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './layouts/Layout';
import Home from './pages/Home';
import Books from './pages/Books';
import About from './pages/About';
import Login from './pages/Login';


const App: React.FC = () => {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="books" element={<Books />} />
          <Route path="about" element={<About />} />
        </Route>
          <Route path="login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App