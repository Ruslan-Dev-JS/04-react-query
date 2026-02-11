import type { Movie } from '../../types/movie';
import css from './MovieGrid.module.css';

interface MovieGridProps {
  movies: Movie[];
  onSelect: (movie: Movie) => void;
}

export default function MovieGrid({ movies, onSelect }: MovieGridProps) {
  return (
    <ul className={css.list}>
      {movies.map(movie => (
        <li key={movie.id} className={css.listItem}>
          {/* Клікабельний постер */}
          {movie.poster_path && (
            <img
              src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
              alt={movie.title}
              className={css.poster}
              onClick={() => onSelect(movie)}
            />
          )}
          <div className={css.contentWrapper}>
            <h2 className={css.title}>{movie.title}</h2>
            <p className={css.content}>{movie.overview}</p>
            <div className={css.footer}>
              <span className={css.tag}>Rating: {movie.vote_average}</span>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
