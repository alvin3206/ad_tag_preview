// jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const scrape = require('website-scraper');
const fs = require('fs');


const app = express();
const bubbleOutLink = '<link rel="stylesheet" href="public/styles_append.css"></head><script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script><script src="https://code.jquery.com/ui/1.12.1/jquery-ui.min.js" integrity="sha256-VazP97ZCwtekAsvgPBSUwPFKdrwD3unUfSGVYrahUqU=" crossorigin="anonymous"></script>';
const bubbleStyleString = '<div class="chat_container" style="visibility:hidden;z-index:100000">  <div class="bubble" style="visibility:visible"></div>  <div class="chat" style="visibility:visible">    <ul class="chat-thread">      <li><h5>          How many DFP Ad spaces on this page:          <span class="badge badge-pill badge-warning">9</span>        </h5></li>      <li><p>Replace DFP ad space:</p><select id="dfpDrop">     <!-- <option value="" selected disabled hidden>Choose DFP space</option> -->        </select></li><li><p>Ad Space Size</p><p id="spaceSize"></p></li>    <li><button id="confirmMapping" type="button" class="btn btn-primary">Replace with your tag</button></li>     </ul>  </div></div></body><script src="public/index_append.js" charset="utf-8"></script>';




// app.use(express.static(__dirname + '/sites'));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({
  extended: true
}));



app.get("/", function(req, res) {
  app.use(express.static(__dirname + '/sites'));
  // 避免空白
  res.render("list", {
    prevSite: "Mockup site",
    preSiteUrl: "",
    disabled: "disabled",
    format: ""
  });
  // res.sendFile(__dirname + "/index.html");
  // console.log(__dirname);
});

app.post("/", function(req, res) {
  app.use(express.static(__dirname + '/sites'));
  // req.setTimeout(500000);
  var site = encodeURI(req.body.siteUrl);
  var adTag = encodeURI(req.body.insertTag);
  console.log(adTag);
  const dateTime = Date.now();
  console.log("/" + dateTime + "/index.html");

  // class MyPlugin {
  //   apply(registerAction) {
  //     registerAction('afterFinish', async () => {});
  //   }
  // }
  const options = {
    urls: [site],
    directory: __dirname + '/sites/' + dateTime,
    subdirectories: [{
      directory: 'public',
      extensions: ['.jpg', '.png', '.svg', '.js', '.css', '.gif']
      // plugins: [new MyPlugin()]
    }, ],
  };
  console.log("post");



  scrape(options).then((result) => {
    var styleResult;
    var jsReplace;
    var linkResult;
    console.log("scrape");
    console.log(req.body.disableSelect);

    if (req.body.disableSelect !== "true") {
      fs.readFile(__dirname + '/sites/' + dateTime + '/index.html', 'utf8', function(err, data) {
        if (err) {
          return console.log(err);
        }
        console.log("process1");

        styleResult = data.replace('</body>', bubbleStyleString);
        styleResult = styleResult.replace('</head>', bubbleOutLink);
        fs.writeFile(__dirname + '/sites/' + dateTime + '/index.html', styleResult, 'utf8', function(err) {
          if (err) return console.log(err);
          console.log("process2");
        });
      });
      fs.copyFile(__dirname + '/styles_append.css', __dirname + '/sites/' + dateTime + '/public/' + 'styles_append.css', (err) => {
        if (err) throw err;
        console.log('styles_append.css was copied to destination');
      });
      fs.copyFile(__dirname + '/append.html', __dirname + '/sites/' + dateTime + '/public/' + '/append.html', (err) => {
        if (err) throw err;
        console.log('append.html was copied to destination');
      });
      fs.copyFile(__dirname + '/index_append.js', __dirname + '/sites/' + dateTime + '/public/' + 'index_append.js', (err) => {
        if (err) throw err;
        console.log('index_append.js was copied to destination');
      });
    }

    if (req.body.codeFormat === "js") {
      fs.readFile(__dirname + '/sites/' + dateTime + '/public/' + 'append.html', 'utf8', function(err, data) {
        if (err) {
          return console.log(err);
        }
        console.log("process3");

        jsReplace = data.replace('</body>', '</body><script type="text/javascript">' + decodeURI(adTag) + '</script>');

        fs.writeFile(__dirname + '/sites/' + dateTime + '/public/' + 'append.html', jsReplace, 'utf8', function(err) {
          if (err) return console.log(err);
          console.log("process4");
        });
      });
    } else if (req.body.codeFormat === "html") {
      fs.readFile(__dirname + '/sites/' + dateTime + '/public/' + 'append.html', 'utf8', function(err, data) {
        if (err) {
          return console.log(err);
        }
        console.log("process3");

        jsReplace = data.replace('<body>', '<body>' + decodeURI(adTag));

        fs.writeFile(__dirname + '/sites/' + dateTime + '/public/' + 'append.html', jsReplace, 'utf8', function(err) {
          if (err) return console.log(err);
          console.log("process4");
        });
      });
    }
    res.render("list", {
      prevSite: "Mockup site",
      preSiteUrl: "/" + dateTime,
      disabled: "",
      format: req.body.codeFormat
    });
  });
});

app.get("/:siteId/", function(req, res) {
  if (Number(req.params.siteId)) {
    app.use(express.static(__dirname + '/sites'));
    var realSite = req.params.siteId;
    console.log("site:" + realSite);
    console.log("spaceId:" + req.query.spaceId);
    if (req.query.spaceId) {
      var spaceId = req.query.spaceId;
    } else {
      res.sendFile(__dirname + "/sites/" + req.params.siteId + "/index.html");
    }
  }
});


app.listen(process.env.PORT || 3000, function() {
  console.log("server started running on port 3000!");
});
