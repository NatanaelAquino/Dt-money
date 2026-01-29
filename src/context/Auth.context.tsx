import { FormLoginParams } from "@/screens/login/LoginForm";
import { RegisterFormProps } from "@/screens/Register/RegisterFom";
import { createContext, FC, PropsWithChildren, use, useContext, useState } from "react";
import * as authService from "@/shared/services/dt-money/auth.service";
import { Iuser } from "@/shared/interfaces/https/user-interface";

type AuthContextType = {
    user: Iuser | null;
    token: string | null;
    handleAuthentication: (params: FormLoginParams) => void;
    handleRegister: (params: RegisterFormProps) => void;
    handleLogout: () => void;
};


export const AuthContext = createContext<AuthContextType>(
    {} as AuthContextType
);

export const AuthContextProvider: FC<PropsWithChildren> = ({ children }) => {
    const [user, setUser] = useState<Iuser | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const handleAuthentication = async (userDate: FormLoginParams) => {
            const { user, token } = await authService.authnticate(userDate);
            setUser(user);
            setToken(token);
            console.log(user, token);
       
    };


    const handleRegister = async (formData: RegisterFormProps) => { };

    const handleLogout = () => { }

    return (
        <AuthContext.Provider
            value={{
                user,
                token,
                handleAuthentication,
                handleRegister,
                handleLogout,
            }}>
            {children}
        </AuthContext.Provider>
    )
}


export const useAuthContext = () => {
    const context = useContext(AuthContext);
    return context;
};