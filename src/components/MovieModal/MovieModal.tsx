import { useEffect } from 'react';
import type { Movie } from '../../types/movie';
import styles from './MovieModal.module.css'
import { createPortal } from 'react-dom';

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

    const modalRoot = document.getElementById("modal-root") ?? document.body;

    return createPortal (
        <div
      className={styles.backdrop}
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
    >
      <div className={styles.modal}>
        <button
          className={styles.closeButton}
          aria-label="Close modal"
          onClick={onClose}
        >
          &times;
        </button>
        <img
          className={styles.image}
          src={
            movie.backdrop_path
              ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
              : `https://image.tmdb.org/t/p/original/${movie.poster_path}`
          }
          alt={movie.title}
        />
        <div className={styles.content}>
          <h2 className={styles.title}>{movie.title}</h2>
          <p className={styles.overview}>{movie.overview}</p>
          <p className={styles.text}>
            <strong>Release Date:</strong> {movie.release_date}
          </p>
          <p className={styles.text}>
            <strong>Rating:</strong> {movie.vote_average}/10
          </p>
        </div>
      </div>
    </div>,
    modalRoot
  );
}