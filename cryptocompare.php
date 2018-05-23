<!DOCTYPE html>
<html>
<head>
    <link rel="stylesheet" href="vendor/css/bootstrap.min.css">
    <script src="vendor/js/jquery-3.3.1.min.js"></script>

    <!-- css -->
    <style>
        tr {
            border: 2px gainsboro solid;
            /* padding: 2em; */
        }
        td {
            padding: 1em;
            text-align: center;
            border-width: 0px;
        }

        th {
            text-align: center;
            padding: 5px;
            background-color: azure;
            border-width: 0px;
        }

        button {
            /* background-color: blue; */
            
        }

        .tr_his th { 
            background-color: blanchedalmond;
            color: red;
        }
    </style>

    <!-- js -->
    <script>
        $(document).ready(function(){
            
            var store = new Array();
            var countPage = 0;
            var count_store = 0;

            loadCoin("https://api.coinmarketcap.com/v2/ticker/?start=0&limit=5");
            $.get("https://api.coinmarketcap.com/v2/ticker/", function(data, status){
                listCoin = data;
                loadStore();
            });
            
            if (typeof(Storage) !== undefined ){
                if (localStorage.getItem("stores"))
                    store = localStorage.getItem("stores").split(",");
                    // alert("hello");
                    // alert(typeof store);
            }
            else {
                alert("Storage undefined");
            }
            
            $(document).on("click", "#tbody-coin button", function(){
                if ($(this).text() == "Add") {
                    $(this).html("Added");
                    $(this).removeClass("btn-info");
                    $(this).addClass("btn-danger");
                    console.log($(this).attr("id"));

                    store.push($(this).attr("id"));
                    localStorage.setItem("stores", store);
                    console.log(store);
                    txt = addRow_txt($(this).attr("id"));
                    $("#tbody-coin-2").append(txt);

                    return;
                }
                else {
                    $(this).html("Add");
                    $(this).removeClass("btn-danger");
                    $(this).addClass("btn-info");
                    
                    var id = $(this).attr("id");
                    store.pop(id);
                    localStorage.setItem("stores", store);
                    $("#tr" + id).remove();
                    count_store -= 1;
                    return;
                }
                
                
            });
            
            $("#btn-clear").click(function(){
                localStorage.clear();
                location.reload();
            });

            $("#btn-next").click(function(){
                countPage += 5;
                if (countPage > 100) countPage = 100;
                var url = "https://api.coinmarketcap.com/v2/ticker/?start=" + countPage + "&limit=5"
                loadCoin(url);
            });
            
            $("#btn-pre").click(function(){
                countPage -= 5;
                if (countPage < 0) countPage = 0;

                var url = "https://api.coinmarketcap.com/v2/ticker/?start=" + countPage + "&limit=5"
                loadCoin(url);
            });

            function addRow_txt(i) { 
                var txt = "";
                var obj = window.listCoin["data"][i];
                var obj_USD = window.listCoin["data"][i]["quotes"]["USD"];
                count_store += 1;
                txt += "<tr id='tr" + i + "'>";
                // txt += "<td>" + count_store + "</td>";
                txt += "<td>" + obj["name"] + "</td>";
                txt += "<td>" + obj_USD["market_cap"] + "</td>";
                txt += "<td>" + obj_USD["price"] + "</td>";
                txt += "<td>" + obj_USD["volume_24h"] + "</td>";
                txt += "<td>" + obj["circulating_supply"] + "</td>";
                txt += "<td>" + obj_USD["percent_change_24h"] + "</td>";
                txt += "</tr>";

                return txt;
            }
            
            function loadStore(){
                var txt = "";
                    var count = countPage;
                    for (i in store) {
                        // console.log(i);
                        txt += addRow_txt(store[i]);
                    }   
                
                    // console.log(txt);
                    $("#tbody-coin-2").html(txt);
            }

            function loadCoin(url){
                
                $.get(url,function(data, status) {
                    var count = countPage;

                    for (i in data["data"]) {
                        // console.log(i);
                        var obj = data["data"][i];
                        var obj_USD = data["data"][i]["quotes"]["USD"];
                        var url = "https://min-api.cryptocompare.com/data/histoday?fsym=" + obj["symbol"] +"&tsym=USD&limit=60&aggregate=3&e=CCCAGG";

                        count += 1;
                        var txt = "";
                        txt += "<tr>";
                        txt += "<td>" + count + "</td>";
                        txt += "<td>" + obj["name"] + "</td>";
                        txt += "<td>" + obj_USD["market_cap"] + "</td>";
                        txt += "<td>" + obj_USD["price"] + "</td>";
                        txt += "<td>" + obj_USD["volume_24h"] + "</td>";
                        txt += "<td>" + obj["circulating_supply"] + "</td>";
                        txt += "<td>" + obj_USD["percent_change_24h"] + "</td>";
                        
                        if ($.inArray(obj["id"].toString(), store) == -1)
                            txt += "<td><button class='btn btn-block btn-info' id=" + obj["id"] + ">" + "Add" + "</button></td>";
                        else 
                            txt += "<td><button class='btn btn-block btn-danger' id=" + obj["id"] + ">" + "Added" + "</button></td>";

                        txt += "</tr>";
                        $("#tbody-coin").append(txt);
                        console.log("hello1");

                        // get historyday
                        $.get(url, function(data2, status) {
                            var txt = "<tr class='tr_his'><th></th><th>Time</th><th>high</th><th>low</th><th>open</th><th>volumefrom</th><th>volumeto</th><th>close</th></tr>";

                            for (i in data2["Data"]) {
                                _obj = data2["Data"][i];
                                // console.log(_obj);
                                txt += "<tr>";
                                txt += "<td></td>";
                                txt += "<td>" + _obj["time"] + "</td>";
                                txt += "<td>" + _obj["high"] + "</td>";
                                txt += "<td>" + _obj["low"] + "</td>";
                                txt += "<td>" + _obj["open"] + "</td>";
                                txt += "<td>" + _obj["volumefrom"] + "</td>";
                                txt += "<td>" + _obj["volumeto"] + "</td>";
                                txt += "<td>" + _obj["close"] + "</td>";
                                txt += "</tr>";
                            }
                            $("#tbody-coin").append(txt);
                            console.log("hello2");
                        });
                    }   
                });
            }
        });
    </script>
