<template>
  <div class="container-fluids" id="app">
    <!-- <img src="./assets/logo.png"> -->
    <!-- <router-view/> -->
    <nav-bar :username="username"/>
    <side-bar/>
    <router-view :items="items" :username="username"></router-view>
  </div>
</template>

<script>
import NavBar from './components/NavBar.vue'
import SideBar from './components/SideBar.vue'
import Login from './components/Login.vue'

export default {
  name: 'App',
  components: {
    'nav-bar': NavBar,
    'side-bar': SideBar,
    'login': Login,
  },

  data() {
    return {
      username: "Shopping",
      items: [
                {name: 'Iphone', quantity: 2, price: 1000},
                {name: 'Apple', quantity: 10, price: 50},
                {name: 'Coca Cola', quantity: 5, price: 15},
              ],
    }
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
  /* margin-top: 60px; */
}


</style>
