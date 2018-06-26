<template>
    <div class="list-cover">
        <shopping-nav :items='menuToday'/>
        <shopping-list :items="menuToday" :username="username"/>
    </div>
</template>

<script>
import ShoppingNav from '../User/ShoppingNav.vue'
import ShoppingList from '../User/ShoppingList.vue'

export default {
  props: ['menu', 'menuToday', 'username'],
  data () {
    return {}
  },
  components: {
    'shopping-nav': ShoppingNav,
    'shopping-list': ShoppingList
  }
}
</script>

<style scoped>
.list-cover {
  margin-top: 40px;
  /* margin-left: 160px; */
}
</style>
