import { dtMoneyApi } from "@/shared/Api/dt-money"
import { TransactionCategories } from "@/shared/interfaces/https/transction-catehories"

export const getTransactionCategories = async (): Promise<TransactionCategories[]> => {
    const { data } = await dtMoneyApi.get<TransactionCategories[]>('/transaction/categories')

    return data
}