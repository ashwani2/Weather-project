// jshint esversion:6
const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const app = express();
dotenv.config({ path: './config.env' });
app.use(bodyParser.urlencoded({ extended: true }));
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");

});
app.post("/", function (req, res) {

  const query = req.body.cityName;
  const appid = process.env.APPID;
  const unit = process.env.UNIT;
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + appid + "&units=" + unit;
  https.get(url, function (response) {
    response.on("data", function (data) {
      const weatherData = JSON.parse(data);     // to parse the JSON data into object in JAVASCRIPT
      const temp = weatherData.main.temp;       // to fetch the parsed data value of a particular field
      const weatherDesc = weatherData.weather[0].description;
      res.write("<h1>The temperature in " + query + " is " + temp + " degree Celsius.</h1>");
      res.write("<p> and the weather is " + weatherDesc + "</p>");
      const iconValue = weatherData.weather[0].icon;
      const urlicon = " http://openweathermap.org/img/wn/" + iconValue + "@2x.png";
      res.write("<img src=" + urlicon + " >");
      res.send();

    });
  });
});


app.listen(3000, function () {
  console.log("Server started on the port 3000");
});
