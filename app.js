// jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const scrape = require('website-scraper');
const fs = require('fs');


const app = express();
const bubbleOutLink = '<link rel="stylesheet" href="public/styles_append.css"></head><script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script><script src="https://code.jquery.com/ui/1.12.1/jquery-ui.min.js" integrity="sha256-VazP97ZCwtekAsvgPBSUwPFKdrwD3unUfSGVYrahUqU=" crossorigin="anonymous"></script>';
const bubbleStyleString = '<div class="chat_container" style="visibility:hidden;z-index:100000">  <div class="bubble" style="visibility:visible"></div>  <div class="chat" style="visibility:visible">    <ul class="chat-thread">      <li><button type="button" class="btn btn-primary">          頁面上的 DFP 廣告空間數          <span class="badge badge-light">9</span>          <span class="sr-only">unread messages</span>        </button></li>      <li><p>DFP空間</p><select id="dfpDrop">     <!-- <option value="" selected disabled hidden>Choose DFP space</option> -->        </select></li>   <li><p>PPS版型：</p><select id="ppsDrop">     <!-- <option value="" selected disabled hidden>Choose PPS Layout</option> -->        </select></li>    <li><button id="confirmMapping" type="button" class="btn btn-primary">顯示</button></li>     </ul>  </div></div></body>><script src="public/index_append.js" charset="utf-8"></script>';
const topTag = '<script id="pps-script-11999" data-width="320" data-height="50" data-click-url="" data-cache-buster="" data-dsp-script="" src="https://tenmaxsgads.blob.core.windows.net/holder-stage/11999_ccb471cd-a98c-3262-8af0-4af97aec476d.js?cb=1574909888873"></script><ins class="ppstudio" data-pps-target-id="cr-11999"></ins><script async src="https://tenmaxsgads.blob.core.windows.net/code-stage/ppstudio-dev.js"></script>';
const googleConsoleMeta = '<meta name="google-site-verification" content="_KVbcXSdDrOFWWY0t6EqNWwLUX5E0S9imEIhCenUZYE"/></head>'

// const bubbleStyleString = '<div class="chat_container" style="z-index:2147483647;"><div class="bubble"></div> <div class="chat"> <ul class="chat-thread"><button type="button" class="btn btn-primary">頁面上的 DFP 廣告空間數<span class="badge badge-light">9</span> <span class="sr-only">unread messages</span></button><li class="message-dest">Hi Codepen!</li> <li class="message-dest"><select class="custom-select"><option selected>DFP 廣告空間</option></select> </li> <li class="message-mit"></li></ul> </div> <div></body><script src="public/index_append.js" charset="utf-8"></script>';

// const bubbleHtml = '<body><div class="chat_container" style="z-index:2147483647;"> <div class="bubble"></div> <div class="chat"> <ul class="chat-thread"> <li class="message-mit">Hi Codepen!</li> <li class="message-dest">Hi, what are you going to do today?</li> <li class="message-mit loading"><i class="material-icons">lens</i><i class="material-icons">lens</i><i class="material-icons">lens</i></li> </ul> </div> </div> <style> html, body { background: #f1f1f1; margin: 0; } .chat_container { position: absolute; top: 0; bottom: 0; margin: auto; right: 0; left: 0; width: 500px; height: 500px; } .chat_container .chat { position: absolute; width: 400px; height: 400px; top: 0; bottom: 0; margin: auto; left: 0; right: 0; background: white; border-radius: 10px; transform: scale(0); box-shadow: 0 5px 60px 10px rgba(0, 0, 0, 0.12); } .chat_container .chat::after { content: ""; display: block; position: absolute; width: 0; height: 0; border-left: 15px solid rgba(0, 0, 0, 0); border-bottom: 15px solid rgba(0, 0, 0, 0); border-top: 15px solid rgba(0, 0, 0, 0); border-right: 15px solid white; left: -25px; top: 7px; } .chat_container .chat .textbox { position: absolute; width: 100%; height: 50px; box-shadow: 0px -2px 10px rgba(0, 0, 0, 0.07); bottom: 0; } .chat_container .chat .textbox .input { width: 82%; height: 35px; display: block; position: relative; float: left; margin-left: 10px; border: none; padding: 3px; border-bottom: 2px solid rgba(0, 0, 0, 0.15); } .chat_container .chat .textbox .send { position: absolute; bottom: 0; right: 0; width: 50px; height: 50px; text-align: center; line-height: 50px; font-size: 40px; color: #1e88e5; } .bubble { width: 75px; height: 75px; border-radius: 50%; position: fixed; top: 50%; left: -25px; box-shadow: 0 0px 20px rgba(0, 0, 0, 0.19), 0 0px 6px rgba(0, 0, 0, 0.23); background: url("https://media.licdn.com/media/AAEAAQAAAAAAAAc8AAAAJDk4ZjZhZTJhLTRlNzYtNGYzMy05ZjAwLWYyNjljYTBlMWFiNA.jpg") white; background-size: cover; } .bubble:hover { transition: all 0.3s; transform: scale(1.1); } .bubble__span { position: absolute; left: 70px; background: #333; border-radius: 10px; padding: 5px; color: white; font-family: "Roboto"; opacity: 0; } .bubble:active { transform: scale(1.2); transition: all 0.3s; } .chat-thread { padding: 20px; margin: 10px; list-style: none; overflow-x: hidden; } .chat-thread li { position: relative; clear: both; display: inline-block; padding: 10px 20px 10px 15px; margin-bottom: 10px; font-family: "Roboto"; font: 14px; border-radius: 25px; } .chat-thread .message-mit { background: #1e88e5; float: right; color: white; } .chat-thread .message-dest { background: #cfd8dc; float: left; } .chat-thread .loading .material-icons { color: rgba(200, 200, 200, 0.8); font-size: 8px; padding: 1px; margin-bottom: 5px; } .chat-thread .loading .material-icons:nth-child(1) { animation: writing 1.2s infinite alternate; } .chat-thread .loading .material-icons:nth-child(2) { animation: writing 1.2s infinite 0.2s alternate; } .chat-thread .loading .material-icons:nth-child(3) { animation: writing 1.2s infinite 0.3s alternate; } .bouncein { animation: bounce 0.4s ease-out forwards 0.2s; } .bounceout { animation: bounce 0.25s ease-out forwards reverse; } @keyframes bounce { 0% { transform: scale(0); } 60% { transform: scale(1.1); } 100% { transform: scale(1); } } @keyframes writing { 0% { transform: translateY(0px); } 50% { transform: translateY(5px); } 100% { transform: translateY(-5px); } } </style>';


