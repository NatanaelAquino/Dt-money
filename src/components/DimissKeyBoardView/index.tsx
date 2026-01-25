import { Keyboard, KeyboardAvoidingView, TouchableWithoutFeedback } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

export const DimissKeyBoardView = ({ children }: { children: React.ReactNode }) => {
    return (
        <SafeAreaView className="flex-1 bg-background-primary" >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}> 
                <KeyboardAvoidingView behavior="padding" className="flex-1">
                    <ScrollView>
                        {children}

                    </ScrollView>
                </KeyboardAvoidingView>
            </TouchableWithoutFeedback>
        </SafeAreaView>
    )
}