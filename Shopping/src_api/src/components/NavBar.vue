<template>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <span v-if="username != 'Login'"><button class="btn btn-danger" @click="doLogout">Logout</button></span >
      <a class="navbar-brand" href="#">{{username}}</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div v-if="username != 'Login'" class="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div class="navbar-nav">
          <a class="nav-item nav-link" @click="toHome" href="#">Home</a>
          <a class="nav-item nav-link" @click="getMenu" href="#">Menu</a>
        </div>
      </div>
    </nav>
</template>

<script>
export default {
  props: ['username'],
  methods: {
    doLogout () {
      window.localStorage.clear()
      this.$router.push('/login')
    },
    getMenu () {
      // this.$router.push({path: '/Menu', params:{menu: this.menu}, props: true} );
      this.$router.push('/Menu')
    },

    toHome () {
      console.log(this.username)
      if (this.username === 'admin') this.$router.push('/Admin')
      else this.$router.push('/User')
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

span {
  margin-right: 20px;
}
</style>
