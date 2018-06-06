<template>
    <div class="list-cover">
        <div class='row list-border rounded' v-for="item in items">
            <div class="col-md-1  list-middle">O</div>

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
        props: ['items'],
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
    }

    .list-cover {
        margin: 40px;
    }

    .list-middle {
        margin:auto;
    }

</style>
