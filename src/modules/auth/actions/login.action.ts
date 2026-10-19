import { api } from "@/lib/api/client";
import { LoginResponse } from "../interfaces/login.response";

export interface LoginPayload {
  email: string;
  password: string;
}
export const loginAction = async (payload: LoginPayload): Promise<LoginResponse> => {
  const { data } = await api.post<LoginResponse>('/auth/login', payload);
  console.log(data);
  return data;
};