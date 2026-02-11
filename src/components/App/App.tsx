import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import ReactPaginate from 'react-paginate';

import { fetchMovies } from '../../services/movieService';
import { MoviesResponse } from '../../types/movie';

import MovieGrid from '../MovieGrid/MovieGrid';
import SearchBar from '../SearchBar/SearchBar';
import ErrorMessage from '../ErrorMessage/ErrorMessage';

import css from './App.module.css';

export default function App() {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);

  const { data, isLoading, error } = useQuery<MoviesResponse>({
    queryKey: ['movies', query, page],
    queryFn: () => fetchMovies(page, query),
    enabled: Boolean(query),
    keepPreviousData: true,
  });

  const totalPages = data?.total_pages ?? 0;

  const handleSearch = (newQuery: string) => {
    setQuery(newQuery);
    setPage(1);
  };

  return (
    <div className={css.app}>
      <SearchBar onSubmit={handleSearch} />

      {isLoading && <p className={css.loading}>Loading...</p>}

      {error instanceof Error && (
        <ErrorMessage message={error.message} />
      )}

      {data && <MovieGrid movies={data.results} />}

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
    </div>
  );
}
