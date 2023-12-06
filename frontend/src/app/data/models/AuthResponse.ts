export interface AuthResponse {
    id?: string;
    list?: string[];
    name: string;
    lastName: string;
    email: string;
    role: string;
    jwt: string;
    isActive?: boolean;
}
