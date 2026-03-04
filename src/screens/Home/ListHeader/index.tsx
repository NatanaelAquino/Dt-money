import { AppHeader } from "@/components/AppHeader"
import { ScrollView, View } from "react-native"
import { ListCard } from "./TransactionCard"
import { transactionTypesEnum } from "@/shared/enums/transction-types"
import { useTransactionContext } from "@/context/Transaction.context"

export const ListHeader = () => {

    const {totalTransactions} = useTransactionContext()

    return (
        <>
            <AppHeader />
            <View className="h-[150] w-full ">
                <View className=" h-[50] bg-background-primary" />
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    className="absolute pl-6 h-[141]">
                    <ListCard type= {transactionTypesEnum.REVENUE} amount={totalTransactions.revenue} />
                    <ListCard type= {transactionTypesEnum.EXPENSE} amount={totalTransactions.expense} />
                    <ListCard type= {"total"} amount={totalTransactions.total} />
                </ScrollView>
            </View>

        </>
    )
}