<!DOCTYPE html>
<html>
<body>

<div >
  <h2>News</h2>

  <div>
    <span>
      <h4>Title</h4>
      <input type="text" name="" id="input1">
    </span>
    
    <div>
      <h4>Author</h4>
      <input type="text" name="" id="input2">
    </div>
    
    <div>
      <h4>Description</h4>
      <input type="text" name="" id="input3">
    </div>
    
    <div>
      <h4>publishedAt</h4>
      <input type="text" name="" id="input4">
    </div>
    <br>
    <button type="button" onclick="Add()">Add</button>
  </div>
  <br>
  <button type="button" onclick="loadDoc()">Show</button>

  <table border="1" id="demo">  </table>  
</div>

<script>

var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
    news = JSON.parse(this.responseText);
    loadDoc();
  }
};
xhttp.open("GET", 'https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=714b3a33941d45b58e2e57d11ee38d7c', true);
xhttp.send();

function loadDoc() {
    text = "";
    // text += "<table border='1'>";
    for (i in window.news["articles"]) {
      text += "<tr>";
      text += "<td>" + window.news["articles"][i]["title"] + "</td>";
      text += "<td>" + window.news["articles"][i]["author"] + "</td>";
      text += "<td>" + window.news["articles"][i]["description"] + "</td>";
      text += "<td>" + window.news["articles"][i]["publishedAt"] + "</td>";
      text += "<td><button type='button' onclick='Delete(this.id)' id='" +  + i + "'>" + "Delete" + "</button></td>";
      text += "</tr>";
    }
    // text += "</table>";

    document.getElementById("demo").innerHTML = text;
};
  
function Add() {
  var title = document.getElementById("input1").value;
  var author = document.getElementById("input2").value;
  var description = document.getElementById("input3").value;
  var publishedAt = document.getElementById("input4").value;

  var _new = {"title":title, "author":author, "description":description, "publishedAt":publishedAt};
  window.news["articles"].push(_new);

  var n = window.news["articles"].length-1;
  text = "<button type='button' onclick='Delete(this.id)' id='" + n + "'>" + "Delete" + "</button>";
  var table = document.getElementById("demo");
  var row = table.insertRow(10);
  row.insertCell(0).innerHTML = title.toString();
  row.insertCell(1).innerHTML = author.toString();
  row.insertCell(2).innerHTML = description.toString();
  row.insertCell(3).innerHTML = publishedAt.toString();
  row.insertCell(4).innerHTML = text.toString();

  console.log(window.news["articles"].length);
}

function Delete(id) {
  window.news["articles"].splice(id,1);
  var row = document.getElementById(id);
  var table = document.getElementById("demo").childNodes[0];
  table.removeChild(row.parentNode.parentNode);
  console.log(row.parentNode.parentNode.textContent);
  console.log(window.news["articles"].length);
}




// function Add() {
//   var title = document.getElementById("input1").value;
//   var author = document.getElementById("input2").value;
//   var description = document.getElementById("input3").value;
//   var publishedAt = document.getElementById("input4").value;

//   var _new = {"title":title, "author":author, "description":description, "publishedAt":publishedAt};
//   window.news["articles"].push(_new);

//   console.log(window.news["articles"].length);
//   loadDoc();

// }

// function Delete(id) {
//   window.news["articles"].splice(id,1);
//   console.log(window.news["articles"].length);
//   loadDoc();
// }

</script>

</body>
</html>
