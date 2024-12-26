<script>
import BannerComponent from "@/components/main/BannerComponent.vue";
import MovieRow from "@/components/main/MovieRow.vue";

export default {
  name: 'Home',
  components: {
    BannerComponent,
    MovieRow,
  },
  data() {
    return {
      apiKey: localStorage.getItem('TMDb-Key') || '',
      userNickname: localStorage.getItem('user-nickname') || 'Guest',
      featuredMovie: null,
      popularMoviesUrl: '',
      newReleasesUrl: '',
      actionMoviesUrl: '',
    };
  },
  created() {
    this.popularMoviesUrl = '/api/popular-movies';
    this.newReleasesUrl = '/api/new-releases';
    this.actionMoviesUrl = '/api/genre/action';
  },
  methods: {
    logout() {
      localStorage.removeItem('TMDb-Key');
      localStorage.removeItem('isLoggedIn');
      localStorage.removeItem('user-nickname');
      this.$router.push('/signin');
    },
  },
};
</script>

<template>
  <div>
    <header>
      <h1>Welcome, {{ userNickname }}</h1>
      <button @click="logout">Logout</button>
    </header>
    <BannerComponent :movie="featuredMovie" />
    <movie-row title="인기 영화" :fetchUrl="popularMoviesUrl" />
    <movie-row title="최신 영화" :fetchUrl="newReleasesUrl" />
    <movie-row title="액션 영화" :fetchUrl="actionMoviesUrl" />
  </div>
</template>

<style scoped>
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background-color: #141414;
  color: white;
}
button {
  background: #e50914;
  border: none;
  padding: 0.5rem 1rem;
  color: white;
  cursor: pointer;
}
</style>
