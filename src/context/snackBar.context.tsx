import { createContext, FC, PropsWithChildren, use, useContext, useState } from "react";


export type SnackBarMessageType = "success" | "error"

interface NotifyMessageParams {
    message: string;
    messagetype: SnackBarMessageType
}
export type SnackBarContextType = {
    message: string | null;
    type: SnackBarMessageType | null;
    notify: (params: NotifyMessageParams) => void
};


const SnackBarContext = createContext({} as SnackBarContextType);


export const SnackBarContextProvider: FC<PropsWithChildren> = ({ children }) => {
    const [message, setMessage] = useState< string | null>(null);
    const [type, setType] = useState<SnackBarMessageType | null>(null);


    const notify = ({ message, messagetype }: NotifyMessageParams) => {
        setMessage(message);
        setType(messagetype);
        setTimeout(() => {
            setMessage(null);
            setType(null);
        }, 3000)
    }

    return (
        <SnackBarContext.Provider
            value={{
                message,
                type,
                notify
            }}>
            {children}
        </SnackBarContext.Provider>
    )
}

export const useSnackBarContext = () => {
    const context = useContext(SnackBarContext); 

    return context
};