</head>

<body class="container-fluid">
    <h3 class="text-center text-suc">CoinMarketCap</h4>
    <!-- <button class="btn btn-block btn-primary" id="btnShow">Show Top Coin</button> -->
    <div class="row">
        <div class="col-md-1">
            <button class="btn btn-block btn-primary" id="btn-pre">Previous</button>
        </div> 
        <div class="col-md-1">
            <button class="btn btn-block btn-primary" id="btn-next">Next</button>
        </div> 

        <div class="col-md-2">
            <button class="btn btn-block btn-primary" id="btn-clear">Clear Local Storage</button>
        </div>
    </div>

    <div class="row">
        <div class="col-md-7    ">
            <table id="table-coin">
                <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Market Cap</th>
                    <th>Price</th>
                    <th>Volume(24h)</th>
                    <th>Circulating Supply</th>
                    <th>Change(24h)</th>
                    <th>Add To Storage</th>
                </tr>
                
                <!-- test -->
                <!-- <tbody>
                    <tr>
                        <td>1</td>
                        <td>Bitcoin</td>
                        <td>135830692780</td>
                        <td>7966.96</td>
                        <td>5242730000</td>
                        <td>17049250</td>
                        <td>-4.36</td>
                        <td><button class='btn btn-block btn-info' id="1"> Add</button></td>;
                    </tr>
                    <tr>
                        <th></th>
                        <th>Time</th>
                        <th>high</th>
                        <th>low</th>
                        <th>open</th>
                        <th>volumefrom</th>
                        <th>volumeto</th>
                        <th>close</th>
                    </tr>
                    <tr>
                        <td></td>
                        <td>43243242</td>
                        <td>43243242</td>
                        <td>43243242</td>
                        <td>43243242</td>
                        <td>43243242</td>
                        <td>43243242</td>
                        <td>43243242</td>
                    </tr>
                    
                    
                </tbody> -->
                <tbody id="tbody-coin">
                    
                </tbody>
                
                
            </table>
        </div>

        <div class="col-md-offset-1 col-md-4">
            <table id="table-coin-2">
                <tr>
                    <th>Name</th>
                    <th>Market Cap</th>
                    <th>Price</th>
                    <th>Volume(24h)</th>
                    <th>Circulating Supply</th>
                    <th>Change(24h)</th>
                </tr>

                <tbody id="tbody-coin-2">

                </tbody>
                
                
            </table>
        </div>
    </div>

</body>

</html>

