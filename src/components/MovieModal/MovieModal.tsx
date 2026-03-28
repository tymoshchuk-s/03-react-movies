import { useEffect } from 'react';
import type { Movie } from '../../types/movie';
import css from './MovieModal.module.css'

interface MovieModalProps {
    movie: Movie | null;
    onClose: () => void;
}

export default function MovieModal({ movie, onClose }: MovieModalProps) {
    const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
        if (event.target === event.currentTarget) {
            onClose();
        }
    };

    useEffect(() => {
        const handleKeydown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onClose()
            }
        };

        console.log('addEventListener');
        document.addEventListener('keydown', handleKeydown);

        return () => {
            console.log('removeEventListener');
            document.removeEventListener('keydown', handleKeydown);
        };
    }, [onClose])

    useEffect(() => {
  if (!movie) return;

  document.body.style.overflow = 'hidden';

  return () => {
    document.body.style.overflow = '';
  };
}, [movie]);
    
    if (!movie) return null;

    return (
        <div className={css.backdrop} role="dialog" aria-modal="true" onClick={handleBackdropClick}>
            <div className={css.modal}>
                <button onClick={onClose} className={css.closeButton} aria-label="Close modal">
                    &times;
                </button>
    
                        <img
                            src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                            alt={movie.title}
                            className={css.image}
                        />

                        <div className={css.content}>
                            <h2>{movie.title}</h2>
                            <p>{movie.overview}</p>

                            <p>
                                <strong>Дата виходу:</strong> {movie.release_date}
                            </p>

                            <p>
                                <strong>Рейтинг:</strong> {movie.vote_average}/10
                            </p>
                        </div>
                    </div>
            </div>

    );
}