import { transactionTypesEnum } from "@/shared/enums/transction-types"
import { FC } from "react"
import { Text, TouchableOpacity, View } from "react-native"
import { MaterialIcons } from "@expo/vector-icons"
import { colors } from "@/shared/colors"
import clsx from "clsx"
interface Props {
    setTransctionType: (value: transactionTypesEnum) => void
    typeId?: number
}

export const TransactionTypeSelector: FC<Props> = ({
    setTransctionType,
    typeId
}) => {
    return (
        <View className="flex-row justify-between gap-2 mt-2">
            <TouchableOpacity
                onPress={() => setTransctionType(transactionTypesEnum.REVENUE)}
                className={clsx(
                    ` flex-row items-center p-2 flex-1 justify-center h-[58] rounded-lg`,
                    typeId === transactionTypesEnum.REVENUE ? "bg-accent-brand" : "bg-background-tertiary",
                )}>
                <MaterialIcons
                    name="arrow-circle-up"
                    size={30}
                    color={
                        typeId === transactionTypesEnum.REVENUE
                            ? colors.white
                            : colors["accent-brand-light"]
                    }
                    className="mr-2"
                />
                <Text className="text-white font-bold ">Entrada</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => setTransctionType(transactionTypesEnum.EXPENSE)}

                className={clsx(
                    ` flex-row items-center p-2 flex-1 justify-center h-[58] rounded-lg`,
                    typeId === transactionTypesEnum.EXPENSE ? "bg-accent-red" : "bg-background-tertiary",
                )}>
                <MaterialIcons
                    name="arrow-circle-down"
                    size={30}
                    color={
                        typeId === transactionTypesEnum.EXPENSE
                            ? colors.white
                            : colors["accent-red"]
                    }
                    className="mr-2"
                />
                <Text className="text-white font-bold ">Saida</Text>
            </TouchableOpacity>
        </View >
    )
}