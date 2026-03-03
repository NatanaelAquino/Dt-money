import { transactionTypesEnum } from "@/shared/enums/transction-types";
import { CardData, transactionCardProps } from "..";

export const CARD_DATA: Record<transactionCardProps, CardData> = {
    [transactionTypesEnum.REVENUE]: {
        title: "Saida",
        bgcolor: "background-tertiary"
    },
    [transactionTypesEnum.EXPENSE]: {
        title: "Entrada",
        bgcolor: "background-tertiary"
    },
    total: {
        title: "Total",
        bgcolor: "accent-brand-background-primary"
    }
}