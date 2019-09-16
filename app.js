// jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const scrape = require('website-scraper');
const fs = require('fs');


const app = express();
const bubbleOutLink = '</head><script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script><script src="https://code.jquery.com/ui/1.12.1/jquery-ui.min.js" integrity="sha256-VazP97ZCwtekAsvgPBSUwPFKdrwD3unUfSGVYrahUqU=" crossorigin="anonymous"></script>"';
const bubbleStyleString = '<div class="chat_container" style="z-index:2147483647;"> <div class="bubble"></div> <div class="chat"> <ul class="chat-thread"> <li class="message-mit">Hi Codepen!</li> <li class="message-dest">Hi, what are you going to do today?</li> <li class="message-mit loading"><i class="material-icons">lens</i><i class="material-icons">lens</i><i class="material-icons">lens</i></li> </ul> </div> </div> <style> html, body { background: #f1f1f1; margin: 0; } .chat_container { position: fixed; top: 0; bottom: 0; margin: auto; right: 0; left: 0; width: 500px; height: 500px; } .chat_container .chat { position: fixed; width: 400px; height: 400px; top: 0; bottom: 0; margin: auto; left: 0; right: 0; background: white; border-radius: 10px; transform: scale(0); box-shadow: 0 5px 60px 10px rgba(0, 0, 0, 0.12); } .chat_container .chat::after { content: ""; display: block; position: fixed; width: 0; height: 0; border-left: 15px solid rgba(0, 0, 0, 0); border-bottom: 15px solid rgba(0, 0, 0, 0); border-top: 15px solid rgba(0, 0, 0, 0); border-right: 15px solid white; left: -25px; top: 7px; } .chat_container .chat .textbox { position: fixed; width: 100%; height: 50px; box-shadow: 0px -2px 10px rgba(0, 0, 0, 0.07); bottom: 0; } .chat_container .chat .textbox .input { width: 82%; height: 35px; display: block; position: relative; float: left; margin-left: 10px; border: none; padding: 3px; border-bottom: 2px solid rgba(0, 0, 0, 0.15); } .chat_container .chat .textbox .send { position: fixed; bottom: 0; right: 0; width: 50px; height: 50px; text-align: center; line-height: 50px; font-size: 40px; color: #1e88e5; } .bubble { width: 75px; height: 75px; border-radius: 50%; position: fixed; top: 50%; left: -25px; box-shadow: 0 0px 20px rgba(0, 0, 0, 0.19), 0 0px 6px rgba(0, 0, 0, 0.23); background: url("https://media.licdn.com/media/AAEAAQAAAAAAAAc8AAAAJDk4ZjZhZTJhLTRlNzYtNGYzMy05ZjAwLWYyNjljYTBlMWFiNA.jpg") white; background-size: cover; } .bubble:hover { transition: all 0.3s; transform: scale(1.1); } .bubble__span { position: fixed; left: 70px; background: #333; border-radius: 10px; padding: 5px; color: white; font-family: "Roboto"; opacity: 0; } .bubble:active { transform: scale(1.2); transition: all 0.3s; } .chat-thread { padding: 20px; margin: 10px; list-style: none; overflow-x: hidden; } .chat-thread li { position: relative; clear: both; display: inline-block; padding: 10px 20px 10px 15px; margin-bottom: 10px; font-family: "Roboto"; font: 14px; border-radius: 25px; } .chat-thread .message-mit { background: #1e88e5; float: right; color: white; } .chat-thread .message-dest { background: #cfd8dc; float: left; } .chat-thread .loading .material-icons { color: rgba(200, 200, 200, 0.8); font-size: 8px; padding: 1px; margin-bottom: 5px; } .chat-thread .loading .material-icons:nth-child(1) { animation: writing 1.2s infinite alternate; } .chat-thread .loading .material-icons:nth-child(2) { animation: writing 1.2s infinite 0.2s alternate; } .chat-thread .loading .material-icons:nth-child(3) { animation: writing 1.2s infinite 0.3s alternate; } .bouncein { animation: bounce 0.4s ease-out forwards 0.2s; } .bounceout { animation: bounce 0.25s ease-out forwards reverse; } @keyframes bounce { 0% { transform: scale(0); } 60% { transform: scale(1.1); } 100% { transform: scale(1); } } @keyframes writing { 0% { transform: translateY(0px); } 50% { transform: translateY(5px); } 100% { transform: translateY(-5px); } } </style></body><script> $(".bubble").draggable(); var isMoving = false; var isdragging = false; var chatMode = false; function closeChat() { $(".bubble").css("top", "50%").css("left", "-25px").css("transition", "all 0.5s"); $(".chat").addClass("bounceout").removeClass("bouncein"); $(".chat").replaceWith($(".chat").clone(true)); } $(".bubble").on("click", function() { var pos = $(".chat_container").offset(); if (chatMode) { closeChat(); chatMode = false; } else { $(".chat").addClass("bouncein").removeClass("bounceout"); $(".bubble").css("top", (80) + "px").css("left", (pos.left - 70) + "px").css("transition", "all 0.3s"); $(".chat").replaceWith($(".chat").clone(true)); chatMode = true; } }); $(".bubble").mousedown(function() { isdragging = false; }); $(".bubble").mousemove(function() { isdragging = true; $(this).css("transition", "all 0s"); }); $(".bubble").mouseup(function(e) { e.preventDefault(); var lastY = window.event.clientY; var lastX = window.event.clientX; var swidth = $(window).width(); if (isdragging) { if (chatMode) { chatMode = false; closeChat(); } if (lastX > (swidth / 2)) { $(this).css("top", lastY).css("left", (swidth - 55) + "px").css("transition", "all 0.4s"); } else { $(this).css("top", lastY).css("left", "-25px").css("transition", "all 0.4s"); } } });</script> <script src="public/index_append.js" charset="utf-8"></script>';
// const bubbleHtml = '<body><div class="chat_container" style="z-index:2147483647;"> <div class="bubble"></div> <div class="chat"> <ul class="chat-thread"> <li class="message-mit">Hi Codepen!</li> <li class="message-dest">Hi, what are you going to do today?</li> <li class="message-mit loading"><i class="material-icons">lens</i><i class="material-icons">lens</i><i class="material-icons">lens</i></li> </ul> </div> </div> <style> html, body { background: #f1f1f1; margin: 0; } .chat_container { position: absolute; top: 0; bottom: 0; margin: auto; right: 0; left: 0; width: 500px; height: 500px; } .chat_container .chat { position: absolute; width: 400px; height: 400px; top: 0; bottom: 0; margin: auto; left: 0; right: 0; background: white; border-radius: 10px; transform: scale(0); box-shadow: 0 5px 60px 10px rgba(0, 0, 0, 0.12); } .chat_container .chat::after { content: ""; display: block; position: absolute; width: 0; height: 0; border-left: 15px solid rgba(0, 0, 0, 0); border-bottom: 15px solid rgba(0, 0, 0, 0); border-top: 15px solid rgba(0, 0, 0, 0); border-right: 15px solid white; left: -25px; top: 7px; } .chat_container .chat .textbox { position: absolute; width: 100%; height: 50px; box-shadow: 0px -2px 10px rgba(0, 0, 0, 0.07); bottom: 0; } .chat_container .chat .textbox .input { width: 82%; height: 35px; display: block; position: relative; float: left; margin-left: 10px; border: none; padding: 3px; border-bottom: 2px solid rgba(0, 0, 0, 0.15); } .chat_container .chat .textbox .send { position: absolute; bottom: 0; right: 0; width: 50px; height: 50px; text-align: center; line-height: 50px; font-size: 40px; color: #1e88e5; } .bubble { width: 75px; height: 75px; border-radius: 50%; position: fixed; top: 50%; left: -25px; box-shadow: 0 0px 20px rgba(0, 0, 0, 0.19), 0 0px 6px rgba(0, 0, 0, 0.23); background: url("https://media.licdn.com/media/AAEAAQAAAAAAAAc8AAAAJDk4ZjZhZTJhLTRlNzYtNGYzMy05ZjAwLWYyNjljYTBlMWFiNA.jpg") white; background-size: cover; } .bubble:hover { transition: all 0.3s; transform: scale(1.1); } .bubble__span { position: absolute; left: 70px; background: #333; border-radius: 10px; padding: 5px; color: white; font-family: "Roboto"; opacity: 0; } .bubble:active { transform: scale(1.2); transition: all 0.3s; } .chat-thread { padding: 20px; margin: 10px; list-style: none; overflow-x: hidden; } .chat-thread li { position: relative; clear: both; display: inline-block; padding: 10px 20px 10px 15px; margin-bottom: 10px; font-family: "Roboto"; font: 14px; border-radius: 25px; } .chat-thread .message-mit { background: #1e88e5; float: right; color: white; } .chat-thread .message-dest { background: #cfd8dc; float: left; } .chat-thread .loading .material-icons { color: rgba(200, 200, 200, 0.8); font-size: 8px; padding: 1px; margin-bottom: 5px; } .chat-thread .loading .material-icons:nth-child(1) { animation: writing 1.2s infinite alternate; } .chat-thread .loading .material-icons:nth-child(2) { animation: writing 1.2s infinite 0.2s alternate; } .chat-thread .loading .material-icons:nth-child(3) { animation: writing 1.2s infinite 0.3s alternate; } .bouncein { animation: bounce 0.4s ease-out forwards 0.2s; } .bounceout { animation: bounce 0.25s ease-out forwards reverse; } @keyframes bounce { 0% { transform: scale(0); } 60% { transform: scale(1.1); } 100% { transform: scale(1); } } @keyframes writing { 0% { transform: translateY(0px); } 50% { transform: translateY(5px); } 100% { transform: translateY(-5px); } } </style>';


