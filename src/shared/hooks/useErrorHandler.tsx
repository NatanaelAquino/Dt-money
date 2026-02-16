import { useSnackBarContext } from "@/context/snackBar.context";
import { AppError } from "../helpers/AppError";

export const useErrorHandler = () => {

    const { notify } = useSnackBarContext();
    const handleError = (error: unknown, defaultMessage: string) => {
        const isAppError = error instanceof AppError;

        const message = isAppError ? error.message : defaultMessage ?? 'Não foi possível realizar a operação, tente novamente mais tarde.';

        notify({ message, messagetype: 'error' });
    }
    return { handleError };
}