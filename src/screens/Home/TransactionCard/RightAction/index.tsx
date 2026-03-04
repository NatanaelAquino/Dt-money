import { TouchableOpacity } from "react-native"
import { MaterialIcons } from '@expo/vector-icons';
import { FC, useState } from "react";
import { DeleteModal } from "./DeleteModal";
import * as TransactionService from "@/shared/services/dt-money/transaction.service"
import { useErrorHandler } from "@/shared/hooks/useErrorHandler";
import { useSnackBarContext } from "@/context/snackBar.context";

interface Params {
    transactionId: number
}

export const RightAction: FC<Params> = ({ transactionId }) => {

    const [modalVisible, setModalVisible] = useState(false)
    const [loading, setLoading] = useState(false)

    const {notify} = useSnackBarContext();
    const showModal = () => setModalVisible(true)
    const hideModal = () => setModalVisible(false)

    const { handleError } = useErrorHandler()

    const handleDelete = async () => {
        try {
            setLoading(true)
            await TransactionService.deleteTransaction(transactionId)
            notify({ message: 'Transação excluida com sucesso', messagetype: 'success' })
            hideModal()
        } catch (error) {
            handleError(error, 'Não foi possível realizar a operação, tente novamente mais tarde.');
        } finally {
            setLoading(false)

        }
    }

    return (
        <>
            <TouchableOpacity
                activeOpacity={0.8}
                className="h-[140] bg-accent-red-background-primary w-[80] items-center justify-center"
                onPress={showModal}
            >
                <MaterialIcons name="delete" size={30} color="red" />
            </TouchableOpacity>
            <DeleteModal visible={modalVisible} hideModal={hideModal} handleDelete={handleDelete} />
        </>
    )
}
