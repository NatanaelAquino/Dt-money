import { useSnackBarContext } from "@/context/snackBar.context"
import { Text, View } from "react-native"

export const SnackBar = () => {

    const { message,type } = useSnackBarContext()

    if(!message || !type) {
        return <></>
    }
    const Bgcolor = type !== 'error' ? 'bg-accent-brand-background-primary' : 'bg-accent-red-background-primary'
    return (
        <View className={` absolute bottom-10 self-center w-[90%] h-[50px] rounded-xl  ${Bgcolor} justify-center z-10 p-2`}>
            <Text className="text-white text-base font-bold">{message}</Text>
        </View>
    )
}