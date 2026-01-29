import { DimissKeyBoardView } from "@/components/DimissKeyBoardView"

import { View } from "react-native"
import { LoginForm } from "./LoginForm"
import { AuthHeader } from "@/components/AuthHeader"
import {   useAuthContext } from "@/context/Auth.context"

export const Login = () => {

  const { user } = useAuthContext()

  return (
    <DimissKeyBoardView>
      <View className="flex-1 w-[82%] self-center ">
        <AuthHeader />
        <LoginForm />
      </View>
    </DimissKeyBoardView>
  )
}

