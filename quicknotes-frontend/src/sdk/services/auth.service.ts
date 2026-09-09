import { api } from "../client";
import { type AuthTokens, type LoginData, type RegisterData } from "../types";

export const authService = {
	async register(data: RegisterData): Promise<AuthTokens> {
		const response = await api.post<AuthTokens>("/api/auth/register/", data);
		return response.data;
	},

	async login(data: LoginData): Promise<AuthTokens> {
		const response = await api.post<AuthTokens>("/api/auth/login/", data);
		return response.data;
	},
};