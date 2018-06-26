<template>
  <div class="container-fluids" id="app">
    <nav-bar v-if="$route.name !== 'Login'"></nav-bar>
    <router-view  :menu="menu" :menuToday="menuToday" :username="username" @submitMenu="updateMenu($event)" @checkLevel="updateUsername($event)" @addItems="addMenuToday($event)"></router-view>
  </div>
</template>

<script>
import NavBar from './components/NavBar.vue'
// import Login from './components/Login.vue'

export default {
  name: 'App',
  components: {
    'nav-bar': NavBar
    // 'login': Login
  },

  data () {
    return {
      admin: 'minh.nguyenduc',
      menuList: [
        {name: 'Apple', price: 1000, quantity: 0, status: false},
        {name: 'Chicken', price: 10, quantity: 0, status: false},
        {name: 'Orange', price: 130, quantity: 0, status: false},
        {name: 'Coca Cola', price: 120, quantity: 0, status: false},
        {name: 'Cake', price: 400, quantity: 0, status: false},
        {name: 'Eggs', price: 50, quantity: 0, status: false}
      ],
      menuToday: [],
      menu: []

    }
  },

  methods: {
    updateUsername (_username) {
      this.username = _username
      if (this.username === 'admin') {
        // this.menu = JSON.parse(JSON.stringify(this.menuList))
        this.menu = this.menuList
      } else {
        // this.menu = JSON.parse(JSON.stringify(this.menuToday))
        this.menu = this.menuToday
      }
    },

    addMenuToday (index) {
      this.menuList[index].status = !this.menuList[index].status
      this.menuToday.push(this.menuList[index])
      console.log(this.menuToday)
    },

    resetUsername () {
      this.username = 'Login'
    },

    updateMenu (items) {
      for (let item in items) {
        for (let menuItem in this.menuToday) {
          if (this.menuToday[menuItem].name === items[item].name) {
            this.menuToday[menuItem].quantity += parseInt(items[item].quantity)
            break
          }
        }
      }
      console.log(this.menuToday)
    }
  }
}
</script>

<style>
@import 'bootstrap/dist/css/bootstrap.css';
@import 'bootstrap-vue/dist/bootstrap-vue.css';
@import 'font-awesome/css/font-awesome.css';

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
body {
  font-size: .875rem;
  font-weight: 400;
  line-height: 1.5;
  /* background-color: #e4e5e6; */
}

</style>
