import AuthData from "../../types/Auth";

export interface AuthContextType {
    isLogged: boolean;
    login: (data: AuthData) => void;
    logout: () => void;
}