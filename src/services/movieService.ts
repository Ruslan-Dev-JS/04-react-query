export const fetchMovies = async (page: number = 1, query: string = 'star') => {
  const { data } = await axios.get('https://api.themoviedb.org/3/search/movie', {
    params: {
      api_key: API_KEY,
      query,
      page,
    },
  });
  return data;
};
