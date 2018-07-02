<template>
  <div class="hone-container">
    <div class="home-header">
      <h3><strong>List of Food today</strong></h3>
    </div>
    <shopping-list :isHome="isHome"/>
  </div>
</template>

<script>
// import { _FoodService } from '../../services/foodservice'
import ShoppingList from './ShoppingList'

export default {
  components: {
    'shopping-list': ShoppingList
  },

  data () {
    return {
      isHome: true
    }
  }
}
</script>

<style>
.hone-container {
  margin: 20px 10px;
}

.home-header {
}

</style>
