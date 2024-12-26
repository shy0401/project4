<template>
  <div>
    <h1>TMDB Movies</h1>
    <div v-if="movies.length">
      <ul>
        <li v-for="movie in movies" :key="movie.id">{{ movie.title }}</li>
      </ul>
    </div>
    <div v-else>
      <p>Loading movies...</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      movies: [],
    };
  },
  async created() {
    await this.fetchMovies();
  },
  methods: {
    async fetchMovies() {
      try {
        const TMDB_API_KEY = sessionStorage.getItem('TMDb-Key');
        if (!TMDB_API_KEY) {
          throw new Error('TMDB API Key is missing');
        }

        const response = await axios.get(
            `https://api.themoviedb.org/3/movie/popular?api_key=${TMDB_API_KEY}&language=en-US&page=1`
        );

        this.movies = response.data.results;
      } catch (error) {
        console.error('❌ Failed to fetch movies:', error);
        alert('영화 데이터를 불러오는데 실패했습니다.');
      }
    },
  },
};
</script>

<style scoped>
h1 {
  text-align: center;
  margin-top: 20px;
}

ul {
  list-style: none;
  padding: 0;
  text-align: center;
}

li {
  margin: 10px 0;
}
</style>
