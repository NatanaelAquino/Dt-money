import { useAuthContext } from "@/context/Auth.context";
import { useTransactionContext } from "@/context/Transaction.context";
import { useErrorHandler } from "@/shared/hooks/useErrorHandler";
import { useEffect } from "react";
import { FlatList} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ListHeader } from "./ListHeader";
import { TransactionCard } from "./TransactionCard";
import { RefreshControl } from "react-native-gesture-handler";

export function Home() {

    const { handleLogout } = useAuthContext()
    const { fetchCategories, fetchTransaction, transactions, refashTransaction, loading , loadMoreTransactions} = useTransactionContext()
    const { handleError } = useErrorHandler()
    const handleFetchCategories = async () => {
        try {
            await fetchCategories()
        } catch (error) {
            handleError(error, 'Não foi possível realizar a operação, tente novamente mais tarde.');
        }
    }   

    const handleFechtInicialTransaction = async () => {
        try {
            await fetchTransaction({page: 1})
        } catch (error) {
            handleError(error, 'Não foi possível realizar a operação, tente novamente mais tarde.');
        }
    }

    const handleLoadMoreTransactions = async () => {
        try {
            await loadMoreTransactions()
        } catch (error) {
            handleError(error, 'Não foi possível realizar a operação, tente novamente mais tarde.');
        }
    }

    const handlerefashTransaction = async () => {
        try {
            await refashTransaction()
        } catch (error) {
            handleError(error, 'Não foi possível realizar a operação, tente novamente mais tarde.');
        }
    }

    useEffect(() => {
        (async () => {
            await Promise.all([handleFechtInicialTransaction(), handleFetchCategories()])
        })()
    }, [])


    return (
        <SafeAreaView className="flex-1 bg-background-primary">
            <FlatList
                className="bg-background-secondary"
                data={transactions}
                keyExtractor={({ id }) => `transaction-${id}`}
                onEndReached={handleLoadMoreTransactions}
                onEndReachedThreshold={0.5}
                renderItem={({item}) => <TransactionCard transaction={item} />}
                ListHeaderComponent={<ListHeader />}
                refreshControl={
                    <RefreshControl refreshing={loading} onRefresh={handlerefashTransaction} />
                }
            />
        </SafeAreaView>
    )
}