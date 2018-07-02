<template>
<div class="hone-container">
  <div class="home-header">
    <h3><strong>Add menu</strong></h3>
    <div class="row home-input-container">
      <div class="col-12 home-input-full">
        <input type="text" placeholder="Name of Food" v-model="obj.itemName">
      </div>
      <div class="col-4 home-input-full">
        <input type="text" placeholder="Name of Shop" v-model="obj.shopName">
      </div>
      <div class="col-4 home-input-full" >
        <input type="text" placeholder="Price" v-model="obj.price">
      </div>
      <div class="col-4 home-input-full" >
        <input type="text" placeholder="Image URL" v-model="obj.imageUrl">
      </div>
      <div class="col-12 home-input-full">
        <input type="text" placeholder="Description" v-model="obj.description">
      </div>
    </div>
    <div class="home-button home-add-input"><button class="btn" @click="addFood()">Add</button></div>
  </div>
  <!-- List Item -->
  <div class="row home-content">
    <div v-for="(item,key) in menu" :key="key" class="col-12 col-md-4">
      <div class="border border-dark">
        <div class="home-food-img">
          <img :src="item.imageUrl" alt="">
        </div>
        <div class="row home-food-header">
          <div class="col-6">
            <strong>{{item.itemName}}</strong>
            <p>Price: {{item.price}}<i>vnđ</i></p>
          </div>
          <!-- Edit modal -->
          <div class="col-6 home-button">
            <button class="btn" data-toggle="modal" :data-target="'#homeAdminModal' + item.id"> Edit</button>
            <div class="modal fade" :id="'homeAdminModal' + item.id" tabindex="-1" role="dialog" aria-labelledby="homeModalLabel" aria-hidden="true">
              <div class="modal-dialog">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title" id="homeModalLongTitle">Edit your food info</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div class="modal-body">
                    <div class="container-fluid">
                      <form>
                        <div class="row form-group">
                          <div class="col-3 text-center home-label"><label>Name:</label></div>
                          <div class="col-9"><input class="form-control" :value="item.itemName"></div>
                        </div>

                        <div class="row form-group">
                          <div class="col-3 text-center home-label"><label>Shop:</label></div>
                          <div class="col-9"><input class="form-control" :value="item.shopName"></div>
                        </div>

                        <div class="row form-group">
                          <div class="col-3 text-center home-label"><label>Price:</label></div>
                          <div class="col-9"><input class="form-control" :value="item.price"></div>
                        </div>

                        <div class="row form-group">
                          <div class="col-3 text-center home-label"><label>ImageUrl:</label></div>
                          <div class="col-9"><input class="form-control" :value="item.imageUrl"></div>
                        </div>

                        <div class="row form-group">
                          <div class="col-3 text-center home-label"><label>Description:</label></div>
                          <div class="col-9"><input class="form-control" :value="item.description"></div>
                        </div>

                        <div class="home-button"><button type="submit" class="btn btn-primary">Confirm</button></div>
                      </form>
                      <hr>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import { _FoodService } from '../../services/foodservice.js'
export default {
  data () {
    return {
      menu: null,
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

  methods: {
    async getAllFood () {
      let response = await _FoodService.getAllFood()
      this.menu = response
      console.log(this.menu)
    },

    async addFood () {
      for (let key in this.obj) {
        if (!this.obj[key]) return
      }
      await _FoodService.addFood(this.obj)
      this.getAllFood()
    }
  }
}
</script>

<style>
.home-label {
  margin: auto;
}

.home-input-container {
  margin-left: 5px;
  margin-right: 5px;
}

.home-add-input {
  margin-top: 5px;
}

.home-add-input button {
  width: 100% !important;
}

.home-input-full {
  padding: 5px;
}

.home-input-full input {
  width: 100%;
  border: 1px ridge white;
  height: 35px;
  border: none;
  border-radius: 10px;
  padding: 5px;
}

.home-input-full button {
  width: 100%;
}

.hone-container {
  margin: 20px 10px;
}

.home-header {
}

.home-food-cover {
}

.border {
  /* border-radius: 20%; */
  height: 250px;
  padding: 0px;
  margin: 10px 0px;
}

.home-content {
  margin: 10px 0px 0px 0px;
}

.home-food-img {
  height: 50%;
  width: 100%;
  position: relative;
  overflow: hidden;
}

.home-food-img img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  transform-origin: right bottom;
  transform: translate(0%, -15%) scale(1);
  /* border-radius: 20%; */
}

.home-button {
  text-align: center;
  /* font-size: 30px; */
}

.home-button > button {
  background-color: orange;
  color: white;
  width: 80%;
  height: 40px;
  opacity: 0.7;
  /* border-radius: 5%; */
  /* font-size: 30px; */
  /* text-align: center; */
}

.home-food-header {
  margin-top: 10px;
  margin-left: 5px;
  padding: 5px;
}

.home-food-header p {
  margin: 0px;
}

.home-btn-quantity {
  background-color: orange;
  opacity: 0.7;
  border-radius: 100%;
  width: 35px;
}

.home-btn-delete .btn{
  width: 80%;
  background-color: orange;
  color: white;
  opacity: 0.7;
}
</style>
