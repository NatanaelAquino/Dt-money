import { useAuthContext } from "@/context/Auth.context";
import { useTransactionContext } from "@/context/Transaction.context";
import { useErrorHandler } from "@/shared/hooks/useErrorHandler";
import { useEffect } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ListHeader } from "./ListHeader";
import { TransactionCard } from "./TransactionCard";

export function Home() {

    const { handleLogout } = useAuthContext()
    const { fetchCategories, fetchTransaction, transactions } = useTransactionContext()
    const { handleError } = useErrorHandler()
    const handleFetchCategories = async () => {
        try {
            await fetchCategories()
        } catch (error) {
            handleError(error, 'Não foi possível realizar a operação, tente novamente mais tarde.');
        }
    }
    useEffect(() => {
        (async () => {
            await Promise.all([fetchTransaction(), handleFetchCategories()])
        })()
    }, [])


    return (
        <SafeAreaView className="flex-1 bg-background-primary">
            <FlatList
                className="bg-background-secondary"
                data={transactions}
                keyExtractor={({ id }) => `transaction-${id}`}
                renderItem={({item}) => <TransactionCard transaction={item} />}
                ListHeaderComponent={<ListHeader />}
            />
        </SafeAreaView>
    )
}