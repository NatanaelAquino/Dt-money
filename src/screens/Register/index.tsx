import { DimissKeyBoardView } from "@/components/DimissKeyBoardView";
import { PublicStackParamList } from "@/routes/PublicRoutes";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Text, View } from "react-native";
import { RegisterForm } from "./RegisterFom";
import { AuthHeader } from "@/components/AuthHeader";

export function Register() {
    const navigation = useNavigation<StackNavigationProp<PublicStackParamList>>()

    return (
        <DimissKeyBoardView>
            <View className="flex-1 w-[82%] self-center">
                <AuthHeader />
                <RegisterForm />
            </View>
        </DimissKeyBoardView>
    )
}