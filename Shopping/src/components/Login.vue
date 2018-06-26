<template>
    <div class="row">
        <!-- <div class="col-md-3"></div> -->

        <div class="login-border ">
            <div class="container text-left">
                <label for=""><b>Username</b></label>
                <input type="text" v-model="login_username">
                <!-- <label for=""><b>Password</b></label>
                <input type="text"> -->
            </div>

            <div class="container">
                <button class="login-btn btn" @click="checkLevel">Login</button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  props: ['username'],
  data () {
    return {
      login_username: null
    }
  },

  methods: {
    checkLevel () {
      if (this.login_username === 'admin') {
        this.$router.push('/Admin')
      } else this.$router.push('/User')

      this.$emit('checkLevel', this.login_username)
    }
  }
}
</script>

<style scoped>
.login-border {
  border: 2px solid gray;
  margin-top: 50px;
  height: 270px;
  width: 80%;
}

.container {
  padding: 15px;
}

input {
  display: inline-block;
  width: 100%;
  margin-bottom: 10px;
}

.login-btn {
  display: inline-block;
  width: 100%;
  height: 50px;
  background-color: green;
  opacity: 0.8;
  color: white;
}
</style>
