import { useAuthContext } from "@/context/Auth.context";
import { useTransactionContext } from "@/context/Transaction.context";
import { useErrorHandler } from "@/shared/hooks/useErrorHandler";
import { useEffect } from "react";
import { ActivityIndicator, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ListHeader } from "./ListHeader";
import { TransactionCard } from "./TransactionCard";
import { RefreshControl } from "react-native-gesture-handler";
import { fi } from "date-fns/locale";
import { EmptyList } from "./EmptyList";
import { colors } from "@/shared/colors";

export function Home() {

    const { handleLogout } = useAuthContext()
    const { fetchCategories, fetchTransaction, transactions, handleLoading, loadings, refashTransaction, loadMoreTransactions } = useTransactionContext()
    const { handleError } = useErrorHandler()
    const handleFetchCategories = async () => {
        try {
            handleLoading({ key: 'initial', value: true })
            await fetchCategories()
        } catch (error) {
            handleError(error, 'Não foi possível realizar a operação, tente novamente mais tarde.');
        } finally {
            handleLoading({ key: 'initial', value: false })
        }
    }

    const handleFechtInicialTransaction = async () => {
        try {
            handleLoading({ key: 'initial', value: true })
            await fetchTransaction({ page: 1 })

        } catch (error) {
            handleError(error, 'Não foi possível realizar a operação, tente novamente mais tarde.');
        } finally {
            handleLoading({ key: 'initial', value: false })

        }
    }

    const handleLoadMoreTransactions = async () => {
        try {
            handleLoading({ key: 'loadMore', value: true })
            await loadMoreTransactions()

        } catch (error) {
            handleError(error, 'Não foi possível realizar a operação, tente novamente mais tarde.');
        } finally {
            handleLoading({ key: 'loadMore', value: false })
        }
    }

    const handlerefashTransaction = async () => {
        try {
            handleLoading({ key: 'refresh', value: true })
            await refashTransaction()

        } catch (error) {
            handleError(error, 'Não foi possível realizar a operação, tente novamente mais tarde.');
        } finally {
            handleLoading({ key: 'refresh', value: false })
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
                ListEmptyComponent={loadings.initial ? null : EmptyList}
                keyExtractor={({ id }) => `transaction-${id}`}
                onEndReached={handleLoadMoreTransactions}
                onEndReachedThreshold={0.5}
                renderItem={({ item }) => <TransactionCard transaction={item} />}
                ListHeaderComponent={<ListHeader />}
                ListFooterComponent={
                    loadings.loadMore ? (
                        <ActivityIndicator
                            color={colors["accent-brand-light"]}
                            size={'large'} />
                    ) : null
                }
                refreshControl={
                    <RefreshControl refreshing={loadings.refresh} onRefresh={handlerefashTransaction} />
                }

            />
        </SafeAreaView>
    )
}