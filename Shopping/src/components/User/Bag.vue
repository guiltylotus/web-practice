<template>
  <div class="hone-container">
    <div class="home-header">
      <h3><strong>Your Bag</strong></h3>
      <p> Total: {{getTotalItems()}} items</p>
    </div>
    <shopping-list :isHome="isHome"/>
    <div class="bag-totalcost">
      <p><strong>Total: </strong>{{getTotalCost()}}</p>
    </div>
    <div class="bag-submit-btn text-center">
      <button class="btn" @click="submitOrder">Submit your order</button>
    </div>
  </div>
</template>

<script>
import ShoppingList from './ShoppingList'
import { _OrderService } from '../../services/orderservice'

export default {
  components: {
    'shopping-list': ShoppingList
  },

  data () {
    return {
      menu: [],
      order: {
        account: null,
        time: null,
        items: []
      },
      isHome: false
    }
  },

  created () {
  },

  methods: {
    getTotalItems () {
      let totalItems = 0
      this.menu = JSON.parse(window.localStorage.getItem('menu'))
      for (let item in this.menu) {
        if (this.menu[item].quantity > 0) {
          totalItems += 1
        }
      }
      return totalItems
    },

    getTotalCost () {
      let cost = 0
      // this.menu = JSON.parse(window.localStorage.getItem('menu'))
      for (let index in this.menu) {
        if (this.menu[index].quantity !== 0) {
          cost += this.menu[index].price * this.menu[index].quantity
        }
      }
      return cost
    },

    submitOrder () {
      var date = new Date()
      var user = JSON.parse(window.localStorage.getItem('user'))
      this.order.account = user.username
      this.order.time = date.toLocaleDateString()

      for (let index in this.menu) {
        if (this.menu[index].quantity !== 0) {
          this.order.items.push(this.menu[index])
          // this.menu[index].quantity = 0
        }
      }
      // window.localStorage.setItem('menu', JSON.stringify(this.menu))
      // console.log(this.order)
      this.addNewOrder()
    },

    async addNewOrder () {
      await _OrderService.addNewOrder(this.order)
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

.bag-totalcost {
  color: orange;
  font-size: 20px;
}

.bag-submit-btn button{
  width: 90%;
  color: white;
  background-color: orange;
  opacity: 0.7;
  height: 50px;
}

</style>
