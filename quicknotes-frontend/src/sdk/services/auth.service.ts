import { api } from "../client";
import { type User, type LoginData, type RegisterData } from "../types";

export const authService = {
	async register(data: RegisterData): Promise<User> {
		const response = await api.post<User>("/api/auth/register/", data);
		return response.data;
	},

	async login(data: LoginData): Promise<User> {
		const response = await api.post<User>("/api/auth/login/", data);
		return response.data;
	},
};