import React from 'react'
import ReactDOM from 'react-dom'

const Loading: React.FC = () => {
    return ReactDOM.createPortal(
        <div className="fixed inset-0 bg-white/40 backdrop-blur-lg flex items-center justify-center z-50">
            <div className="animate-spin h-10 w-10 border-4 border-amber-500 border-t-transparent rounded-full"></div>
        </div>,
        document.body
    );
}

export default Loading