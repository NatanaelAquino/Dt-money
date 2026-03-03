import { FormLoginParams } from "@/screens/login/LoginForm";
import { RegisterFormProps } from "@/screens/Register/RegisterFom";
import { createContext, FC, PropsWithChildren, use, useContext, useState } from "react";
import * as authService from "@/shared/services/dt-money/auth.service";
import { Iuser } from "@/shared/interfaces/https/user-interface";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { IauthenticateResponse } from "@/shared/interfaces/https/authenticate-response";

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
        try {
            const { user, token } = await authService.authnticate(userDate);
            const sessionData = JSON.stringify({ user, token });
            await AsyncStorage.setItem('dt-money-token', sessionData);
       
            setUser(user);
            setToken(token);
            
        } catch (error) {
            console.error("Erro no login:", error);
        }
    };


    const handleRegister = async (formData: RegisterFormProps) => {
        const { user, token } = await authService.registerUser(formData);
        await AsyncStorage.setItem('dt-money-token', JSON.stringify({ user, token }));
        setUser(user);
        setToken(token);
    };

   const handleLogout = async () => {
        try {
            await AsyncStorage.removeItem('dt-money-token');
    
            setUser(null);
            setToken(null); 
            
        } catch (error) {
            console.error('Erro ao remover o token:', error);
        }
    }
    const restoreUserSession = async () => {
        try {
            const userSession = await AsyncStorage.getItem('dt-money-token');

            if (!userSession) {
                setUser(null);
                setToken(null);
                return null;
            }

            const parsed = JSON.parse(userSession);
            setUser(parsed.user);
            setToken(parsed.token);

            return userSession;
        } catch (error) {
            console.error("Erro ao restaurar sessão:", error);
            return null;
        }
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