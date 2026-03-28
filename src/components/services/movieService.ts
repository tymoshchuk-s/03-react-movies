import axios from "axios";
import type { Movie } from "../types/movie";

interface GetMovieRes {
    results: Movie[];
}

export default async function fetchMovies(queryValue: string): Promise<Movie[]> {
    const response = await axios.get<GetMovieRes>(`https://api.themoviedb.org/3/search/movie`, {
        params: {
            query: queryValue,
        },
        headers: {
            Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
        },
    }
    );

    return response.data.results;
    
}