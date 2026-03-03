import { AppHeader } from "@/components/AppHeader";
import { useAuthContext } from "@/context/Auth.context";
import { useTransactionContext } from "@/context/Transaction.context";
import { useErrorHandler } from "@/shared/hooks/useErrorHandler";
import { useEffect } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ListHeader } from "./ListHeader";

export function Home() {

    const { handleLogout } = useAuthContext()
    const { fetchCategories, fetchTransaction } = useTransactionContext()
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
                ListHeaderComponent={<ListHeader />}
                data={[]}
                renderItem={() => <></>}
            />
        </SafeAreaView>
    )
}