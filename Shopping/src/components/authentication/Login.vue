<template>
  <div class="app flex-row align-items-center">
    <div class="center-box">
      <div class="card-group">
        <div class="card p-2">
          <div class="card-body">
            <form>
              <div class="title">
                Login
              </div>
              <div v-show="error" style="color:red; word-wrap:break-word; text-align: center">{{ error }}</div>
              <b>LDAP Username</b>
              <div role="group" class="input-group mb-3">
                <div class=" input-group-addon input-group-prepend">
                  <span class="input-group-text">
                    <i class="fa fa-user"></i>
                  </span>
                </div>
                <input type="text" placeholder="Username" v-model="data.body.username" class="form-control" @keyup.13="login">
              </div>
              <b>Password</b>
              <div role="group" class="input-group mb-4">
                <div class="input-group-addon input-group-prepend">
                  <span class="input-group-text">
                    <i class="fa fa-lock"></i>
                  </span>
                </div>
                <input type="password" placeholder="Password" v-model="data.body.password" class="form-control" @keyup.13="login">
              </div>
              <div class="row">
                <div class="col-6">
                  <button type="button" class="btn px-4 btn-primary" @click="login">Login</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { _AuthenticationService } from '../../services/authenticationservice'
import { mapActions, mapGetters } from 'vuex'

export default {
  data () {
    return {
      data: {
        body: {
          username: null,
          password: null
        }
      },
      error: null
    }
  },
  computed: mapGetters({
    isAdmin: 'isAdmin'
  }),
  methods: {
    ...mapActions(['setAdmin', 'setName']),
    login () {
      _AuthenticationService
        .login(this.data.body)
        .then(response => {
          if (response.data.message === 'Login Successfully') {
            window.localStorage.setItem('user', JSON.stringify(response.data))
            this.setAdmin(response.data.username === 'minh.nguyenduc')
            this.setName({
              username: response.data.username,
              displayName: response.data.displayName
            })
            if (this.isAdmin) this.$router.push('/Admin/home')
            else this.$router.push('/User/Home')
          } else {
            this.error = response.data.message
          }
        })
        .catch(err => {
          if (err) {
            this.error = err
          }
        })
    }
  }
}
</script>

<style scoped>
.center-box {
  position: absolute;
  top: 42%;
  left: 50%;
  transform: translate(-50%, -50%);
  min-width: 400px;
  max-width: 730px;
  width: 50%;
}
.input-group {
  margin-top: 5px;
}
.title {
  font-size: 28px;
  font-weight: bold;
  margin-bottom: 20px;
}
</style>
