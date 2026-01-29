import { FormLoginParams } from "@/screens/login/LoginForm";
import { dtMoneyApi } from "@/shared/Api/dt-money";
import { IauthenticateResponse } from "@/shared/interfaces/https/authenticate-response";

export const authnticate = async (userData: FormLoginParams): Promise<IauthenticateResponse> => {
    const { data } = await dtMoneyApi.post<IauthenticateResponse>("/auth/login", userData);

    return data;
};