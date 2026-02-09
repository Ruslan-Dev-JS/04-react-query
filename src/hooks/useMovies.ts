import { useQuery } from '@tanstack/react-query';
import { fetchMovies } from '../services/movieService';
import type { MovieResponse } from '../types/movie';

export const useMovies = (page: number) => {
  const { data, isLoading, error } = useQuery<MovieResponse>({
    queryKey: ['movies', page],
    queryFn: () => fetchMovies(page),
    keepPreviousData: true,
  });

  return {
    movies: data?.results ?? [],
    totalPages: data?.total_pages ?? 1,
    isLoading,
    error,
  };
};
