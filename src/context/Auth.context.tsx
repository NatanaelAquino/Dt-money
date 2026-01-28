import { FormLoginParams } from "@/screens/login/LoginForm";
import { RegisterFormProps } from "@/screens/Register/RegisterFom";
import { createContext, FC, PropsWithChildren, use, useContext, useState } from "react";


type AuthContextType = {
    user: null;
    token: string | null;
    handleAuthentication: (params: FormLoginParams) => void;
    handleRegister: (params: RegisterFormProps) => void;
    handleLogout: () => void;
};


export const AuthContext = createContext<AuthContextType>(
    {} as AuthContextType
);

export const AuthContextProvider: FC<PropsWithChildren> = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState<string | null>(null);
    const handleAuthentication = async ({ email, password }: FormLoginParams) => { };
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


export const useAuthContext = ()=>{
    const context  = useContext(AuthContext);
    return context;
};