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
            <!-- <div class="box2" v-for"new in newsName"> {{new}}</div>             -->
            <div class="box2">{{getNewsName()}}</div>
            <div class="box2" v-for="news in newsName">{{news}}</div>
            <div class="box2"></div>
            <div class="box2"></div>
        </div>
    </div>
    
</template>

<script>
    import data_news from '../assets/news_name.json';
    export default {
        name: 'news',
        data() {
            return {
                newsName: data_news.news,
            }
        },

        created() {
            // this.$http.get('../assets/news_name.txt').then(function(response) {
            //     console.log(response);
            // });
            console.log(data_news);
        },

        methods: {
            getNewsName() {
                var list = [];
                for (let i in this.newsName) {
                    list.push(i);
                }
                console.log(list);
                return "hello";
            }
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
