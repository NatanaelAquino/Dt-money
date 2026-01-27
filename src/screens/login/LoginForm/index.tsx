import { useNavigation } from "@react-navigation/native";
import { useForm } from "react-hook-form"
import { Text, View } from "react-native";


import { AppButton } from "@/components/AppButton";
import { AppInput } from "@/components/AppInput/Index";
import { PublicStackParamList } from "@/routes/PublicRoutes";
import { StackNavigationProp } from "@react-navigation/stack";

import {yupResolver} from "@hookform/resolvers/yup";
import {schema} from "./schema";




export interface FormLoginParams {
    email: string;
    password: string;
};

export const LoginForm = () => {
    const {
        control,
        handleSubmit,
        formState: { isSubmitted },
    } = useForm<FormLoginParams>({
        defaultValues: {
            email: '',
            password: '',
        },
        resolver: yupResolver(schema),
    });

    const navigation = useNavigation<StackNavigationProp<PublicStackParamList>>();
    const onsubmit = async () => {}
    return (
        <View className="flex-1 justify-between mt-8 mb-6 h-full">
            <AppInput
                control={control}
                name="email"
                label="Email"
                placeholder="Email@exemple.com"
                leftIconName={"mail-outline"}
            />
            <AppInput
                control={control}
                name="password"
                label="Senha"
                placeholder="Sua senha"
                leftIconName={"lock-outline"}
                secureTextEntry
            />
            <View className="flex-1 justify-between mt-8 mb-6 min-h-[200px] " >
                <AppButton iconName={"arrow-forward"}  onPress={handleSubmit(onsubmit)}>Login</AppButton>
                <View>
                    <Text className="mb-6 text-gray-300 text-base" >Não possui uma conta?</Text>
                    <AppButton 
                    iconName={"arrow-forward"} 
                    mode="outline" 
                    onPress={() => navigation.navigate("Register") }
                    >Cadastrar</AppButton>
                </View>
            </View>
        </View>
    )
}