<template>
    <div class="row">
        <div class="row col-md-8">
            <div class="col-md-4 box1">
                
            </div>
            <div class="col-md-4 box1">
                
            </div>
            <div class="col-md-4 box1">
                
            </div>
            <div class="col-md-4 box1">
                
            </div>
            <div class="col-md-4 box1">
                
            </div>
            <div class="col-md-4 box1">
                
            </div>
        </div>    
        <div class="col-md-4">
            <div class="box2"> {{news_name}}</div>
            <div class="box2"></div>
            <div class="box2"></div>
            <div class="box2"></div>
            <div class="box2"></div>
        </div>
    </div>
    
</template>

<script>
    export default {
        name: 'news',
        data() {
            return {
                news_name: [],
            }
        },

        created() {
            this.$http.get('../assets/news_name.txt').then(function(response) {
                console.log(response);
            });
        }
    }
</script>

<style>
    .box1 {
        /* width: 100%; */
        height: 200px;
        margin: 20px;
        border: 2px solid red;
    }

    .box2 {
        height: 200px;
        border: 2px solid green;
        margin: 20px;
    }
</style>