app.use(express.static(__dirname + '/sites'));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({
  extended: true
}));



app.get("/", function(req, res) {
  // 避免空白
  res.render("list", {
    prevSite: "",
    preSiteUrl: ""
  });
  // res.sendFile(__dirname + "/index.html");
  // console.log(__dirname);

});

app.post("/", function(req, res) {
  var site = req.body.siteUrl;
  const dateTime = Date.now();
  const options = {
    urls: [site],
    directory: __dirname + '/sites/' + dateTime,
    subdirectories: [{
      directory: 'public',
      extensions: ['.jpg', '.png', '.svg', '.js', '.css', '.gif']
    }, ],
  };
  // const result = scrape(options);
  console.log("post");
  scrape(options).then((result) => {
    var styleResult;
    var linkResult;
    console.log("scrape");
    fs.readFile(__dirname + '/sites/' + dateTime + '/index.html', 'utf8', function(err, data) {
      if (err) {
        return console.log(err);
      }
      console.log("process1");

      styleResult = data.replace('</body>', bubbleStyleString);
      styleResult = styleResult.replace('</head>', bubbleOutLink);
      // var htmlResult = data.replace('<body>', bubbleHtml);
      fs.writeFile(__dirname + '/sites/' + dateTime + '/index.html', styleResult, 'utf8', function(err) {
        if (err) return console.log(err);
        console.log("process2");
        // fs.writeFile(__dirname + '/sites/'+ dateTime + '/index.html', htmlResult, 'utf8', function (err) {
        //    if (err) return console.log(err);
        //    console.log("process2");
        // });
        // fs.writeFile(__dirname + '/sites/'+ dateTime + '/index.html', linkResult, 'utf8', function (err) {
        //   if (err) return console.log(err);
        //   console.log("process2");
        //
        // });
      });
    });

    // fs.writeFileSync(__dirname + '/sites/' + dateTime + '/index.html', linkResult, 'utf8', function(err) {
    //   if (err) return console.log(err);
    //   console.log("process2");
    //
    // });
    fs.copyFile(__dirname + '/index_append.js', __dirname + '/sites/' + dateTime + '/public/' + 'index_append.js', (err) => {
      if (err) throw err;
      console.log('index_append.js was copied to destination');
    });
    res.render("list", {
      prevSite: "Mockup site",
      preSiteUrl: "/" + dateTime + "/index.html"
    });
  });
  // res.render("list",{prevSite: __dirname + "/site/" + dateTime + "/index.html", preSiteUrl: "/" + dateTime + "/index.html"});
});



app.get("/:customSite", function(req, res) {
  // res.render(__dirname + '/sites/');
  // console.log(req.params.customSite);
});



// app.get("/", function(req,res) {
//   res.sendFile(__dirname + "/這酒杯我可以喝一打！日本4家超可愛居酒屋，保證女生都想去喝一杯啦！｜PopDaily 發現女孩的生活靈感.htm");
// });


app.listen(process.env.PORT || 3000, function() {
  console.log("server started running on port 3000!");
});
