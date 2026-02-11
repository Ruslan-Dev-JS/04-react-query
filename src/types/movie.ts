export interface Movie {
  id: number;
  title: string;
  poster_path: string | null;
  overview: string;
  vote_average: number;      
  backdrop_path: string;     
  release_date: string;     
}


export interface MovieResponse {
  results: Movie[];
  total_pages: number;
}
