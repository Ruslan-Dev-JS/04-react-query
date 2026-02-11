import { useQuery } from '@tanstack/react-query';
import { fetchMovies } from '../services/movieService';
import type { MovieResponse } from '../types/movie';

export const useMovies = (page: number, query: string) => {
const { data, isLoading, error } = useQuery<MovieResponse, Error>({
  queryKey: ['movies', page, query],
  queryFn: () => fetchMovies(page, query),
  enabled: Boolean(query),
});

  return {
    movies: data?.results ?? [],
    totalPages: data?.total_pages ?? 1,
    isLoading,
    error,
  };
};
