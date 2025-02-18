import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { GlobalProvider } from './contexts/GlobalProvider';
import Layout from './layouts/Layout';
import Home from './pages/Home';
import Books from './pages/Books';
import About from './pages/About';
import Login from './pages/Login';
import Register from './pages/Register';


const App: React.FC = () => {

  return (
    <GlobalProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="books" element={<Books />} />
            <Route path="about" element={<About />} />
          </Route>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </GlobalProvider>
  )
}

export default App