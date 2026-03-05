export const moneyMapper = (value: number): string => {
    return value.toLocaleString('pt-BR',
        {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
            style: 'currency',
            currency: 'BRL'
        }

    );
}