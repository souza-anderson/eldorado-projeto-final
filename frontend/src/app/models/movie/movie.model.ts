
export default interface Movie {
    status: string;
    data: {
        id?: number;
        name: string;
        slug: string;
        synopsis: string;
        poster?: string;
        release_year: Date;
        billing: number;
        genre: string;
        created_at: Date;
        updated_at?: Date;
        poster_full_path: string;
    }
}