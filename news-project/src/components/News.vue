<template>
    <div class="row">
        <div class="col-md-8">

            <div class="col-md-4 box1 " v-for="news in list_news">
                <div class="avt"></div>
                <a  v-bind:href="news.url">{{news.title}}</a> 
            </div>
        
        </div>    
        <div class="col-md-4">           
            <div class="box2" v-for="news in newsSource">
                <button class="btn btn-info nbutton" v-bind:id="news" v-on:click="getApi">{{news}}</button>
            </div>
            
        </div>
    </div>
    
</template>

<script>
    import data_news from '../assets/news_name.json';
    export default {
        name: 'news',
        data() {
            return {
                list_news: [],
                newsSource: data_news.news,
                amount_news: 100,
                
            }
        },

        mounted() {
            let self = this
            this.$http.get('https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=714b3a33941d45b58e2e57d11ee38d7c')
            .then(function(response) {
                var count = 0;
                // console.log(response);
                for (let rdata in response.data.articles) 
                    if (count < self.amount_news) {
                        count++;
                        self.list_news.push(response.data.articles[rdata]);
                    }
                
                // console.log(self.list_news);
            })
            
        },

        methods: {
            getApi(event) {
                var self = this;
                var id = event.target.id;
                var url = "https://newsapi.org/v2/everything?sources=" + id + "&apiKey=714b3a33941d45b58e2e57d11ee38d7c";
                this.$http.get(url).then(function(response) {
                    var count = 0;
                    self.list_news = [];
                    for (let rdata in response.data.articles)
                        if (count < self.amount_news) {
                            count++;
                            self.list_news.push(response.data.articles[rdata]);
                        }
                    // console.log(event);
                    console.log(self.list_news);
                })
            }
        }
    }
</script>

<style>
    .box1 {
        /* width: 100%; */
        height: 250px;
        margin: 20px;
        border: 2px solid red;
    }

    .avt {
        height: 150px;
        background-color: bisque;
    }

    .box2 {
        /* background-color: gray;
        width: 50%;
        height: 50px;
        line-height: 50px;
        border: 2px solid green; */
        margin: 20px;
    }

    .nbutton {
        width: 70%;
        height: 50px;
    }
</style>
