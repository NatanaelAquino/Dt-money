import { useAuthContext } from "@/context/Auth.context";
import { Text, TouchableOpacity, View } from "react-native";

export function Home() {

    const {handleLogout} = useAuthContext()
    return (
        <View className="flex-1 items-center justify-center ">
            <Text>Home Screen</Text>
            <TouchableOpacity onPress={handleLogout}>
                <Text>Logout</Text>
            </TouchableOpacity >
        </View>
    )
}