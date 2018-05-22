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
            $("#btnShow").click(function(){
                loadCoin();
            });
            
            function loadCoin(){
                $.get("https://api.coinmarketcap.com/v2/ticker/",function(data, status) {
                    // listCoin = JSON.parse(data);
                    // console.log(data["data"][1]["quotes"]["USD"]["price"]);
                    listCoin = data;

                    var txt = "";
                    var count = 0;
                    for (i in data["data"]) {
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
                        txt += "<td><button class='btn btn-block' id=" + obj["id"] + "></button></td>"
                        txt += "</tr>";
                    }   
                    
                    console.log(txt);
                    $("#tbody-coin").html(txt);
                });
            }
        });
    </script>
</head>

<body class="container-fluid">
    <h4>CoinMarketCap</h4>
    <button class="btn btn-block btn-primary" id="btnShow">Show Top Coin</button>
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
</body>

</html>

