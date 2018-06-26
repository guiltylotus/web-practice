<template>
    <div class="list-cover">
        <div class='row list-border rounded' v-for="(item, key) in items" :key="key">
            <div class="col-md-1  list-middle">
                <button v-if="username != 'admin'" class="btn btn-danger" @click="deleteItems(key)">Delete</button>
                <span v-if="username == 'admin'">O</span>
            </div>

            <div class="col-md-2">
                <h3>{{item.name}}</h3>
                <p><i>Quantity: {{item.quantity}}</i></p>
            </div>

            <div class="col-md-6 list-middle">
                <h6>${{item.price}} </h6>
            </div>

            <div class="col-md-3 list-middle">
                <h6>${{item.price * item.quantity}}</h6>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  props: ['items', 'username'],

  methods: {
    deleteItems (key) {
      console.log(this.items[1])
      this.items.splice(key, 1)
    }
  }
}
</script>

<style scoped>
.list-border {
  border: 2px solid gray;
  height: 100px;
  margin: 5px;
  padding: 10px;
}

.list-cover {
  margin: 40px;
}

.list-middle {
  margin: auto;
}
</style>
