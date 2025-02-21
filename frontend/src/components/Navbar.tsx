import React from "react"
import { Link } from "react-router-dom"
import { useAuthStore } from "../stores/authStore";
import { Book, UserIcon } from "lucide-react";

const Navbar: React.FC = () => {
    const { isAuth, logout } = useAuthStore();

    return (
        <header className="bg-night">
            <div className="container mx-auto px-4 py-3 flex items-center justify-between">
                <div className="flex items-center justify-between gap-2">
                    <Book className="text-dun" />
                    <span className="text-2xl font-bold text-dun">MEKTABA</span>

                </div>

                <nav className="flex space-x-6 text-flash">
                    <Link to="/" className="hover:text-dun cursor-pointer transition duration-300">
                        Home
                    </Link>
                    <Link to="/books" className="hover:text-dun cursor-pointer transition duration-300">
                        Books
                    </Link>
                    <Link to="/about" className="hover:text-dun cursor-pointer transition duration-300">
                        About
                    </Link>
                </nav>

                <div className="flex items-center space-x-4 text-black">
                    {isAuth ? (
                        <>
                            <div className="flex justify-baseline items-center gap-4">
                                <Link to="/profile" className="bg-dun p-2 rounded-md hover:bg-jet hover:text-dun cursor-pointer transition duration-300">
                                    <UserIcon/>
                                </Link>
                                <button onClick={logout} className="cursor-pointer bg-dun hover:bg-dun/50 px-4 py-2 rounded-md transition duration-300">
                                    Logout
                                </button>
                            </div>

                        </>
                    ) : (
                        <>
                            <Link to='/login' className="cursor-pointer bg-dun hover:bg-dun/50 text-jet px-4 py-2 rounded-md transition duration-300">
                                Login
                            </Link>
                            <Link to="/register" className="cursor-pointer bg-transparent border border-jet text-dun hover:bg-dun/50 hover:text-white px-4 py-2 rounded-md transition duration-300">
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