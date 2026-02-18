import { AppHeader } from "@/components/AppHeader";
import { useAuthContext } from "@/context/Auth.context";
import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export function Home() {

    const { handleLogout } = useAuthContext()
    return (
        <SafeAreaView className="flex-1 bg-background-primary ">
            <AppHeader />
            <Text>Home Screen</Text>
            <TouchableOpacity onPress={handleLogout}>
                <Text>Logout</Text>
            </TouchableOpacity >
        </SafeAreaView>
    )
}