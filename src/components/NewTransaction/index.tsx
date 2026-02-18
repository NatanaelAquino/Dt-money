import { CreateTransaction } from "@/shared/interfaces/https/create-transction"
import { useState } from "react"
import { Text, TouchableOpacity, View } from "react-native"
import { colors } from "@/shared/colors"
import { MaterialIcons } from "@expo/vector-icons"
import { useBottomSheetContext } from "@/context/bottomsheet.context"
import { TextInput } from "react-native-gesture-handler"
import CurrencyInput from "react-native-currency-input"
import { TransactionTypeSelector } from "../SelectType"

export const NewTransaction = () => {
    const { close } = useBottomSheetContext()
    const [Transaction, setTransaction] = useState<CreateTransaction>({
        description: '',
        type: 0,
        value: 0,
        category: ''
    })
    const setTransactionData = (kay: keyof CreateTransaction, value: string | number) => {
        setTransaction((prev) => (
            { ...prev, [kay]: value }
        ))
    }

    return (
        <View className="px-8 py-5">
            <TouchableOpacity className="w-full flex-row items-center justify-between" onPress={close}>
                <Text className="text-white text-xl font-bold">Novo transação</Text>
                <MaterialIcons name="close" size={20} color={colors.gray["700"]} />
            </TouchableOpacity>
            <View className="flex-1 mt-8 mb-8">
                <TextInput
                    onChangeText={(value) => setTransactionData('description', value)}
                    placeholderTextColor={colors.gray["700"]}
                    placeholder="Descrição"
                    className="text-white text-lg h-[50px] bg-background-primary  my-2 rounded-[6] pl-4"
                    value={Transaction.description}
                />
                <CurrencyInput
                    className="text-white text-lg h-[50px] bg-background-primary  my-2 rounded-[6] pl-4"
                    placeholderTextColor={colors.gray["700"]}
                    value={Transaction.value}
                    placeholder="Valor"
                    prefix="R$ "
                    delimiter="."
                    separator=","
                    precision={2}
                    minValue={0}
                    onChangeValue={(value) => setTransactionData('value', value ?? 0)}
                />
                <TransactionTypeSelector
                    typeId={Transaction.type}
                    setTransctionType={(value) => setTransactionData('type', value)}
                />
            </View>
        </View>
    )
}