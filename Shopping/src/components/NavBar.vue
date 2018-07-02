<template>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <a class="navbar-brand" href="#">{{getDisplayName}}</a>
      <router-link v-if="!isAdmin" to="/User/order-list" class="navbar-shopping-cart">
      <i class="fa fa-shopping-cart" aria-hidden="true"></i></router-link>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div class="navbar-nav">
          <a class="nav-item nav-link" @click="toHome" href="#">Home</a>
          <a class="nav-item nav-link" @click="getMenu" href="#">Order</a>
          <span><button class="btn btn-danger" @click="doLogout">Logout</button></span>
        </div>
      </div>
    </nav>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
import Utility from '../utility/Utility'
export default {
  props: ['username'],
  created () {
    var self = this
    var user = JSON.parse(window.localStorage.getItem('user'))
    if (Utility.isNullOrUndefined(self.getDisplayName && user)) {
      self.setName({
        username: user.username,
        displayName: user.displayName
      })
    }
  },
  computed: mapGetters({
    getDisplayName: 'getDisplayName',
    isAdmin: 'isAdmin'
  }),
  methods: {
    ...mapActions(['setName']),
    doLogout () {
      window.localStorage.clear()
      this.$router.push('/login')
    },
    getMenu () {
      // this.$router.push({path: '/Menu', params:{menu: this.menu}, props: true} );
      if (!this.isAdmin) this.$router.push('/user/order')
      else this.$router.push('/Admin/order-list')
    },
    toHome () {
      // console.log(this.username)
      if (this.isAdmin) this.$router.push('/Admin/home')
      else this.$router.push('/User/Home')
    }
  }
}
</script>

<style scoped>
.mynav {
  font-size: 20px;
  border: 1px solid gray;
  color: #818181;
  height: 50px;
  line-height: 50px;
  margin: 0px;
  background-color: #111;
}

.navbar-shopping-cart {
  width: 44px;
  font-size: 30px;
  color: orange;
}

span {
  margin-right: 20px;
}
</style>
