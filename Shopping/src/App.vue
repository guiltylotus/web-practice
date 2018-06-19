<template>
  <div class="container-fluids" id="app">
    <!-- <img src="./assets/logo.png"> -->
    <!-- <router-view/> -->
    <nav-bar @MyLogout="resetUsername()" :username="username"/>
    <side-bar v-if="username != 'Login'" :username="username" />
    <router-view :menu="menu" :menuToday="menuToday" :username="username" @submitMenu="updateMenu($event)" @checkLevel="updateUsername($event)" @addItems="addMenuToday($event)"></router-view>
  </div>
</template>

<script>
import NavBar from './components/NavBar.vue'
import SideBar from './components/SideBar.vue'
import Login from './components/Login.vue'

export default {
  name: 'App',
  components: {
    'nav-bar': NavBar,
    'side-bar': SideBar,
    'login': Login,
  },

  data() {
    return {
      username: "Login",
      menuList: [
                {name: 'Apple', price: 1000},
                {name: 'Chicken', price: 10},
                {name: 'Orange', price: 130},
                {name: 'Coca Cola', price: 120},
                {name: 'Cake', price: 400},
                {name: 'Eggs', price: 50},
            ],
      menuToday: [],
      menu: [],

    }
  },

  methods: {
    updateUsername(_username) {
      this.username = _username;
      if (this.username == 'admin') {
        this.menu = new Object(this.menuList);
      }
      else  {
        for (var item in this.menuToday) {
          this.menuToday[item].quantity = 0;
        }
        this.menu = new Object(this.menuToday);
      }
    },

    addMenuToday(_items) {
      this.menuToday.push(_items);
      console.log(this.menuToday);
    },

    resetUsername() {
      this.username = 'Login';
    },

    updateMenu(items) {
      for (let item in items) {
        var obj = new Object(items[item]);
        for (let menuItem in this.menuToday) 
          if (this.menuToday[menuItem].name == obj.name) {
            this.menuToday[menuItem].quantity += parseInt(obj.quantity);  
            break;
          }

      }
      console.log(this.menuToday);
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* margin-top: 60px; */
}

</style>
