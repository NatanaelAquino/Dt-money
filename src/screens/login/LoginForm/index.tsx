import { useNavigation } from "@react-navigation/native";
import { useForm } from "react-hook-form"
import { ActivityIndicator, Text, View } from "react-native";


import { AppButton } from "@/components/AppButton";
import { AppInput } from "@/components/AppInput/Index";
import { PublicStackParamList } from "@/routes/PublicRoutes";
import { StackNavigationProp } from "@react-navigation/stack";

import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "./schema";
import { useAuthContext } from "@/context/Auth.context";
import { useErrorHandler } from "@/shared/hooks/useErrorHandler";
import { colors } from "@/shared/colors";

export interface FormLoginParams {
    email: string;
    password: string;
};

export const LoginForm = () => {
    const navigation = useNavigation<StackNavigationProp<PublicStackParamList>>()
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

    const { handleAuthentication } = useAuthContext();
    const { handleError } = useErrorHandler();

    const onSubmit = async (userData: FormLoginParams) => {
        try {
            await handleAuthentication(userData);
        } catch (error) {
            handleError(error, 'Não foi possível realizar a operação, tente novamente mais tarde.');
        }
    }
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
                <AppButton onPress={handleSubmit(onSubmit)} iconName={"arrow-forward"} >{isSubmitted ? <ActivityIndicator color={colors.white} /> : 'Cadastrar'}</AppButton>
                <View>
                    <Text className="mb-6 text-gray-300 text-base" >Não possui uma conta?</Text>
                    <AppButton
                        iconName={"arrow-forward"}
                        mode="outline"
                        onPress={() => navigation.navigate("Register")}
                    >
                        Cadastrar
                    </AppButton>
                </View>
            </View>
        </View>
    )
}