import { createContext } from "react";
import { type LoginData, type RegisterData } from "../sdk/api";

type AuthContextType = {
    isAuthenticated: boolean,
    logout: () => void,
    login: (loginData: LoginData) => void,
    register: (registerData: RegisterData) => void
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);