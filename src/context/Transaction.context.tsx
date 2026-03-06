import { TransactionCategories } from "@/shared/interfaces/https/transction-catehories"
import { createContext, FC, PropsWithChildren, useCallback, useContext, useState } from "react"
import * as transactionService from "@/shared/services/dt-money/transaction.service"
import { CreateTransaction } from "@/shared/interfaces/https/create-transction"
import { Transaction } from "@/shared/interfaces/transaction"
import { TotalTransaction } from "@/shared/interfaces/total-transaction"
import { updateTransactionInterface } from "@/shared/interfaces/https/update-transaction-request"
import { Pagination } from "@/shared/interfaces/https/get-transactions-request"
import { se } from "date-fns/locale"

interface fetchTransactionParamas {
    page: number
}
interface Loadings {
    initial: boolean,
    refresh: boolean,
    loadMore: boolean
}
interface handleLoadingParams {
     key: keyof Loadings,
      value: boolean 
    }
export type TransactionContextType = {
    fetchCategories: () => Promise<void>
    categories: TransactionCategories[]
    createTransaction: (transaction: CreateTransaction) => Promise<void>
    fetchTransaction: (params: fetchTransactionParamas) => Promise<void>
    totalTransactions: TotalTransaction
    transactions: Transaction[]
    updateTransaction: (transaction: updateTransactionInterface) => Promise<void>
    refashTransaction: () => Promise<void>
    loadings: Loadings
    loadMoreTransactions: () => Promise<void>
    handleLoading: (params: handleLoadingParams) => void
}


export const TransactiontContext = createContext<TransactionContextType>({} as TransactionContextType)

export const TransactiontContextProvider: FC<PropsWithChildren> = ({ children }) => {

    const [categories, setCategories] = useState<TransactionCategories[]>([]);
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [loadings, setLoading] = useState<Loadings>({
        initial: false,
        refresh: false,
        loadMore: false
    })
    const [totalTransactions, setTotalTransactions] = useState<TotalTransaction>({
        expense: 0,
        revenue: 0,
        total: 0
    } as TotalTransaction)

    const [pagination, setPagination] = useState<Pagination>({
        page: 1,
        perPage: 15,
        totalRows: 0,
        totalPages: 0
    });
    

    const handleLoading = ({ key, value }: handleLoadingParams)  => {
        setLoading({ ...loadings, [key]: value })
    }



    const refashTransaction = useCallback(async () => {
        const { page, perPage } = pagination
        const transactionsResponse = await transactionService.getTransactions({ page: 1, perPage: page * perPage });
        setTransactions(transactionsResponse.data);
        setTotalTransactions(transactionsResponse.totalTransactions);
        setPagination({
            ...pagination,
            totalRows: transactionsResponse.totalRows,
            totalPages: transactionsResponse.totalPages
        })
    }, [pagination])


    const fetchCategories = async () => {
        const categoriesResponse = await transactionService.getTransactionCategories();
        setCategories(categoriesResponse);
    }

    const createTransaction = async (transaction: CreateTransaction) => {
        await transactionService.createTransaction(transaction);
        await refashTransaction();
    }
    const updateTransaction = async (transaction: updateTransactionInterface) => {
        await transactionService.updateTransaction(transaction)
        await refashTransaction();
    }

    const fetchTransaction = useCallback(async ({ page = 1 }: fetchTransactionParamas) => {

        const transactionsResponse = await transactionService.getTransactions({ page, perPage: pagination.page });
        if (page === 1) {
            setTransactions(transactionsResponse.data);
        } else {
            setTransactions((prev) => [...prev, ...transactionsResponse.data]);
        }
        setTotalTransactions(transactionsResponse.totalTransactions);
        setPagination({
            ...pagination,
            page,
            totalRows: transactionsResponse.totalRows,
            totalPages: transactionsResponse.totalPages
        });
    }, [])

    const loadMoreTransactions = useCallback(async () => {
        if (loadings.loadMore || pagination.page === pagination.totalPages) return;
        fetchTransaction({ page: pagination.page + 1 })

    }, [loadings.loadMore, pagination])

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
            loadings,
            loadMoreTransactions,
            handleLoading
        }}>
            {children}
        </TransactiontContext.Provider>
    )
}

export const useTransactionContext = () => {
    return useContext(TransactiontContext)
}