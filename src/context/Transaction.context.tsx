import { TransactionCategories } from "@/shared/interfaces/https/transction-catehories"
import { createContext, FC, PropsWithChildren, useCallback, useContext, useMemo, useState } from "react"
import * as transactionService from "@/shared/services/dt-money/transaction.service"
import { CreateTransaction } from "@/shared/interfaces/https/create-transction"
import { Transaction } from "@/shared/interfaces/transaction"
import { TotalTransaction } from "@/shared/interfaces/total-transaction"
import { updateTransactionInterface } from "@/shared/interfaces/https/update-transaction-request"
import { Filter, Pagination } from "@/shared/interfaces/https/get-transactions-request"
import { se } from "date-fns/locale"
import { set } from "date-fns"


const filterInitialState: Filter = {
    from: undefined,
    to: undefined,
    typeId: undefined,
    categoryId: {}
}

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
interface handleFiltersParams {
    key: keyof Filter,
    value: Date | number | Boolean
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
    handleLoading: (params: handleLoadingParams) => void,
    pagination: Pagination,
    setSearchText: (text: string) => void,
    searchText: string
    filters: Filter
    handleFilter: (params: handleFiltersParams) => void
    handleCategoryFilter: (categoryId: number) => void
    resetFilter: () => Promise<void>
    deleteTransaction: (transactionId: number) => Promise<void>
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

    const [searchText, setSearchText] = useState('')
    const [filters, setFilters] = useState<Filter>(filterInitialState)
    const categoryIds = useMemo(
        () => Object
            .entries(filters.categoryId)
            .filter(([key, value]) => value)
            .map(([key]) => Number(key)),
        [filters.categoryId]
    )


    const handleLoading = ({ key, value }: handleLoadingParams) => {
        setLoading({ ...loadings, [key]: value })
    }



    const refashTransaction = useCallback(async () => {
        const transactionsResponse = await transactionService.getTransactions({ page: 1, perPage: pagination.perPage });
        setTransactions(transactionsResponse.data);
        setTotalTransactions(transactionsResponse.totalTransactions);
        setPagination({
            page: 1,
            perPage: pagination.perPage,
            totalRows: transactionsResponse.totalRows,
            totalPages: transactionsResponse.totalPages
        })
    }, [pagination.perPage, filters, categoryIds])


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

        const transactionsResponse = await transactionService.getTransactions(
            {
                page,
                perPage: pagination.page,
                searchText,
                ...filters,
                categoryIds
            }
        );
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
    }, [pagination, searchText, filters, categoryIds])

    const loadMoreTransactions = useCallback(async () => {
        if (loadings.loadMore || pagination.page === pagination.totalPages) return;
        fetchTransaction({ page: pagination.page + 1 })

    }, [loadings.loadMore, pagination])

    const handleFilter = ({ key, value }: handleFiltersParams) => {
        setFilters({ ...filters, [key]: value })
    }

    const handleCategoryFilter = (categoryId: number) => {
        setFilters((prevValue) => ({
            ...prevValue,
            categoryId: {
                ...prevValue.categoryId,
                [categoryId]: !Boolean(prevValue.categoryId[categoryId])
            }
        }))
    }
    const resetFilter = useCallback(async () => {
        setFilters(filterInitialState)
        setSearchText('')

        const transactionsResponse = await transactionService.getTransactions({
            page: 1,
            perPage: pagination.perPage,
            searchText: '',
            categoryIds: [],
        });

        setTransactions(transactionsResponse.data);
        setTotalTransactions(transactionsResponse.totalTransactions);
        setPagination({
            ...pagination,
            page: 1,
            perPage: pagination.perPage,
            totalRows: transactionsResponse.totalRows,
            totalPages: transactionsResponse.totalPages
        })
    }, [])
    const deleteTransaction = async (transactionId: number) => {
        await transactionService.deleteTransaction(transactionId)
        await refashTransaction();
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
            loadings,
            loadMoreTransactions,
            handleLoading,
            pagination,
            setSearchText,
            searchText,
            handleFilter,
            filters,
            handleCategoryFilter,
            resetFilter,
            deleteTransaction
        }}>
            {children}
        </TransactiontContext.Provider>
    )
}

export const useTransactionContext = () => {
    return useContext(TransactiontContext)
}