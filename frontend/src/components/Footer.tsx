import type React from "react"

const Footer: React.FC = () => {
    return (
        <footer className="bg-smoke text-flash py-4">
            <div className="container mx-auto px-4 flex flex-col items-center justify-center">
                <span className="text-lg font-bold">Maktaba</span>
                <span className="text-sm">&copy; {new Date().getFullYear()} All rights reserved</span>
            </div>
        </footer>
    )
}

export default Footer