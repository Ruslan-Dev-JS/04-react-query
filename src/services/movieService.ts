import axios from 'axios';
import type { Movie } from '../types/movie'; 


export interface MovieResponse {
  results: Movie[];
  total_pages: number;
}

const TOKEN = import.meta.env.VITE_TMDB_API_KEY;

const axiosInstance = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  headers: {
    Authorization: `Bearer ${TOKEN}`, 
  },
  params: {
    language: 'en-US',
  },
});

export const fetchMovies = async (
  query: string,
  page: number
): Promise<MovieResponse> => {
  const { data } = await axiosInstance.get<MovieResponse>('/search/movie', {
    params: { query, page },
  });
  return data;
};
