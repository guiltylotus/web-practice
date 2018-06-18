<template>
    <div class="row add-border rounded">
        <div class="col-md-9 add-input">
            <input type="text" placeholder="New item need to shop" v-model="nitem" >

            <div class="row">
                <div class="col-md-6">
                    <input type="text" placeholder="Price" v-model="nprice">
                </div>
                <div class="col-md-6">
                    <input type="text" placeholder="Quantity" v-model="nquantity">
                </div>
                <!-- <div class="col-md-4">
                    <input type="text" placeholder="Unit" v-model="nunit">
                </div> -->
            </div>
        </div>

        <div class="col-md-3  add-btn">
            <button class="btn btn-info" v-on:click="addItems">Add Item</button>
        </div>
    </div>
</template>

<script>
    export default{
        props: ['items'],
        data() {
            return {
                nitem: null,
                nprice: null,
                nquantity: null,
                // nunit: null,
            }
        },

        methods: {
            addItems() {
                var nlist = {name: this.nitem, quantity: this.nquantity, price: this.nprice};
                this.items.push(nlist);
            },
        }
    }
</script>

<style scoped>
    .add-border {
        border: 2px solid gray;
        margin: 40px;
        height: 200px;
    }

    input {
        width: 100%;
        margin-top: 20px;
    }

    .add-input {
        margin: auto;
    }

    .add-btn {
        margin: auto;
    }

</style>
