<template>
  <div>
    {{ getDisplayName }}
    <button type="button" class="btn btn-danger" @click="doLogout">Logout</button>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import Utility from '../../utility/Utility'
export default {
  data () {
    return {
    }
  },

  created () {
    var self = this
    var user = JSON.parse(window.localStorage.getItem('user'))
    if (Utility.isNullOrUndefined(self.getDisplayName) && user) {
      self.setName({
        username: user.username,
        displayName: user.displayName
      })
    }
  },

  computed: mapGetters({
    getDisplayName: 'getDisplayName'
  }),

  methods: {
    ...mapActions(['setName']),
    doLogout () {
      window.localStorage.clear()
      this.$router.push('/login')
    }
  }
}
</script>

<style>

</style>
