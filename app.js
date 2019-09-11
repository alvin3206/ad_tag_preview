// jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const scrape = require('website-scraper');
const fs = require('fs');


const app = express();



app.use(express.static(__dirname + '/sites'));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended:true}));



app.get("/", function(req,res) {
  // 避免空白
  res.render("list",{prevSite:"",preSiteUrl:""});
  // res.sendFile(__dirname + "/index.html");
  console.log(__dirname);

});

app.post("/",function(req,res) {
  var site = req.body.siteUrl;
  const dateTime = Date.now();
  const options = {
    urls: [site],
    directory: __dirname + '/sites/'+ dateTime ,
    subdirectories: [
      {directory: 'public', extensions: ['.jpg', '.png', '.svg', '.js', '.css', '.gif']},
    ],
  };
  const result = scrape(options);

  // fs.readFile(path.join(__dirname, './json/hp_mph.json'), 'utf8', function (err, data) {
  //     if (err) throw err;
  //     let list = JSON.parse(data);
  //     // list.forEach((item,index)=>{
  //     //     let value = item.properties;
  //     //     let result = {};
  //     //     result.ID = index + 1;
  //     //     result.TYPE = value.FLAG_A;
  //     //     result.X = value.X;
  //     //     result.Y = value.Y;
  //     //     newList.push(result);
  //     // })
  //
  //     for (let i = 0; i < list.length; i++) {
  //         let result = {};
  //         let value = list[i].properties;
  //         result.ID = i + 1;
  //         result.TYPE = value.FLAG_A;
  //         result.X = value.X;
  //         result.Y = value.Y;
  //         newList.push(result);
  //     }
  //
  //     let newContent = JSON.stringify(newList, null, 4);
  //     fs.writeFile('result.json', newContent, 'utf8', (err) => {
  //         if (err) throw err;
  //         console.log('success done');
  //     });
  // });

  res.render("list",{prevSite: "Mockup site", preSiteUrl: "/" + dateTime + "/index.html"});

  // res.render("list",{prevSite: __dirname + "/site/" + dateTime + "/index.html", preSiteUrl: "/" + dateTime + "/index.html"});
});

app.get("/:customSite", function(req,res) {
  // res.render(__dirname + '/sites/');
  console.log(req.params.customSite);
});



// app.get("/", function(req,res) {
//   res.sendFile(__dirname + "/這酒杯我可以喝一打！日本4家超可愛居酒屋，保證女生都想去喝一杯啦！｜PopDaily 發現女孩的生活靈感.htm");
// });


app.listen(process.env.PORT || 3000, function() {
  console.log("server started running on port 3000!");
});
