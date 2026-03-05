import { CreateTransaction } from "@/shared/interfaces/https/create-transction"
import { FC, useState } from "react"
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native"
import { colors } from "@/shared/colors"
import { MaterialIcons } from "@expo/vector-icons"
import { useBottomSheetContext } from "@/context/bottomsheet.context"
import { TextInput } from "react-native-gesture-handler"
import CurrencyInput from "react-native-currency-input"
import * as Yup from "yup"
import { useTransactionContext } from "@/context/Transaction.context"
import { useErrorHandler } from "@/shared/hooks/useErrorHandler"
import { ErrorMessage } from "@/components/ErrorMessage"
import { SelectCategoryModal } from "@/components/SelectCategoryModel"
import { TransactionTypeSelector } from "@/components/SelectType"
import { AppButton } from "@/components/AppButton"
import { transactionSchema } from "./Schema"
import { Transaction } from "@/shared/interfaces/transaction"
import { updateTransactionInterface } from "@/shared/interfaces/https/update-transaction-request"
type ValidationErrors = Record<keyof updateTransactionInterface, string>

interface Params {
    transaction: Transaction
}




export const EditTransactionForm: FC<Params> = ({transaction: transactionToUpdate,}) => {



    const { close } = useBottomSheetContext()
    const { updateTransaction } = useTransactionContext()
    const { handleError } = useErrorHandler()
    const [loading, setLoading] = useState(false)



    const [error, setError] = useState<ValidationErrors | null>(null)
    const [Transaction, setTransaction] = useState<updateTransactionInterface>(
        {
            id: transactionToUpdate.id,
            description: transactionToUpdate.description,
            value: transactionToUpdate.value,
            typeId: transactionToUpdate.type.id,
            categoryId: transactionToUpdate.category.id
        }
    )

    const setTransactionData = (kay: keyof updateTransactionInterface, value: string | number) => {
        setTransaction((prev) => (
            { ...prev, [kay]: value }
        ))
    }

    const handleUpdateTransaction = async () => {
        try {
            setLoading(true)
            await transactionSchema.validate(Transaction, {
                abortEarly: false,
            })
            await updateTransaction(Transaction)
            close()
        } catch (error) {
            if (error instanceof Yup.ValidationError) {
                const errors = {} as ValidationErrors

                error.inner.forEach((err) => {
                    if (err.path) {
                        errors[err.path as keyof updateTransactionInterface] = err.message
                    }
                })
                setError(errors)
            } else {
                handleError(error, 'Ocorreu um erro ao atualizar a transação. Tente novamente mais tarde.')
            }

        }

        setLoading(false)
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
                {error?.description && (
                    <ErrorMessage>{error.description}</ErrorMessage>
                )}

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
                {error?.value && (
                    <ErrorMessage>{error.value}</ErrorMessage>
                )}

                <SelectCategoryModal
                    selectedCategory={Transaction.categoryId}
                    onSelect={(categoryId) =>
                        setTransactionData('categoryId', categoryId)
                    }
                />
                {error?.categoryId && (
                    <ErrorMessage>{error.categoryId}</ErrorMessage>
                )}

                <TransactionTypeSelector
                    typeId={Transaction.typeId}
                    setTransctionType={(value) => setTransactionData('typeId', value)}
                />
                {error?.typeId && (
                    <ErrorMessage>{error.typeId}</ErrorMessage>
                )}

                <View className="my-4">
                    
                    <AppButton onPress={handleUpdateTransaction} >
                       {loading ? <ActivityIndicator color={colors.white} /> : 'Criar transação'}
                    </AppButton>
                </View>
            </View>
        </View>
    )
}