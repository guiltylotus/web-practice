<template>
    <div class="rounded row text-right nav">
        <div class="col-md-12">
            <span>{{username}}</span>
            <span v-if="username != 'Login'"><button class="btn btn-danger" @click="MyLogout">Logout</button></span>
        </div>
    </div>
</template>

<script>
    export default {
        props: ["username"],
        methods: {
            MyLogout() {
                this.$router.push("/");
                this.$emit('MyLogout');
            }
        }
    }
</script>

<style scoped>
.nav {
        font-size: 20px;
        border: 1px solid gray;
        color: #818181;
        height: 50px;
        line-height: 50px;
        margin: 0px;
        background-color: #111;
    }

span {
    margin-left: 20px;
}
</style>

