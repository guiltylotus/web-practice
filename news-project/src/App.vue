<template>
  <div id="app">
    <img src="./assets/news.png">
    <news/>
  </div>
</template>

<script>
import News from './components/News.vue'

export default {
  name: 'App',
  components: {
    'news': News,
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
