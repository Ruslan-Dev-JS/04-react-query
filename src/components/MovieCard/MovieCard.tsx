import type { Movie } from '../../types/movie';
import css from './MovieCard.module.css';

interface MovieCardProps {
  movie: Movie;
}

const MovieCard = ({ movie }: MovieCardProps) => {
  return (
    <li className={css.card}>
      <h3>{movie.title}</h3>
    </li>
  );
};

export default MovieCard;
