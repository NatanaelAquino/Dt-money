import { transactionTypesEnum } from "@/shared/enums/transction-types"
import { FC } from "react"
import { MaterialIcons } from "@expo/vector-icons"
import { Text, View } from "react-native"
import { useTransactionContext } from "@/context/Transaction.context"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { ICONS } from "./strategies/icon-strategy"
import { CARD_DATA } from "./strategies/card-data-stratedy"
import { moneyMapper } from "@/utils/money-mapper"
import clsx from "clsx"

export type transactionCardProps = transactionTypesEnum | "total"

interface Props {
    type: transactionCardProps
    amount: number
}

export interface IconsData {
    name: keyof typeof MaterialIcons.glyphMap
    color: string
}


export interface CardData {
    title: string
    bgcolor: string
}


export const ListCard: FC<Props> = ({ type, amount }) => {

    const iconData = ICONS[type]
    const cardData = CARD_DATA[type]

    const { transactions, filters } = useTransactionContext()
    const lastTransaction = transactions.find(({ type: transactionType }) => transactionType.id === type)

    const renderDateInfo = () => {
        if (type === "total") {
            return (
                <Text className="text-white text-base">
                    {
                        filters.from && filters.to ?
                            `Período: ${format(filters.from, "d MMM", { locale: ptBR })} 
                            até ${format(filters.to, "d MMM", { locale: ptBR })}`
                            :
                            'todo periodo'
                    }
                </Text>
            )
        }
        else {
            return (
                <Text className="text-gray-700 ">
                    {lastTransaction?.createdAt ?
                        format(
                            lastTransaction.createdAt,
                            `'Última ${cardData.title.toLocaleLowerCase()} em' d 'de' MMMM`, { locale: ptBR }
                        )
                        :
                        'Nenhuma transação registrada'}
                </Text>
            )
        }
    }



    return (
        <View className={clsx(`bg-${cardData.bgcolor} min-w-[280] rounded-[6] px-8 py-6 justify-between mr-6`,
            type === "total" && "mr-2"
        )}>
            <View className="flex-row justify-between items-center ">
                <Text className="text-white text-base">
                    {cardData.title}
                </Text>
                <MaterialIcons name={iconData.name} size={26} color={iconData.color} />
            </View>
            <View>
                <Text className="text-2xl text-gray-400 font-bold">
                    {moneyMapper(amount)}
                </Text>

                {
                    renderDateInfo()
                }

            </View>
        </View>

    )
}