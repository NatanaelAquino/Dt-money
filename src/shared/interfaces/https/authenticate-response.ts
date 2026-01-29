import { Iuser } from "./user-interface";

export interface IauthenticateResponse {
    user: Iuser
    token: string;
}