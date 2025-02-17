import React from "react"
import { Link } from "react-router-dom" 

const Navbar: React.FC = () => {
    return (
        <header className="bg-gray-900 text-white">
            <div className="container mx-auto px-4 py-3 flex items-center justify-between">
                <div className="flex items-center">
                    <span className="text-2xl font-bold">MEKTABA</span>
                </div>

                <nav className="flex space-x-6">
                    <Link to="/" className="hover:text-purple-400 transition duration-300">
                        Home
                    </Link>
                    <Link to="/books" className="hover:text-purple-400 transition duration-300">
                        Books
                    </Link>
                    <Link to="/about" className="hover:text-purple-400 transition duration-300">
                        About
                    </Link>
                </nav>

                <div className="flex items-center space-x-4">
                    <button className="cursor-pointer bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md transition duration-300">
                        Login
                    </button>
                    <button className="cursor-pointer bg-transparent border border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white px-4 py-2 rounded-md transition duration-300">
                        Register
                    </button>
                </div>
            </div>
        </header>
    )
}

export default Navbar