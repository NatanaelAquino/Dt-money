 import * as Yup from 'yup'

export const transactionSchema = Yup.object().shape({
    description: Yup.string().required('A descrição é obrigatória'),
    value: Yup.number().min(0.01, 'O valor deve ser maior que zero').required('O valor é obrigatório'),
    typeId: Yup.number().min(1, 'Selecione um tipo de transação').required('O tipo é obrigatório'),
    categoryId: Yup.number().min(1, 'Selecione uma categoria').required('A categoria é obrigatória')
})