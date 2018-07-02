// service hiện có 9 api: 4 food + 5 order nhé, chi tiết api bên project food-order-api
// router cố gắng phân theo path viết sẵn => đặt tên component với phân folder theo chức năng component cho có ý nghĩa tý
// model thì viết thêm ordermodel => sửa lại service nào call api có get order list

<template>
  <div>
    <div class="add-item">
      <form>
        Shop Name
        <input type="text" v-model="obj.shopName" required>
        Item Name
        <input type="text" v-model="obj.itemName" required>
        Price
        <input type="number" v-model="obj.price" required>
        Image Url
        <input type="text" v-model="obj.imageUrl" required>
        Description
        <input type="text" v-model="obj.description" required>
        <button type="button" class="btn btn-primary" @click="addFood">Add</button>
        <button type="button" class="btn btn-primary" @click="addOrder">Add Order</button>
    </form>
  </div>
  <table class="table table-bordered table-striped">
    <thead>
      <th>Shop Name</th>
      <th>Item Name</th>
      <th>Price</th>
      <th>Image</th>
      <th>Description</th>
      <th></th>
    </thead>
    <tbody>
      <tr v-for="item in menu" :key="item.id">
        <td><input type="text" v-model="item.shopName"></td>
        <td><input type="text" v-model="item.itemName"></td>
        <td><input type="text" v-model="item.price"></td>
        <td><input type="text" v-model="item.imageUrl"></td>
        <td><input type="text" v-model="item.description"></td>
        <td>
          <button type="button" class="btn btn-danger" @click="removeFood(item.id)">Remove</button>
          <button type="button" class="btn btn-primary" @click="updateFood(item)">Edit</button>
          <button type="button" class="btn btn-primary" @click="addFoodToOrder(item)">Add</button>
        </td>
      </tr>
    </tbody>
  </table>
  {{ order }}
  </div>
</template>

<script>
import { _FoodService } from '../services/foodservice'
import { _OrderService } from '../services/orderservice'
import { mapGetters } from 'vuex'

export default {
  data () {
    return {
      menu: [],
      obj: {
        shopName: null,
        itemName: null,
        price: null,
        imageUrl: null,
        description: null,
        itemShow: true
      },
      order: {
        account: null,
        time: null,
        items: []
      },
      orders: []
    }
  },

  created () {
    // let user = JSON.parse(localStorage.getItem('user'))
    // this.getOrderByAccount(user.username)
    this.getAllOrder()
    this.getAllFood()
  },

  computed: {
    ...mapGetters(['getUserName'])
  },

  methods: {
    async getAllFood () {
      let response = await _FoodService.getAllFood()
      this.menu = response
    },

    async addFood () {
      for (let key in this.obj) {
        if (!this.obj[key]) return
      }
      await _FoodService.addFood(this.obj)
      this.getAllFood()
    },

    async updateFood (item) {
      await _FoodService.updateFood(item)
      this.getAllFood()
    },

    async removeFood (id) {
      await _FoodService.removeFood(id)
      this.getAllFood()
    },

    addFoodToOrder (item) {
      let user = JSON.parse(localStorage.getItem('user'))
      this.order.account = user.username
      this.order.time = new Date()
      let isExist = false
      for (let i = 0, l = this.order.items.length; i < l; i++) {
        if (this.order.items[i].id === item.id) {
          this.order.items[i].quantity += 1
          isExist = true
          break
        }
      }
      if (!isExist) {
        item.quantity += 1
        this.order.items.push(item)
      }
    },

    async addOrder () {
      await _OrderService.addNewOrder(this.order)
    },

    async getOrderByAccount (account) {
      let response = await _OrderService.getOrderByAccount(account)
      this.orders = response
    },

    async getAllOrder () {
      let response = await _OrderService.getAllOrderToday()
      this.orders = response
    },

    async markOrderAsPaid (orderId) {
      let user = JSON.parse(localStorage.getItem('user'))
      await _OrderService.markOrderAsPaid(user.username, orderId)
      this.getAllOrder()
    }
  }
}
</script>

<style scoped>
.add-item {
  margin-top: 50px;
  margin-bottom: 50px;
}
table th,
table td {
  border: 1px solid black;
}
</style>
