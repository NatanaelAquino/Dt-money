import { transactionTypesEnum } from "@/shared/enums/transction-types";
import { IconsData, transactionCardProps } from "..";
import { colors } from "@/shared/colors";

export const ICONS: Record<transactionCardProps, IconsData> = {
    [transactionTypesEnum.REVENUE]: {
        name: "arrow-circle-up",
        color: colors["accent-brand-light"]
    },
    [transactionTypesEnum.EXPENSE]: {
        name: "arrow-circle-down",
        color: colors["accent-red"]
    },
    total: {
        name: "attach-money",
        color: colors.white
    }
}