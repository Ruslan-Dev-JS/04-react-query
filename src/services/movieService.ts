import axios from 'axios';
import type { MovieResponse } from '../types/movie';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const axiosInstance = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  params: {
    api_key: API_KEY,
    language: 'en-US',
  },
});

export const fetchMovies = async (
  page: number,
  query: string
): Promise<MovieResponse> => {
  const { data } = await axiosInstance.get<MovieResponse>('/search/movie', {
    params: { page, query },
  });
  return data;
};
