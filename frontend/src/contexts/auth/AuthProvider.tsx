import { ReactNode, useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import AuthData from '../../types/Auth';

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [isLogged, setIsLogged] = useState<boolean>(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        setIsLogged(!!token);
    }, []);

    const login = (data: AuthData) => {
        localStorage.setItem('token', data.access_token);
        localStorage.setItem('user', JSON.stringify(data.user));
        setIsLogged(true);
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setIsLogged(false);
    };

    return (
        <AuthContext.Provider value={{ isLogged, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};