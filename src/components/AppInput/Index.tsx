import { Control, Controller, FieldValues, Path } from "react-hook-form"
import { Text, TextInput, TextInputProps, TouchableOpacity, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { colors } from "@/shared/colors";
import { useRef, useState } from "react";
import clsx from "clsx";

interface AppInputParams<T extends FieldValues> extends TextInputProps {
    control: Control<T>;
    name: Path<T>;
    leftIconName?: keyof typeof MaterialIcons.glyphMap;
    label?: string;

}
export const AppInput = <T extends FieldValues>({ control, name, leftIconName, secureTextEntry, label, ...rest }: AppInputParams<T>) => {
    const [isFocused, setIsFocused] = useState(false);
    const [showPassword, setShowPassword] = useState(secureTextEntry);
    const inputRef = useRef<TextInput>(null);

    const checkIsFocused = () => {
        if (inputRef.current) {
            setIsFocused(inputRef.current.isFocused());
        }
    }
    return (
        <Controller
            control={control}
            name={name}
            render={({ field: { onChange, value } }) => {
                return (
                    <View className="w-full mb-4">
                        {
                            label && (
                                <Text className={clsx("text-base text-gray-600 mb-2 mt-3", isFocused ? "text-accent-brand" :
                                    "text-gray-600")}>{label}</Text>
                            )
                        }
                        <TouchableOpacity
                            className="flex-row items-center justify-between 
                                 border-b-[1px] border-gray-600 rounded-lg px-3 py-2 h-16 ">

                            {
                                leftIconName && (
                                    <MaterialIcons name={leftIconName} size={24} color={isFocused ? colors["accent-brand"] : colors.gray[600]} />
                                )
                            }


                            <TextInput
                                className="flex-1 ml-2 text-base text-gray-600"
                                value={value}
                                onChangeText={onChange}
                                {...rest}
                                placeholderTextColor={colors.gray[500]}
                                onFocus={checkIsFocused}
                                onEndEditing={checkIsFocused}
                                secureTextEntry={showPassword}
                                ref={inputRef}
                            />

                            {
                                secureTextEntry && (
                                    <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                                        <MaterialIcons name={showPassword ? "visibility" : "visibility-off"}
                                         size={24} 
                                        color={isFocused ? colors["accent-brand"] : colors.gray[600]} />
                                    </TouchableOpacity>
                                )
                            }
                        </TouchableOpacity>
                    </View>
                )
            }}
        />
    )
}