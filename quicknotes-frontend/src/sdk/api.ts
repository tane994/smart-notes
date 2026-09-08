import { api } from "./client";
import { authService } from "./services/auth.service";
import { notesService } from "./services/notes.service";
import { collectionsService } from "./services/collections.service";

async function getHome(): Promise<string> {
	const res = await api.get<string>("/");
	return res.data;
}

export * from "./types";
export { authService, notesService, collectionsService };

export default {
	getHome,

	register: authService.register,
	login: authService.login,

	getNotes: notesService.getNotes,
	getNote: notesService.getNote,
	createNote: notesService.createNote,
	updateNote: notesService.updateNote,
	deleteNote: notesService.deleteNote,

	getCollections: collectionsService.getCollections,
	getCollection: collectionsService.getCollection,
	getCollectionWithNotes: collectionsService.getCollectionWithNotes,
	createCollection: collectionsService.createCollection,
	updateCollection: collectionsService.updateCollection,
	deleteCollection: collectionsService.deleteCollection,
};