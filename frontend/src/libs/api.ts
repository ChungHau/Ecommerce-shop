import axios from "axios";
import { LoginFormValues, SignupFormValues } from "../types/type";

const BASE_URL = "http://localhost:8000/api/v2";
export const api = axios.create({ baseURL: BASE_URL });

export const createUser = async (data: SignupFormValues) => {
  return (await api.post("user/create-user", data)).data;
};

export const loginUser = async (data: LoginFormValues) => {
  return (await api.post("user/login-user", data, { withCredentials: true }))
    .data;
};

export const activateAccount = (activation_token: string) => {
  return api.post("user/activation", { activation_token });
};
