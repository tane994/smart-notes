import { api } from "../client";
import { type Note, type PaginatedResponse, type GetNotesParams } from "../types";

export const notesService = {
	async getNotes(url?: string | null, params?: GetNotesParams): Promise<PaginatedResponse<Note>> {
		const endpoint = url ?? "/api/notes/";
		const res = await api.get<PaginatedResponse<Note>>(endpoint, { params });
		return res.data;
	},

	async getNote(noteId: number): Promise<Note> {
		const res = await api.get<unknown>(`/api/notes/${noteId}/`);
		const data = res.data;
		return data && typeof data === "object" && "data" in data ? (data.data as Note) : (data as Note);
	},

	async createNote(note: Note): Promise<Note> {
		const res = await api.post<unknown>("/api/notes/", note);
		const data = res.data;
		return data && typeof data === "object" && "data" in data ? (data.data as Note) : (data as Note);
	},

	async updateNote(noteId: number, note: Note): Promise<Note> {
		const res = await api.put<unknown>(`/api/notes/${noteId}/`, note);
		const data = res.data;
		return data && typeof data === "object" && "data" in data ? (data.data as Note) : (data as Note);
	},

	async deleteNote(noteId: number): Promise<string> {
		await api.delete(`/api/notes/${noteId}/`);
		return `Note with id ${noteId} deleted successfully`;
	},
};