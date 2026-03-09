import { useTransactionContext } from "@/context/Transaction.context"
import clsx from "clsx"
import { format, isValid, set } from "date-fns"
import { ptBR } from "date-fns/locale"
import { useState } from "react"
import { Text, TouchableOpacity, View } from "react-native"
import DateTimePicker from "react-native-modal-datetime-picker"
export const DataFilter = () => {

    const [showStart, setShowStart] = useState(false)
    const [showEnd, setShowEnd] = useState(false)
    const { filters, handleFilter } = useTransactionContext()

    const onStartCancel = () => {
        setShowStart(false)
    }
    const onStartConfirm = (selectedDate: Date) => {
        setShowStart(false)
        handleFilter({ key: 'from', value: selectedDate })
    }
    const onendCancel = () => {
        setShowEnd(false)
    }
    const onendConfirm = (selectedDate: Date) => {
        setShowEnd(false)
        handleFilter({ key: 'to', value: selectedDate })

    }
    const formatDate = (date?: Date) => {
        if (!date || !isValid) {
            return undefined
        }
        return format(date, "dd/MM/yyyy", {
            locale: ptBR

        })
    }
    return (
        <>
            <Text className="text-base font-medium mb-5 text-gray-600">
                Data
            </Text>

            <View className="flex-row justify-between mb-6">
                <View className="w-[48%]">
                    <TouchableOpacity onPress={() => setShowStart(true)} className="rounded-md p-2 border-b border-gray-800">
                        <Text className={clsx(" text-xl", filters.from ? "text-white" : "text-gray-700")}>
                            {formatDate(filters.from) || "De"}
                        </Text>
                    </TouchableOpacity>
                </View>
                <View className="w-[48%]">
                    <TouchableOpacity onPress={() => setShowEnd(true)} className="rounded-md p-2 border-b border-gray-800">
                        <Text className={clsx(" text-xl", filters.to ? "text-white" : "text-gray-700")}>
                            {formatDate(filters.to) || "Até"}
                        </Text>
                    </TouchableOpacity>
                </View>
                <DateTimePicker
                    isVisible={showStart}
                    date={filters.from}
                    mode="date"
                    onConfirm={onStartConfirm}
                    onCancel={onStartCancel}
                    mode="date"
                    confirmTextIOS="Confirmar"
                    cancelTextIOS="Cancelar"
                    locale="pt_br"
                />
                <DateTimePicker
                    isVisible={showEnd}
                    date={filters.to}
                    mode="date"
                    onConfirm={onendConfirm}
                    onCancel={onendCancel}
                    mode="date"
                    confirmTextIOS="Confirmar"
                    cancelTextIOS="Cancelar"
                    locale="pt_br"
                />
            </View>
        </>
    )
}