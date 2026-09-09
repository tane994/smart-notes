import { api } from "../client";
import { type Note, type PaginatedResponse, type GetNotesParams } from "../types";

export const notesService = {
	
	async getNotes(url?: string | null, params?: GetNotesParams): Promise<PaginatedResponse<Note>> {
		const endpoint = url ?? "/api/notes/";
		const response = await api.get<PaginatedResponse<Note>>(endpoint, { params });
		return response.data;
	},

	async getNote(noteId: number): Promise<Note> {
		const response = await api.get<Note>(`/api/notes/${noteId}/`);
		return response.data;
	},

	async createNote(note: Note): Promise<Note> {
		const response = await api.post<Note>("/api/notes/", note);
		return response.data;
	},

	async updateNote(noteId: number, note: Note): Promise<Note> {
		const response = await api.put<Note>(`/api/notes/${noteId}/`, note);
		return response.data;
	},

	async deleteNote(noteId: number): Promise<void> {
		await api.delete(`/api/notes/${noteId}/`);
	},
};