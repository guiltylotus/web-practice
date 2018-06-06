<template>
  <div class="container-fluids" id="app">
    <!-- <img src="./assets/logo.png"> -->
    <!-- <router-view/> -->
    <shopping-nav/>
    <shopping-add-new :items="items"/>
    <shopping-list :items="items"/>
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
  },

  data() {
    return {
      items: [
                {name: 'Iphone', quantity: 2, price: 1000},
                {name: 'Apple', quantity: 10, price: 50},
                {name: 'Coca Cola', quantity: 5, price: 15},
              ]
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
  margin-top: 60px;
}
</style>
