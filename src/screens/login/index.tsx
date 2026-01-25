import { DimissKeyBoardView } from "@/components/DimissKeyBoardView"
import { PublicStackParamList } from "@/routes/PublicRoutes"
import { useNavigation } from "@react-navigation/native"
import { StackNavigationProp } from "@react-navigation/stack"
import { View } from "react-native"
import { LoginForm } from "./LoginForm"
import { AuthHeader } from "@/components/AuthHeader"

export const Login = () => {

  const navigation = useNavigation<StackNavigationProp<PublicStackParamList>>()
  return (
    <DimissKeyBoardView>
      <View className="flex-1 w-[82%] self-center ">
        <AuthHeader />
        <LoginForm />
      </View>

    </DimissKeyBoardView>
  )
}