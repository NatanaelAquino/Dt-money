import AsyncStrore from "@react-native-async-storage/async-storage";

import { AxiosInstance } from "axios";
import { IauthenticateResponse } from "../interfaces/https/authenticate-response";


export const addTokenToResquest = (axiosInstance: AxiosInstance) => {
    axiosInstance.interceptors.request.use(async (config) => {
        const userData = await AsyncStrore.getItem('dt-money-token');
        if (userData) {
            const { token } = JSON.parse(userData) as IauthenticateResponse;

            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
        }
        return config
    })
}