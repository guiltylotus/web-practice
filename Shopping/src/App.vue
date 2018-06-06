<template>
  <div class="container-fluids" id="app">
    <!-- <img src="./assets/logo.png"> -->
    <!-- <router-view/> -->
    <shopping-nav/>
    <shopping-add-new/>
    <shopping-list/>
  </div>
</template>

<script>
import ShoppingNav from './components/ShoppingNav.vue'
import ShoppingAddNew from './components/ShoppingAddNew.vue'
import ShoppingList from './components/ShoppingList.vue'

export default {
  name: 'App',
  components: {
    'shopping-nav': ShoppingNav,
    'shopping-add-new': ShoppingAddNew,
    'shopping-list': ShoppingList,
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
