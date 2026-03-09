import { useTransactionContext } from "@/context/Transaction.context"
import { colors } from "@/shared/colors"
import { Text, TouchableOpacity, View } from "react-native"
import { TextInput } from "react-native-gesture-handler"
import { MaterialIcons } from "@expo/vector-icons"
import { useEffect, useState } from "react"
import { useBottomSheetContext } from "@/context/bottomsheet.context"
import { TransactionsFilters } from "./transactionsFilters/inedx"

export const FilterInput = () => {

    const { pagination, setSearchText, searchText, fetchTransaction } = useTransactionContext()

    const {open} = useBottomSheetContext()

    const [text, setText] = useState("")

    useEffect(() => {
        const handleText = setTimeout(() => {
            setSearchText(text)
        }, 500)
        return () => clearTimeout(handleText)
    }, [text])

    useEffect(() => {
        ; (
            async () => {
                try {
                    await fetchTransaction({ page: 1 })
                } catch (error) { }
            })()
    }, [searchText])

    return (
        <View className="mb-4 w-[90%] self-center">
            <View className="w-full flex-row justify-between items-center mt-4 mb-3">
                <Text className="text-white text-xl font-bold">Transações</Text>
                <Text className="text-gray-700 text-base">
                    {pagination.totalRows} {pagination.totalRows === 1 ? "transação" : "transações"}
                </Text>
            </View>

            <TouchableOpacity className="flex-row items-center justify-between h-16">
                <TextInput
                    value={text}
                    onChangeText={setText}
                    className="h-[50] text-white w-full bg-background-primary text-lg pl-4"
                    placeholderTextColor={colors.gray[600]}
                    placeholder="Busque uma transação"
                />
                <TouchableOpacity
                onPress={() => open(<TransactionsFilters/>, 1)}
                className="ablute right-10"
                >
                    <MaterialIcons name="filter-list" size={26} color={colors["accent-brand-light"]}
                        classeName="mr-3" />
                </TouchableOpacity>
            </TouchableOpacity>
        </View>
    )
}