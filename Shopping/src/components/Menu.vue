<template>
  <div>
    <div class="add-item">
      <form v-if="isAdmin">
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
    </form>
  </div>
  <table class="table table-bordered table-striped">
    <thead>
      <th>Shop Name</th>
      <th>Item Name</th>
      <th>Price</th>
      <th>Image</th>
      <th>Description</th>
      <th v-if="isAdmin"></th>
    </thead>
    <tbody>
      <tr v-for="item in menu" :key="item.id">
        <td>{{ item.shopName }}</td>
        <td>{{ item.itemName }}</td>
        <td>{{ item.price }}</td>
        <td>{{ item.imageUrl }}</td>
        <td>{{ item.description }}</td>
        <td v-if="isAdmin"><button type="button" class="btn btn-danger" @click="removeFood(item.id)">Remove</button></td>
      </tr>
    </tbody>
  </table>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { _FoodService } from '../services/foodservice'

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
      }
    }
  },

  created () {
    this.getAllFood()
  },

  computed: mapGetters({
    isAdmin: 'isAdmin'
  }),

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

    async removeFood (id) {
      await _FoodService.removeFood(id)
      this.getAllFood()
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
