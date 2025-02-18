export interface AuthContextType {
    isLogged: boolean;
    login: (token: string) => void;
    logout: () => void;
}