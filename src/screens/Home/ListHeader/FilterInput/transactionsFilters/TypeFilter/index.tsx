import { useTransactionContext } from "@/context/Transaction.context"
import { transactionTypesEnum } from "@/shared/enums/transction-types"
import Checkbox from "expo-checkbox"
import { Text, TouchableOpacity, View } from "react-native"

export const TypeFilter = () => {

    const { filters, handleFilter } = useTransactionContext()

    const selectType = (typeId: transactionTypesEnum) => {
        handleFilter({ key: 'typeId', value: typeId })
    }
    return (
        <View className="mb-6">
            <Text className="text-base font-medium mb-5 text-gray-600">
                Tipos de transações
            </Text>
            <TouchableOpacity onPress={() => selectType(transactionTypesEnum.REVENUE)} className="flex-row items-center py-2">
                <Checkbox
                    value={filters.typeId === transactionTypesEnum.REVENUE}
                    onValueChange={() => selectType(transactionTypesEnum.REVENUE)}
                    className="mr-4" />
                <Text className="text-lg text-white">Entrada</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => selectType(transactionTypesEnum.EXPENSE)}
                className="flex-row items-center py-2">
                <Checkbox
                    value={filters.typeId === transactionTypesEnum.EXPENSE}
                    onValueChange={() => selectType(transactionTypesEnum.EXPENSE)} 
                    className="mr-4" />
                <Text className="text-lg text-white">Saida</Text>
            </TouchableOpacity>
        </View>
    )
}