import { PublicStackParamList } from "@/routes/PublicRoutes";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Text, TouchableOpacity, View } from "react-native";

export function Register() {
      const navigation = useNavigation<StackNavigationProp<PublicStackParamList>>()
    
    return (
        <View className="flex-1 items-center justify-center ">
            <Text>Register Screen</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <Text>Go to Login</Text>
            </TouchableOpacity>
        </View>

    )
}