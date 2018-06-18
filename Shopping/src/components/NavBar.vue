<template>
    <div class="rounded row text-center nav">
        <div class="col-md-12">
            <span>{{username}}</span>
        </div>
    </div>
</template>

<script>
    export default {
        props: ["username"],
    }
</script>

<style scoped>
.nav {
        border: 1px solid gray;
        color: black;
        height: 50px;
        line-height: 50px;
        margin: 0px;
    }
</style>

