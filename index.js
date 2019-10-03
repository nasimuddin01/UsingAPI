const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");

const app = express(); 

app.use(bodyParser.urlencoded({
  extended: true
}));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res) {
  var crypto = req.body.crypto;
  var money = req.body.fiat;
  var amount = req.body.amount;

  var options = {
    url: "https://apiv2.bitcoinaverage.com/convert/global",
    method: "GET",
    qs: {
      from: crypto,
      to: money,
      amount: amount
    }
  };
  request(options, function(error, response, body) {

    var data = JSON.parse(body);
    var price = data.price;
    console.log(data.success);
    res.write("<p> Time : " + data.time + "</p>");
    res.write("<h1> " + amount + " " + crypto + " is " + price + " " + money + " </h1>");
    res.send();
  });

});

app.listen(3000, function() {
  console.log("server started at port 3000");
});
