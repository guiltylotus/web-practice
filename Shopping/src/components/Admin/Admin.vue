<template>
    <div class="list-cover">
        <div class='row list-border rounded' v-for="(item,key) in menuToday">
            <div class="col-md-1  list-middle">
                <span>O</span>
            </div>

            <div class="col-md-2">
                <h3>{{item.name}}</h3>
                <p><i>Quantity: {{item.quantity}}</i></p>
            </div>

            <div class="col-md-6 list-middle">
                <h6>${{item.price}} </h6>
            </div>

            <div class="col-md-3 list-middle">
                <h6>${{item.price * item.quantity}}</h6>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    props: ["menu", "menuToday"],
    data() {
        return {
            
        }
    }
}   
</script>

<style scoped>
    .list-border {
        border: 2px solid gray;
        height: 100px;
        margin: 5px;
        padding: 10px;
        margin-left: 160px;
    }

    .list-cover {
        margin: 40px;
    }

    .list-middle {
        margin:auto;
    }
</style>
