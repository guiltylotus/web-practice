<template>
    <div class="contain main text-center">
        <h1> Menu</h1>
        <div class="row contain-table">
            <div class="col-md-2">

            </div>
            <div class="col-md-10">
                <table>
                    <thead>
                        <th><b>Name</b></th>
                        <th><b>Price</b></th>
                        <th v-if="username== 'admin'"><b>Hôm nay ăn gì</b></th>
                    </thead>
                    <tbody>
                        <tr v-for="(item,key) in menu" :key="key">
                            <td>{{item.name}}</td>
                            <td>${{item.price}}</td>
                            <td v-if="username == 'admin'"><button :class="{'btn-info': !item.status, 'btn-danger': item.status}" class="btn menu-btn" :id="key" @click="addItems(key)">Add</button></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  props: ['menu', 'username'],
  methods: {
    addItems (index) {
      this.$emit('addItems', index)
      // console.log(this.menu)
    }
  }
}
</script>

<style scoped>
th {
  color: red;
  height: 50px;
}

td {
  width: 400px;
}

tr {
  border: 3px solid bisque;
  height: 100px;
}

.contain {
  margin-top: 20px;
}

.menu-btn {
  width: 100px;
}

.contain-table {
  margin-top: 50px;
}
</style>
