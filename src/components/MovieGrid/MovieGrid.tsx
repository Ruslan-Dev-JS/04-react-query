import type { Movie } from '../../types/movie';
import css from './MovieGrid.module.css';

interface MovieGridProps {
  movies: Movie[];
}

export default function MovieGrid({ movies }: MovieGridProps) {
  return (
    <ul className={css.list}>
      {movies.map(movie => (
        <li key={movie.id} className={css.listItem}>
          <h2 className={css.title}>{movie.title}</h2>
          <p className={css.content}>{movie.overview}</p>
          <div className={css.footer}>
            <span className={css.tag}>Rating: {movie.vote_average}</span>
          </div>
        </li>
      ))}
    </ul>
  );
}
