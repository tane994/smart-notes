import { api } from "../client";
import { type Collection } from "../types";

export const collectionsService = {
	async getCollections(): Promise<Collection[]> {
		const response = await api.get<Collection[]>("/api/collections/");
		return response.data;
	},

	async getCollection(collectionId: number): Promise<Collection> {
		const response = await api.get<Collection>(`/api/collections/${collectionId}/`);
		return response.data;
	},

	async getCollectionWithNotes(collectionId: number): Promise<Collection> {
		const response = await api.get<Collection>(`/api/collections/${collectionId}/notes/`);
		return response.data;
	},

	async createCollection(collection: Collection): Promise<Collection> {
		const response = await api.post<Collection>("/api/collections/", collection);
		return response.data;
	},

	async updateCollection(collectionId: number, collection: Collection): Promise<Collection> {
		const response = await api.put<Collection>(`/api/collections/${collectionId}/`, collection);
		return response.data;
	},

	async deleteCollection(collectionId: number): Promise<void> {
		await api.delete(`/api/collections/${collectionId}/`);
	},
};