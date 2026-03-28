import styles from './App.module.css'
import SearchBar from '../SearchBar/SearchBar'
import MovieGrid from '../MovieGrid/MovieGrid'
import Loader from '../Loader/Loader'
import ErrorMessage from '../ErrorMessage/ErrorMessage'
import toast, { Toaster } from 'react-hot-toast';
import fetchMovies from '../../services/movieService';
import { useState } from 'react';
import type { Movie } from '../../types/movie';
import MovieModal from '../MovieModal/MovieModal'

export default function App() {

    const [movies, setMovies] = useState<Movie[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState('');
    const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);


    const handleSearch = async (queryValue: string) => {
        if (!queryValue) return;
        
        try {
            setIsLoading(true);
            setIsError('');
            const result = await fetchMovies(queryValue);
            
            if (result.length === 0) {
                toast('No movies found for your request.', {
                duration: 4000,
                position: 'top-center',
                icon: '⚠️'
            });
            }
            setMovies(result)
        } catch {
            setIsError('')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className={styles.app}>
            <SearchBar onSubmit={handleSearch} />
            <Toaster position="top-center" />
            {isLoading && <Loader/>}
            {isError && <ErrorMessage message={isError}/>}
            <MovieGrid
                movies={movies}
                onSelect={(movie) => {
                    setSelectedMovie(movie);
                }}
            />
            {selectedMovie && (
                <MovieModal
                    movie={selectedMovie}
                    onClose={() => setSelectedMovie(null)}
                />
            )}
        </div>
    );
}   