app.use(express.static(__dirname + '/sites'));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({
  extended: true
}));



app.get("/", function(req, res) {
  // 避免空白
  res.render("list", {
    prevSite: "Mockup site",
    preSiteUrl: "",
    disabled:"disabled"
  });
  // res.sendFile(__dirname + "/index.html");
  // console.log(__dirname);

});

app.post("/", function(req, res) {
  // req.setTimeout(500000);
  var site = encodeURI(req.body.siteUrl);
  const dateTime = Date.now();
  console.log("/" + dateTime + "/index.html");
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
    console.log(req.body.notBubble);
    if (req.body.notBubble !== "true" && req.body.onTop !== "true") {
      fs.readFile(__dirname + '/sites/' + dateTime + '/index.html', 'utf8', function(err, data) {
        if (err) {
          return console.log(err);
        }
        console.log("process1");

        styleResult = data.replace('</body>', bubbleStyleString);
        styleResult = styleResult.replace('</head>', googleConsoleMeta);
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
      fs.copyFile(__dirname + '/styles_append.css', __dirname + '/sites/' + dateTime + '/public/' + 'styles_append.css', (err) => {
        if (err) throw err;
        console.log('styles_append.css was copied to destination');
      });
      fs.copyFile(__dirname + '/index_append.js', __dirname + '/sites/' + dateTime + '/public/' + 'index_append.js', (err) => {
        if (err) throw err;
        console.log('index_append.js was copied to destination');
      });
      //work
      // res.render("list", {
      //   prevSite: "Mockup site",
      //   preSiteUrl: "/" + dateTime + "/index.html"
      // });
    } else if (req.body.onTop == "true") {
      var topResult = "";
      fs.readFile(__dirname + '/sites/' + dateTime + '/index.html', 'utf8', function(err, data) {
        if (err) {
          return console.log(err);
        }
        console.log("top_process1");

        topResult = data.replace('</body>', topTag + '</body>');
        fs.writeFile(__dirname + '/sites/' + dateTime + '/index.html', topResult, 'utf8', function(err) {
          if (err) return console.log(err);
          console.log("top_process2");
        });
      });
    }

  });




  res.render("list", {
    prevSite: "Mockup site",
    preSiteUrl: "/" + dateTime + "/index.html",
    disabled:""
  });

  // res.render("list",{prevSite: __dirname + "/site/" + dateTime + "/index.html", preSiteUrl: "/" + dateTime + "/index.html"});
});



// app.get("/:customSite", function(req, res) {
//   // res.render(__dirname + '/sites/');
//   // console.log(req.params.customSite);
// });



// app.get("/", function(req,res) {
//   res.sendFile(__dirname + "/這酒杯我可以喝一打！日本4家超可愛居酒屋，保證女生都想去喝一杯啦！｜PopDaily 發現女孩的生活靈感.htm");
// });


app.listen(process.env.PORT || 3000, function() {
  console.log("server started running on port 3000!");
});
