export interface LoginResponse {
  user: { id: string; email: string; fullName: string; roles: string[] };
  token: string;
}