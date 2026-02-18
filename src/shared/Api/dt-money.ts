import axios from "axios";
import { Platform } from "react-native";
import { AppError } from "../helpers/AppError";
import { addTokenToResquest } from "../helpers/axios.helper";

const baseURL = Platform.select({
  ios: "http://localhost:3001",
  android: "http://10.0.2.2:3001",

  // se for utilizar o emulador de android, utilizar ip "http://10.0.2.2:3001"

});

export const dtMoneyApi = axios.create({
  baseURL,
});

addTokenToResquest(dtMoneyApi);

dtMoneyApi.interceptors.response.use((response) => response, 
(error) => {
  if(error.response && error.response.data) {
      return Promise.reject(new AppError(error.response.data.message));
  }
}
)