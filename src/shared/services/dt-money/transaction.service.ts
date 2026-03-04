import { dtMoneyApi } from "@/shared/Api/dt-money"
import { CreateTransaction } from "@/shared/interfaces/https/create-transction"
import { GetTransactionsParams, GetTransactionsResponse } from "@/shared/interfaces/https/get-transactions-request"
import { TransactionCategories } from "@/shared/interfaces/https/transction-catehories"
import qs from 'qs'
export const getTransactionCategories = async (): Promise<TransactionCategories[]> => {
    const { data } = await dtMoneyApi.get<TransactionCategories[]>('/transaction/categories')

    console.log(data)
    return data
}

export const createTransaction = async (transaction: CreateTransaction) => {
    await dtMoneyApi.post('/transaction', transaction)

}
export const getTransactions = async (params: GetTransactionsParams): Promise<GetTransactionsResponse> => {
    const { data } = await dtMoneyApi.get<GetTransactionsResponse>('/transaction', {
        params,
        paramsSerializer: (p) => {
            return qs.stringify(p, { arrayFormat: 'repeat' })
        }
    })
    return data
}

export const deleteTransaction = async (id: number) => {
    await dtMoneyApi.delete(`/transaction/${id}`)
}