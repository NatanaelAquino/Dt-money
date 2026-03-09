import AsyncStorage from "@react-native-async-storage/async-storage";
import { AxiosInstance } from "axios";
import { IauthenticateResponse } from "../interfaces/https/authenticate-response";

let authToken: string | null = null;

export const setInMemoryToken = (token: string | null) => {
    authToken = token;
};

export const addTokenToResquest = (axiosInstance: AxiosInstance) => {
    axiosInstance.interceptors.request.use(async (config) => {
        let token = authToken;
        if (!token) {
            const userData = await AsyncStorage.getItem('dt-money-token');
            if (userData) {
                try {
                    const parsed = JSON.parse(userData) as IauthenticateResponse;
                    token = parsed.token;
                    authToken = token;
                } catch (e) {
                    console.error("Erro no parse do interceptor", e);
                }
            }
        }

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    });
};