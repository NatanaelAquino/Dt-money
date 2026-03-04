import { FC } from "react"
import { ActivityIndicator, Modal, Text, TouchableNativeFeedback, TouchableOpacity, View } from "react-native"
import { MaterialIcons } from "@expo/vector-icons"
import { colors } from "@/shared/colors"

interface Params {
    visible: boolean
    hideModal: () => void
    handleDelete: () => void
    loading: boolean
}

export const DeleteModal: FC<Params> = ({ visible, hideModal, handleDelete, loading }) => {
    return (
        <View className="flex-1 absolute">
            <Modal animationType="slide"
                transparent
                visible={visible}
                onRequestClose={hideModal}
            >
                <TouchableNativeFeedback
                    onPress={hideModal}
                >
                    <View className="flex-1 items-center justify-center bg-black/50">
                        <TouchableNativeFeedback onPress={(e) => e.stopPropagation()}>
                            <View
                                className="m-5 bg-background-secondary rounded-[16] p-8 items-center shadow-lg w-[90%] h-[322] z-2 "
                            >
                                <View
                                    className="w-full flex-row justify-between items-center border-b border-gray-300 pb-6">
                                    <View className="flex-row  g-6 items-center">
                                        <MaterialIcons
                                            name="error-outline"
                                            className="mr-4"
                                            color={colors.gray["400"]}
                                            size={25}
                                        />
                                        <Text className="text-white text-xl"> Apaga Transação?</Text>
                                    </View>
                                    <TouchableOpacity onPress={hideModal} >
                                        <MaterialIcons
                                            name="close"
                                            color={colors.gray["800"]}
                                            size={25}
                                        />
                                    </TouchableOpacity>
                                </View>

                                <View className="p-3 flex-1 border-b border-gray-300 items-center justify-center">
                                    <Text className="text-gray-500 text-lg leading-8">
                                        Tem certeza que deseja apagar essa transação? Esta ação
                                        nao pode ser desfeita
                                    </Text>
                                </View>
                                <View className="flex-row justify-end gap-4 w-full p-6 pb-0 pr-0">
                                    <TouchableOpacity
                                        onPress={hideModal}
                                        className="w-[100] bg-nome border-2 border-accent-brand items-center justify-center  p-3 rouded-[6]" >
                                        <Text className="text-accent-brand">
                                            Cancelar
                                        </Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        onPress={handleDelete}
                                        className="w-[100] bg-nome bg-accent-red-background-primary items-center justify-center  p-3 rouded-[6]">
                                        <Text className="text-white">
                                            {loading ? <ActivityIndicator /> : " Apagar"}
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </TouchableNativeFeedback>
                    </View>
                </TouchableNativeFeedback>
            </Modal>
        </View>
    )
}