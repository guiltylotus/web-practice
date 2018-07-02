<template>
  <div class="container-fluids" id="app">
    <nav-bar v-if="$route.name !== 'Login'"></nav-bar>
    <router-view></router-view>
  </div>
</template>

<script>
import NavBar from './components/NavBar.vue'

export default {
  name: 'App',
  components: {
    'nav-bar': NavBar
  },

  data () {
    return {
    }
  },

  methods: {
  }
}
</script>

<style>
@import 'bootstrap/dist/css/bootstrap.css';
@import 'bootstrap-vue/dist/bootstrap-vue.css';
@import 'font-awesome/css/font-awesome.css';

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
body {
  font-size: .875rem;
  font-weight: 400;
  line-height: 1.5;
  background-color: #e4e5e6;
}

</style>
