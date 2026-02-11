import { useQuery } from '@tanstack/react-query';
import { fetchMovies } from '../services/movieService';

export const useMovies = (query: string, page: number) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['movies', query, page],
    queryFn: () => fetchMovies(query, page),
    enabled: Boolean(query),
  });

  return {
    movies: data?.results ?? [],
    totalPages: data?.total_pages ?? 1,
    isLoading,
    error,
  };
};
