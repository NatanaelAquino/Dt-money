import { useKeyBoardVisible } from "@/shared/hooks/useKeyBoardVisible";
import { Image, View } from "react-native/"

export const AuthHeader = () => {
    const KeybordVisible = useKeyBoardVisible();

    if (KeybordVisible) {
        return <></>;
    }
  return (
    <View className=" w-full items-center justify-center min-h-40">
        <Image
            source={require('@/assets/Logo.png')}
            className="h-[48px] w-[255px]"
        />
    </View>
  )
}