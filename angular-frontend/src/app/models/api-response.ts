import { Contrato } from "./contrato";

export interface ApiResponse {
    total: number;
    totalPages: number;
    page: number;
    size: number;
    content: Contrato[];
}
