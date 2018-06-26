<template>
    <div class="rounded row text-center nav">
        <div class="col-md-3">
            <p>{{Object.keys(items).length}} items left</p>
        </div>

        <div class="col-md-6">
            <!-- <span>All</span>
            <span>Incomplete</span> -->
        </div>

        <div class="col-md-3">
            <p>Total: ${{totalCost()}}</p>
        </div>
    </div>
</template>

<script>
export default {
  props: ['items'],
  data () {
    return {}
  },

  methods: {
    totalCost () {
      var _totalCost = 0
      for (let cost in this.items) {
        _totalCost += this.items[cost].price * this.items[cost].quantity
      }
      return _totalCost
    }
  }
}
</script>

<style scoped>
.nav {
  background-color: gray;
  /* height: 50px; */
  line-height: 50px;
  color: white;
  margin: 40px;
}
</style>
