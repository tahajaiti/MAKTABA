import { ReactNode, useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [isLogged, setIsLogged] = useState<boolean>(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        setIsLogged(!!token);
    }, []);

    const login = (token: string) => {
        localStorage.setItem('token', token);
        setIsLogged(true);
    };

    const logout = () => {
        localStorage.removeItem('token');
        setIsLogged(false);
    };

    return (
        <AuthContext.Provider value={{ isLogged, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};