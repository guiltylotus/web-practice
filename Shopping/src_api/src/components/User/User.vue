<template>
    <div class='main'>
      <shopping-nav :items="items"/>
      <shopping-add-new :items="items" :menu="menu"/>
      <shopping-list :items="items" :username="username"/>
      <div class="text-center">
        <button class="btn btn-success btn-user" @click="submitMenu()">Submit</button>
      </div>
    </div>
</template>

<script>
import ShoppingNav from './ShoppingNav.vue'
import ShoppingAddNew from './ShoppingAddNew.vue'
import ShoppingList from './ShoppingList.vue'

export default {
  props: ['menu', 'username'],
  data () {
    return {
      items: []
    }
  },
  components: {
    'shopping-nav': ShoppingNav,
    'shopping-add-new': ShoppingAddNew,
    'shopping-list': ShoppingList
  },

  methods: {
    submitMenu () {
      this.$emit('submitMenu', this.items)
    }
  }
}
</script>

<style scoped>
.btn-user {
  width: 90%;
  height: 50px;
}
</style>
