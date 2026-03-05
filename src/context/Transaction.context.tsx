import { TransactionCategories } from "@/shared/interfaces/https/transction-catehories"
import { createContext, FC, PropsWithChildren, useCallback, useContext, useState } from "react"
import * as transactionService from "@/shared/services/dt-money/transaction.service"
import { CreateTransaction } from "@/shared/interfaces/https/create-transction"
import { Transaction } from "@/shared/interfaces/transaction"
import { TotalTransaction } from "@/shared/interfaces/total-transaction"
import { updateTransactionInterface } from "@/shared/interfaces/https/update-transaction-request"

export type TransactionContextType = {
    fetchCategories: () => Promise<void>
    categories: TransactionCategories[]
    createTransaction: (transaction: CreateTransaction) => Promise<void>
    fetchTransaction: () => Promise<void>
    totalTransactions: TotalTransaction
    transactions: Transaction[]
    updateTransaction: (transaction: updateTransactionInterface) => Promise<void>
    refashTransaction: () => Promise<void>
    loading: boolean
}


export const TransactiontContext = createContext<TransactionContextType>({} as TransactionContextType)

export const TransactiontContextProvider: FC<PropsWithChildren> = ({ children }) => {

    const refashTransaction = async () => {
        setLoading(true);
        const transactionsResponse = await transactionService.getTransactions({ page: 1, perPage: 10 });
        setTransactions(transactionsResponse.data);
        setTotalTransactions(transactionsResponse.totalTransactions);
        setLoading(false);
    }
    const [categories, setCategories] = useState<TransactionCategories[]>([]);
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [loading, setLoading] = useState(false)
    const [totalTransactions, setTotalTransactions] = useState<TotalTransaction>({
        expense: 0,
        revenue: 0,
        total: 0
    } as TotalTransaction)
    const fetchCategories = async () => {
        const categoriesResponse = await transactionService.getTransactionCategories();
        setCategories(categoriesResponse);
    }

    const createTransaction = async (transaction: CreateTransaction) => {
        await transactionService.createTransaction(transaction);
        await fetchTransaction();
    }

    const fetchTransaction = useCallback(async () => {
        const transactionsResponse = await transactionService.getTransactions({ page: 1, perPage: 10 });

        console.log(transactionsResponse.data);
        setTransactions(transactionsResponse.data);
        setTotalTransactions(transactionsResponse.totalTransactions);
    }, [])
    const updateTransaction = async (transaction: updateTransactionInterface) => {
        await transactionService.updateTransaction(transaction)
        await fetchTransaction();
    }


    return (
        <TransactiontContext.Provider value={{
            fetchTransaction,
            fetchCategories,
            createTransaction,
            categories,
            totalTransactions,
            transactions,
            updateTransaction,
            refashTransaction,
            loading
        }}>
            {children}
        </TransactiontContext.Provider>
    )
}

export const useTransactionContext = () => {
    return useContext(TransactiontContext)
}