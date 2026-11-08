import { api } from "@/lib/api/client";
import { ApiResponse } from "@/lib/api/interfaces/api-response.interface";
import { LoginResponse } from "../interfaces/login.response";

export interface LoginPayload {
  email: string;
  password: string;
}
export const loginAction = async (payload: LoginPayload): Promise<LoginResponse> => {
  const { data: res } = await api.post<ApiResponse<LoginResponse>>('/auth/login', payload);
  return res.data;
};