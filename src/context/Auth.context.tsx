import { FormLoginParams } from "@/screens/login/LoginForm";
import { RegisterFormProps } from "@/screens/Register/RegisterFom";
import { createContext, FC, PropsWithChildren, use, useContext, useState } from "react";
import * as authService from "@/shared/services/dt-money/auth.service";
import { Iuser } from "@/shared/interfaces/https/user-interface";
import AsyncStrore from "@react-native-async-storage/async-storage";
import { IauthenticateResponse } from "@/shared/interfaces/https/authenticate-response";
import { set } from "react-hook-form";

type AuthContextType = {
    user: Iuser | null;
    token: string | null;
    handleAuthentication: (params: FormLoginParams) => void;
    handleRegister: (params: RegisterFormProps) => void;
    handleLogout: () => void;
    restoreUserSession: () => Promise<string | null>;
};


export const AuthContext = createContext<AuthContextType>(
    {} as AuthContextType
);

export const AuthContextProvider: FC<PropsWithChildren> = ({ children }) => {
    const [user, setUser] = useState<Iuser | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const handleAuthentication = async (userDate: FormLoginParams) => {
        const { user, token } = await authService.authnticate(userDate);
        await AsyncStrore.setItem('dt-money-token', JSON.stringify({ user, token }));
        setUser(user);
        setToken(token);
    };


    const handleRegister = async (formData: RegisterFormProps) => {
        const { user, token } = await authService.registerUser(formData);
        await AsyncStrore.setItem('dt-money-token', JSON.stringify({ user, token }));
        setUser(user);
        setToken(token);
    };

    const handleLogout = async () => {
        await AsyncStrore.removeItem('dt-money-token');
        setUser(null);
        setToken(null);
    }
    const restoreUserSession = async () => {
        const userSession = await AsyncStrore.getItem('dt-money-token');
        if (userSession) {
            const { user, token } = JSON.parse(userSession) as IauthenticateResponse;
            setUser(user);  
            setToken(token);
        }
        return userSession
        
    }

    return (
        <AuthContext.Provider
            value={{
                user,
                token,
                handleAuthentication,
                handleRegister,
                handleLogout,
                restoreUserSession
            }}>
            {children}
        </AuthContext.Provider>
    )
}


export const useAuthContext = () => {
    const context = useContext(AuthContext);
    return context;
};