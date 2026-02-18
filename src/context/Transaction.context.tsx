import { TransactionCategories } from "@/shared/interfaces/https/transction-catehories"
import { createContext, FC, PropsWithChildren, useContext, useState } from "react"
import * as transactionService from "@/shared/services/dt-money/transaction.service"

export type TransactionContextType = {
   fetchCategories: () => Promise<void>
   categories: TransactionCategories[]
}



export const TransactiontContext = createContext<TransactionContextType>({} as TransactionContextType)


export const TransactiontContextProvider: FC<PropsWithChildren> = ({ children }) => {

    const [categories, setCategories] = useState<TransactionCategories[]>([]);

    const fetchCategories = async () => {
        const categoriesResponse = await transactionService.getTransactionCategories();
        setCategories(categoriesResponse);
    }

    return (
        <TransactiontContext.Provider value={{
            fetchCategories,
            categories
        }}>
            {children}
        </TransactiontContext.Provider>
    )
}

export const useTransactionContext = () => {
    return useContext(TransactiontContext)
}