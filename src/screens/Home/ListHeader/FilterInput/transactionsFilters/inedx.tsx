import { Text, Touchable, TouchableOpacity, View } from "react-native"
import { MaterialIcons } from "@expo/vector-icons"
import { colors } from "@/shared/colors"
import { useBottomSheetContext } from "@/context/bottomsheet.context"
import { DataFilter } from "./DataFilter"
import { CategoryFilter } from "./CategoryFilter"
import { TypeFilter } from "./TypeFilter"
import { AppButton } from "@/components/AppButton"
import { useTransactionContext } from "@/context/Transaction.context"
import { useErrorHandler } from "@/shared/hooks/useErrorHandler"

export const TransactionsFilters = () => {

    const { close } = useBottomSheetContext()
    const { fetchTransaction, handleLoading, resetFilter } = useTransactionContext()
    const { handleError } = useErrorHandler()

    const handleFetchTransaction = async () => {
        try {
            handleLoading({ key: "refresh", value: true })
            await fetchTransaction({ page: 1 })
        } catch (error) {
            handleError(error, 'Não foi possível realizar a operação, tente novamente mais tarde.');
        } finally {
            handleLoading({ key: "refresh", value: false })
            close()
        }
    }
   const handleResetFilter = async () => {
        try {
            handleLoading({ key: "refresh", value: true })
            await resetFilter()
        } catch (error) {
            handleError(error, 'Não foi possível realizar a operação, tente novamente mais tarde.');
        } finally {
            handleLoading({ key: "refresh", value: false })
            close()
        }
    }

    return <View className="flex-1 bg-gray[1000] p-6">
        <View className="flex-row justify-between">
            <Text className="text-xl text-white font-bold mb-5"> Filtrar transações</Text>
            <TouchableOpacity onPress={close}>
                <MaterialIcons name="close" size={20} color={colors.gray["600"]} />
            </TouchableOpacity>
        </View>
        <DataFilter />
        <CategoryFilter />
        <TypeFilter />

        <View className="flex-row gap-4 mt-8">
            <AppButton
                onPress={handleResetFilter}
                className="flex-1"
                mode="outline"
                widthFull={false}>
                Limpa Filtros
            </AppButton>
            <AppButton
                onPress={handleFetchTransaction}
                className="flex-1"
                widthFull={false} >
                Filtrar
            </AppButton>
        </View>
    </View>
}