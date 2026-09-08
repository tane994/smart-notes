import { api } from "../client";
import { type User } from "../types";

export const authService = {
	async register(data: User) {
		const res = await api.post("/api/auth/register/", data);
		return res.data;
	},

	async login(data: User) {
		const res = await api.post("/api/auth/login/", data);
		return res.data;
	},
};