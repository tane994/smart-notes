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
	username: string;
};

/*
	Buona practice distinguere login data da register data
*/
export type LoginData = {
	username: string;
	password: string;
};

export type RegisterData = {
	username: string;
	email: string;
	password: string;
};

export type AuthTokens = {
	access: string;
	refresh: string;
};

export type GetNotesParams = {
	collection_id?: number | null;
	page_size?: number | null;
};