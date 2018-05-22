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
    </style>

    <!-- js -->
    <script>
        $(document).ready(function(){
            
            var store = new Array();
            var countPage = 0;
            var count_store = 0;

            loadCoin("https://api.coinmarketcap.com/v2/ticker/?start=0&limit=10");
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
            
            $(document).on("click", "button", function(){
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
                // else {
                //     $(this).html("Add");
                //     $(this).removeClass("btn-danger");
                //     $(this).addClass("btn-info");
                //     return;
                // }
                
                
            });
            
            $("#btn-clear").click(function(){
                localStorage.clear();
                location.reload();
            });

            $("#btn-next").click(function(){
                countPage += 10;
                if (countPage > 100) countPage = 100;
                var url = "https://api.coinmarketcap.com/v2/ticker/?start=" + countPage + "&limit=10"
                loadCoin(url);
            });
            
            $("#btn-pre").click(function(){
                countPage -= 10;
                if (countPage < 0) countPage = 0;

                var url = "https://api.coinmarketcap.com/v2/ticker/?start=" + countPage + "&limit=10"
                loadCoin(url);
            });

            function addRow_txt(i) { 
                var txt = "";
                var obj = window.listCoin["data"][i];
                var obj_USD = window.listCoin["data"][i]["quotes"]["USD"];
                count_store += 1;
                txt += "<tr>";
                txt += "<td>" + count_store + "</td>";
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
                    var txt = "";
                    var count = countPage;
                    for (i in data["data"]) {
                        // console.log(i);
                        var obj = data["data"][i];
                        var obj_USD = data["data"][i]["quotes"]["USD"];
                        count += 1;
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
                    }   
                
                    // console.log(txt);
                    $("#tbody-coin").html(txt);
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
        <div class="col-md-7">
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
    
                <tbody id="tbody-coin">
        
                </tbody>
                
                
            </table>
        </div>

        <div class="col-md-offset-1 col-md-4">
            <table id="table-coin-2">
                <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Market Cap</th>
                    <th>Price</th>
                    <th>Volume(24h)</th>
                    <th>Circulating Supply</th>
                    <th>Change(24h)</th>
                </tr>

                <tbody id="tbody-coin-2">
                    <!-- <tr>
                        <td>Hello00000000</td>
                        <td>Hello00000000</td>
                        <td>Hello00000000</td>
                        <td>Hello00000000</td>
                        <td>Hello00000000</td>
                        <td>Hello00000000</td>
                        <td>Hello00000000</td>
                    </tr> -->
                </tbody>
                
                
            </table>
        </div>
    </div>

</body>

</html>

