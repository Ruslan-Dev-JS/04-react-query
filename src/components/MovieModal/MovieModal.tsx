import type { Movie } from '../../types/movie';
import css from './MovieModal.module.css';

interface MovieModalProps {
  movie: Movie;
}

export default function MovieModal({ movie }: MovieModalProps) {
  return (
    <div className={css.backdrop}>
      <div className={css.modal}>
        <img
          src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
          alt={movie.title}
        />
        <h2>{movie.title}</h2>
        <p>{movie.overview}</p>
        <p>
          <strong>Release Date:</strong> {movie.release_date}
        </p>
        <p>
          <strong>Rating:</strong> {movie.vote_average}/10
        </p>
      </div>
    </div>
  );
}
