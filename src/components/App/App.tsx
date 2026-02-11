import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchMovies, type MovieResponse } from '../../services/movieService';
import type { Movie } from '../../types/movie';
import MovieGrid from '../MovieGrid/MovieGrid';
import MovieModal from '../MovieModal/MovieModal';
import Loader from '../Loader/Loader';
import SearchBar from '../SearchBar/SearchBar';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import ReactPaginate from 'react-paginate';
import toast, { Toaster } from 'react-hot-toast';

import css from './App.module.css';

export default function App() {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  // ✅ Використання useQuery під React Query v5
  const {
    data,
    isLoading,
    isFetching,
    isError,
    error,
    isSuccess,
  } = useQuery<MovieResponse, Error>({
    queryKey: ['movies', query, page],
    queryFn: () => fetchMovies(query, page),
    enabled: query.trim().length > 0,
    placeholderData: { results: [], total_pages: 0 },
  });

  // ✅ Безпечна типізація даних
  const movies: Movie[] = data?.results ?? [];
  const totalPages: number = data?.total_pages ?? 0;

  // ✅ Toast для "No movies found" через useEffect
  useEffect(() => {
    if (isSuccess && query && movies.length === 0) {
      toast.error('No movies found!');
    }
  }, [isSuccess, movies.length, query]);

  // ✅ Обробник пошуку
  const handleSearch = (newQuery: string) => {
    setQuery(newQuery);
    setPage(1);
  };

  const handleSelectMovie = (movie: Movie) => setSelectedMovie(movie);
  const handleCloseModal = () => setSelectedMovie(null);

  return (
    <div className={css.app}>
      <SearchBar onSubmit={handleSearch} />

      {(isLoading || isFetching) && <Loader />}

      {isError && error instanceof Error && (
        <ErrorMessage message={error.message} />
      )}

      {movies.length > 0 && (
        <MovieGrid movies={movies} onSelect={handleSelectMovie} />
      )}

      {totalPages > 1 && (
        <ReactPaginate
          pageCount={totalPages}
          pageRangeDisplayed={5}
          marginPagesDisplayed={1}
          onPageChange={({ selected }) => setPage(selected + 1)}
          forcePage={page - 1}
          containerClassName={css.pagination}
          activeClassName={css.active}
          nextLabel="→"
          previousLabel="←"
        />
      )}

      {selectedMovie && (
        <MovieModal movie={selectedMovie} onClose={handleCloseModal} />
      )}

      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
}
