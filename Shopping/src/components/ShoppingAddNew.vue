<template>
    <div class="row add-border rounded">
        <div class="col-md-9 add-input">
            <input type="text" placeholder="New item need to shop">

            <div class="row">
                <div class="col-md-4">
                    <input type="text" placeholder="Price">
                </div>
                <div class="col-md-4">
                    <input type="text" placeholder="Quantity">
                </div>
                <div class="col-md-4">
                    <input type="text" placeholder="Unit">
                </div>
            </div>
        </div>

        <div class="col-md-3  add-btn">
            <button class="btn btn-info">Add Item</button>
        </div>
    </div>
</template>

<script>
    export default{
        
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
