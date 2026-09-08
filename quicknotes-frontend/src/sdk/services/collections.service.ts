import { api } from "../client";
import { type Collection } from "../types";

export const collectionsService = {
	async getCollections(): Promise<Collection[]> {
		const res = await api.get<unknown>("/api/collections/");
		const data = res.data;
		return data && typeof data === "object" && "data" in data ? (data.data as Collection[]) : (data as Collection[]);
	},

	async getCollection(collectionId: number): Promise<Collection> {
		const res = await api.get<unknown>(`/api/collections/${collectionId}/`);
		const data = res.data;
		return data && typeof data === "object" && "data" in data ? (data.data as Collection) : (data as Collection);
	},

	async getCollectionWithNotes(collectionId: number): Promise<Collection> {
		const res = await api.get<unknown>(`/api/collections/${collectionId}/notes/`);
		const data = res.data;
		return data && typeof data === "object" && "data" in data ? (data.data as Collection) : (data as Collection);
	},

	async createCollection(collection: Collection): Promise<Collection> {
		const res = await api.post<unknown>("/api/collections/", collection);
		const data = res.data;
		return data && typeof data === "object" && "data" in data ? (data.data as Collection) : (data as Collection);
	},

	async updateCollection(collectionId: number, collection: Collection): Promise<Collection> {
		const res = await api.put<unknown>(`/api/collections/${collectionId}/`, collection);
		const data = res.data;
		return data && typeof data === "object" && "data" in data ? (data.data as Collection) : (data as Collection);
	},

	async deleteCollection(collectionId: number): Promise<void> {
		await api.delete(`/api/collections/${collectionId}/`);
	},
};