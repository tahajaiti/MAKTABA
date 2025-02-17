"use client"

import type React from "react"
import { useState } from "react"

const Navbar: React.FC = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    return (
        <header className="bg-gray-900 text-white">
            <div className="container mx-auto px-4 py-3 flex items-center justify-between">
                <div className="flex items-center">
                    <span className="text-2xl font-bold">MEKTABA</span>
                </div>

                <nav className="hidden md:flex space-x-6">
                    <a href="#" className="hover:text-purple-400 transition duration-300">
                        Home
                    </a>
                    <a href="#" className="hover:text-purple-400 transition duration-300">
                        Books
                    </a>
                    <a href="#" className="hover:text-purple-400 transition duration-300">
                        About
                    </a>
                </nav>

                <div className="hidden md:flex items-center space-x-4">
                    <button className="cursor-pointer bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md transition duration-300">
                        Login
                    </button>
                    <button className="cursor-pointer bg-transparent border border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white px-4 py-2 rounded-md transition duration-300">
                        Register
                    </button>
                </div>

                <button className="md:hidden text-white focus:outline-none" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                    <span className="block w-6 h-6 border-2 border-white rounded-md"></span>
                </button>
            </div>

            {isMenuOpen && (
                <div className="md:hidden bg-gray-800">
                    <nav className="flex flex-col p-4 space-y-3">
                        <a href="#" className="hover:text-purple-400 transition duration-300">
                            Home
                        </a>
                        <a href="#" className="hover:text-purple-400 transition duration-300">
                            Books
                        </a>
                        <a href="#" className="hover:text-purple-400 transition duration-300">
                            About
                        </a>
                    </nav>
                    <div className="flex flex-col p-4 space-y-3">
                        <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md transition duration-300">
                            Login
                        </button>
                        <button className="bg-transparent border border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white px-4 py-2 rounded-md transition duration-300">
                            Register
                        </button>
                    </div>
                </div>
            )}
        </header>
    )
}

export default Navbar

