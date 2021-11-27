import Movie from "./movie.model";

export default interface MovieList {
    status: string;
    data: {
        movies: {
            from: number,
            to: number,
            per_page: number,
            total: number,
            current_page: number,
            prev_page: number,
            next_page: number,
            last_page: number;
            data: Movie[]
        }
    }
}