<template>
    <div class="side">
        <ul>
            <li @click="toHome">Home</li>
            <li @click="getMenu">Menu</li>
        </ul>
    </div>
</template>

<script>
    export default {
        props: ["username"],
        methods: {
            getMenu() {
                // this.$router.push({path: "/Menu", params:{menu: this.menu}, props: true} );
                this.$router.push("/Menu");
            },

            toHome() {
                console.log(this.username);
                if (this.username == "admin") 
                    this.$router.push("/Admin")
                else this.$router.push("/User");
            }
        }
    }
</script>

<style scoped>
.side {
    border: 1px solid gray;
    color: #818181;
    width: 150px;
    height: 100%;
    position: fixed;
    z-index: 1;
    background-color: #111;
}

.side ul {
    font-size: 25px;
    text-decoration: none;
    display: block;
    padding: 5px;
}
</style>

