// jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const scrape = require('website-scraper');

const app = express();



app.use(express.static(__dirname + '/sites'));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended:true}));



app.get("/", function(req,res) {
  res.render("list");
  // res.sendFile(__dirname + "/index.html");

});

app.post("/",function(req,res) {
  var firstName = req.body.siteUrl;
  const dateTime = Date.now();
  const options = {
    urls: [firstName],
    directory: __dirname + '/sites/'+ dateTime ,
    subdirectories: [
      {directory: 'public', extensions: ['.jpg', '.png', '.svg', '.js', '.css', '.gif']},
    ],
  };
  const result = scrape(options);
  res.render("list",{prevSite: __dirname + "/" + dateTime + "/index.html"});
});

app.get("/:customSite", function(req,res) {
  console.log(req.params.customSite);
});



// app.get("/", function(req,res) {
//   res.sendFile(__dirname + "/這酒杯我可以喝一打！日本4家超可愛居酒屋，保證女生都想去喝一杯啦！｜PopDaily 發現女孩的生活靈感.htm");
// });


app.listen(process.env.PORT || 3000, function() {
  console.log("server started running on port 3000!");
});
