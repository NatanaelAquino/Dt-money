import { AppButton } from "@/components/AppButton";
import { AppInput } from "@/components/AppInput/Index";
import { PublicStackParamList } from "@/routes/PublicRoutes"
import { useNavigation } from "@react-navigation/native"
import { StackNavigationProp } from "@react-navigation/stack"
import { useForm } from "react-hook-form";
import { Text, View } from "react-native"
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "./schema";
interface RegisterFormProps {
    email: string;
    password: string;
    confirmPassword: string;
    name: string;
}

export function RegisterForm() {

    const { control, handleSubmit, formState: { isSubmitted } } = useForm<RegisterFormProps>({
        defaultValues: {
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
        },
        resolver: yupResolver(schema),
    });

    const navigation = useNavigation<StackNavigationProp<PublicStackParamList>>()
    const onsubmit = async () => { }
    return (
        <>
            <AppInput
                control={control}
                name="name"
                label="Name"
                placeholder="Seu nome"
            />
            <AppInput
                control={control}
                name="email"
                label="Email"
                placeholder="Email@exemple.com"
            />
            <AppInput
                control={control}
                name="password"
                label="Password"
                placeholder="Sua senha"
                secureTextEntry
            />
            <AppInput
                control={control}
                name="confirmPassword"
                label="Confirm Password"
                placeholder="Confirme sua senha"
                secureTextEntry
            />
            <View className="flex-1 justify-between mt-8 mb-6 min-h-[200px] " >
                <AppButton iconName={"arrow-forward"}  onPress={handleSubmit(onsubmit)} >Cadastrar</AppButton>
                <View>
                    <Text className="mb-6 text-gray-300 text-base" >Já possui uma conta?</Text>
                    <AppButton
                        iconName={"arrow-forward"}
                        mode="outline"
                        onPress={() => navigation.navigate("Login")}
                    >Login</AppButton>
                </View>
            </View>
        </>
    )
}
