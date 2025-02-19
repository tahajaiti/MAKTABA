import React from "react"
import { Link } from "react-router-dom"
import { useAuth } from "../contexts/auth"

const Navbar: React.FC = () => {
    const { isLogged, logout } = useAuth();

    return (
        <header className="bg-jet">
            <div className="container mx-auto px-4 py-3 flex items-center justify-between">
                <div className="flex items-center">
                    <span className="text-2xl font-bold text-yellow-500">MEKTABA</span>
                </div>

                <nav className="flex space-x-6 text-flash">
                    <Link to="/" className="hover:text-yellow-600 transition duration-300">
                        Home
                    </Link>
                    <Link to="/books" className="hover:text-yellow-600 transition duration-300">
                        Books
                    </Link>
                    <Link to="/about" className="hover:text-yellow-600 transition duration-300">
                        About
                    </Link>
                </nav>

                <div className="flex items-center space-x-4">
                    {isLogged ? (
                        <>
                            <button onClick={logout} className="cursor-pointer bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-md transition duration-300">
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to='/login' className="cursor-pointer bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-md transition duration-300">
                                Login
                            </Link>
                            <Link to="/signup" className="cursor-pointer bg-transparent border border-yellow-600 text-yellow-600 hover:bg-yellow-600 hover:text-white px-4 py-2 rounded-md transition duration-300">
                                Register
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </header>
    )
}

export default Navbar