export interface Show {
    id: number;
    name: string;
    rating: { average: number; };
    image: { medium: string; };
    summary: string;
    genres: string[];
    language: string;
}
