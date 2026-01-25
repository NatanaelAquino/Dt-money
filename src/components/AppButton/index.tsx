import { Text, TouchableOpacity, TouchableOpacityProps } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { FC, PropsWithChildren } from "react";
import clsx from "clsx";
import { colors } from "@/shared/colors";

type AppButtonMode = "fill" | "outline";

interface AppInputParams extends TouchableOpacityProps {
  mode?: AppButtonMode;
  iconName?: keyof typeof MaterialIcons.glyphMap;
  label?: string;
}

export const AppButton: FC<PropsWithChildren<AppInputParams>> = (
  { mode = "fill", iconName, label, children, ...rest }
) => {

  const isFilled = mode === "fill";

  return (
    <TouchableOpacity
      className={clsx(
        "w-full rounded-xl px-5 flex-row items-center h-button",
        iconName ? "justify-between" : "justify-center",
        {
          "bg-accent-brand": isFilled,
          "bg-none border-[1px] border-accent-brand": !isFilled,
        }
      )}
      {...rest}
    >
      <Text className={clsx("text-base",
        {
          "text-white": isFilled,
          "text-accent-brand": !isFilled,
        }
      )}>{children}</Text>

      {
        iconName && (
          <MaterialIcons
            name={iconName}
            size={24}
            color={isFilled ? colors.white : colors["accent-brand"]}
          />
        )
      }
    </TouchableOpacity>
  )
}