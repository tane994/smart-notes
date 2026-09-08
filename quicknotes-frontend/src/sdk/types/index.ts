export type Collection = {
	id?: number;
	collection_id?: number;
	name: string;
};

export type Note = {
	id?: number;
	note_id?: number;
	title: string;
	content: string;
	collection?: number | null;
	collection_data?: Collection | null;
};

export type PaginatedResponse<T> = {
	next: string | null;
	previous: string | null;
	data: T[];
};

export type User = {
	id?: number;
	email?: string;
	password?: string;
	username: string;
};

export type GetNotesParams = {
	collection_id?: number | null;
	page_size?: number | null;
};