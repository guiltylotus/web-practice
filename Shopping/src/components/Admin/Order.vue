<template>
  <div class="hone-container">
    <div class="home-header">
      <h3><strong>Your orders</strong></h3>
    </div>
    <!-- Unpaid -->
    <div class="order-container">
      <div class="card">
        <div class="card-header">
          <h5 class="mb-0">
            <button class="btn btn-link order-card-header" data-toggle="collapse" data-target=".bag-item-collapse" aria-expanded="false">UnPaid</button>
          </h5>
        </div>

        <div class="collapse show bag-item-collapse" v-for="(order, key) in orders" :key="key" v-if="!order.paid" data-toggle="modal" :data-target="'#' + order.id">
          <div class="card-body">
            <div class="row">
              <div class="col-6 text-left">
                <strong>order no {{order.id}} - {{order.account}}</strong>
                <p>Date: {{order.time}}</p>
              </div>
              <div class="col-6" text-right>
                <h6>Total: {{order.totalCost}} <i>vnđ</i></h6>
                <div class="order-modal-footer text-center"><button class="btn">Paid</button></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Paid -->
    <div class="order-container">
      <div class="card">
        <div class="card-header">
          <h5 class="mb-0">
            <button class="btn btn-link order-card-header" data-toggle="collapse" data-target=".bag-item-collapse-paid" aria-expanded="false">Paid</button>
          </h5>
        </div>

        <div class="collapse show bag-item-collapse-paid" v-for="(order, key) in orders" :key="key" v-if="order.paid" data-toggle="modal" :data-target="'#' + order.id">
          <div class="card-body">
            <div class="row">
              <div class="col-6 text-left">
                <strong>order no {{order.id}} - {{order.account}}</strong>
                <p>Date: {{order.time}}</p>
              </div>
              <div class="col-6" text-right>
                <h6>Total: {{order.totalCost}} <i>vnđ</i></h6>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal -->
    <div v-for="(order, key) in orders" :key="key">
      <div class="modal fade" :id="order.id" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <div class="text-center">
                <h5 class="modal-title"><strong>Order no {{order.id}}</strong></h5>
                <h6><i>{{order.account}}</i></h6>
              </div>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <div class="container-fluid">
                <div class="order-modal-item" v-for="(item,key) in order.items" :key="key">
                  <h6><strong>{{item.itemName}}</strong></h6>
                  <p>Price: {{item.price}}<i>vnđ</i></p>
                  <p>Quantity: {{item.quantity}}</p>
                </div>
              </div>
            </div>
            <div class="">
              <div class="row order-modal-footer text-center">
                <div class="col-6"><h6> Total: {{order.totalCost}}<i>vnđ</i></h6></div>
                <div class="col-6"><button class="btn">Paid</button></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { _OrderService } from '../../services/orderservice.js'
export default {
  data () {
    return {
      orders: []
    }
  },

  created () {
    this.getAllOrder()
  },

  methods: {
    async getAllOrder () {
      let response = await _OrderService.getAllOrderToday()
      this.orders = response
      for (let order in this.orders) {
        var totalCost = 0
        var obj = this.orders[order].items
        for (let item in obj) {
          if (obj[item].quantity !== 0) {
            totalCost += obj[item].quantity * obj[item].price
          }
        }
        this.orders[order].totalCost = totalCost
      }
      console.log(this.orders)
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

.bag-item-collapse {
  border-top: 1px ridge
}

.order-modal-item {
  margin-top: 15px;
  border-bottom: 1px ridge black
}

.order-modal-footer {
  color: orange;
  margin: auto;
  padding: 5px;
}

.order-modal-footer button {
  background-color: orange;
  color: white;
  width: 80%;
  opacity: 0.7;
}

.order-card-header {
  color: orange;
}

.order-card-header:visited {
  color: orange !important;
}

.btn-link {
  text-decoration: none !important;
}
</style>
