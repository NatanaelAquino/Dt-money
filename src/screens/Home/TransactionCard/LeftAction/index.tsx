import { Transaction } from "@/shared/interfaces/transaction";
import { FC } from "react"
import { Pressable, View } from "react-native"
import { MaterialIcons } from "@expo/vector-icons"
import { colors } from "@/shared/colors"
import { useBottomSheetContext } from "@/context/bottomsheet.context";
import { EditTransactionForm } from "./EditTransactionForm";
interface Params {
    transaction: Transaction
}
export const LeftAction: FC<Params> = ({transaction}) => {

    const {open} = useBottomSheetContext()
    return (
      <Pressable onPress={()=> {
        open(<EditTransactionForm transaction={transaction}/>,1)
      }}>
        <View className="h-[140] bg-accent-blue-dark w-[80] rounded-[6] items-center justify-center ">
            <MaterialIcons name="edit" size={30} color= {colors.white}/>
        </View>
      </Pressable>
    )
}