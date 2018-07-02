<template>
<div class="row home-content">
  <div v-for="(item,key) in menu" :key="key" class="col-12 col-md-4" v-if="isHome || item.quantity > 0">
    <div class="border border-dark">
      <div class="home-food-img">
        <img :src="item.imageUrl" alt="">
      </div>
      <div class="row home-food-header">
        <div class="col-6">
          <strong>{{item.itemName}}</strong>
          <p>Price: {{item.price}}<i>vnđ</i></p>
          <!-- Order -->
          <div v-if="!isHome" class="text-left">
            <p>Quantity: {{item.quantity}}</p>
          </div>
        </div>
        <div class="col-6 home-button">
          <!-- Order -->
          <button v-if="!isHome" class="btn" data-toggle="modal" :data-target="'#homeModalOrder' + item.id"> Delete</button>
          <div class="modal fade" :id="'homeModalOrder' + item.id" tabindex="-1" role="dialog" aria-labelledby="homeModalLabel" aria-hidden="true">
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="homeModalLongTitle">Confirm your order</h5>
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div class="modal-body">
                  <div class="container-fluid">
                    <div class="text-center">
                      <h4> Are you sure to delete?</h4>
                    </div>
                    <hr>
                    <div class="row home-btn-delete text-center">
                      <div class="col-6"><button class="btn" @click="deleteItem(key)" data-dismiss="modal">Yes</button></div>
                      <div class="col-6"><button class="btn" data-dissmis="modal">No</button></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Home -->
          <button v-if="isHome" class="btn" data-toggle="modal" :data-target="'#homeModal' + item.id" @click="quantity=item.quantity"> Buy</button>
          <div class="modal fade" :id="'homeModal' + item.id" tabindex="-1" role="dialog" aria-labelledby="homeModalLabel" aria-hidden="true">
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="homeModalLongTitle">Confirm your order</h5>
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div class="modal-body">
                  <div class="container-fluid">
                    <div class="text-left">
                      <strong>{{item.itemName}}</strong>
                      <p>Price: {{item.price}}<i>vnđ</i></p>
                      <p>Quantity: <button class="btn home-btn-quantity" @click="minusQuantity()">-</button>
                        &nbsp; {{quantity}} &nbsp;
                      <button class="btn home-btn-quantity" @click="addQuantity()">+</button> </p>
                    </div>
                    <hr>
                    <div>
                      <div class="text-left">
                        <h4>Total: {{quantity * item.price}} <i>vnđ</i></h4>
                      </div>
                      <div class="home-button text-center">
                        <button class="btn" @click="updateQuantity(item)" data-dismiss="modal">Confirm</button>
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
</div>
</template>

<script>
import { _FoodService } from '../../services/foodservice'

export default {
  components: {
  },

  props: ['isHome'],
  data () {
    return {
      menu: [],
      quantity: 0
    }
  },

  created () {
    var self = this
    self.getAllFood()
  },

  methods: {
    getAllFood () {
      var self = this
      self.menu = JSON.parse(window.localStorage.getItem('menu'))
      if (!self.menu) {
        _FoodService.getAllFood()
          .then(function (res) {
            // console.log(res)
            self.menu = res
            window.localStorage.setItem('menu', JSON.stringify(res))
          })
          .catch(function (err) {
            console.log(err)
          })
      }
    },

    addQuantity () {
      this.quantity += 1
    },

    minusQuantity () {
      this.quantity -= 1
      if (this.quantity < 0) this.quantity = 0
    },

    updateQuantity (item) {
      item.quantity = this.quantity
      window.localStorage.setItem('menu', JSON.stringify(this.menu))
      // alert('SUCESSFUL!')
    },

    deleteItem (index) {
      this.menu[index].quantity = 0
      window.localStorage.setItem('menu', JSON.stringify(this.menu))
    }
  }
}
</script>

<style>
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
  width: 60%;
  height: 50px;
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
