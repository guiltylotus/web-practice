<template>
    <div class="row add-border rounded">
        <div class="col-md-9 add-input">
            <div class="dropdown">
                <button class="btn btn-default dropdown-toggle" type="button" data-toggle="dropdown">Menu
                <span class="caret"></span></button>
                <ul class="dropdown-menu text-center">
                    <li v-for="(item,key) in menu" :key="key" @click="pickItem(key)" data-toggle="tooltip" data-placement="left" title="Pick Me">{{item.name}}</li>
                </ul>
            </div>
            <input type="text" placeholder="New item need to shop" :value="nitem">

            <div class="row">
                <!-- <div class="col-md-6">
                    <input type="text" placeholder="Price" v-model="nprice">
                </div> -->
                <div class="col-md-12">
                    <input type="text" placeholder="Quantity" v-model="nquantity">
                </div>
            </div>
        </div>

        <div class="col-md-3  add-btn ">
            <button class="btn btn-info" v-on:click="addItems">Add Item</button>
        </div>
    </div>
</template>

<script>
export default {
  props: ['items', 'menu'],
  data () {
    return {
      nitem: null,
      nprice: null,
      nquantity: null
      // nunit: null,
    }
  },

  methods: {
    addItems () {
      var nlist = {
        name: this.nitem,
        quantity: this.nquantity,
        price: this.nprice
      }
      this.items.push(nlist)
    },

    pickItem (index) {
      this.nitem = this.menu[index].name
      this.nprice = this.menu[index].price
    }
  }
}
</script>

<style scoped>
.dropdown-toggle {
  width: 100%;
}

.dropdown-menu {
  width: 100%;
}

.add-border {
  border: 2px solid gray;
  margin: 40px;
  height: 200px;
}

input {
  width: 100%;
  margin-top: 20px;
}

.add-input {
  margin: auto;
}

.add-btn {
  margin: auto;
}

button {
  display: block;
  width: 100px;
  margin: auto;
}
</style>
