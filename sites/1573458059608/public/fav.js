var myFav = {
  userID: "",
  imgUrl: "",
  articleId: 0,
  siteID: 1,
  type: 0,
  channel: 1,
  authCode: "xypc",
  login_out: "https://" + window.location.host + "/",
  window_site: "height=490, width=420,top=" + (window.screen.availHeight - 490) / 2 + ",left=" + (window.screen.availWidth - 420) / 2 + ", toolbar=no, menubar=no, scrollbars=yes, resizable=no, location=no, status=no",
  window_site2: "height=490, width=100%,top=10px, toolbar=no, menubar=no, scrollbars=yes, resizable=no, location=no, status=no",
  init: function () {
    // 文章id
    myFav.articleId = $("#articlenum .articleId").text();
    // 标题图
    myFav.imgUrl = $("#image1").attr('src');
    // 正常从cookie中获取userID
    myFav.userID = myFav.doGetCookie("uid_fouNder");

    if (myFav.userID) {
      // 判断是否收藏过
      if (myFav.articleId) {
        myFav.ArticleHasFav();
      }
    } else {
      // 获取列表的默认存在的指导意见,并将其填写到内容框中
      $(document).on('click', '.hasFav', function () {
        alert("请先登录");
        myFav.ssologin();
      });
    };

    $(".hasFav").click(function () {
      // if (myFav.userID) {
      //   // 判断是否收藏过
      //   myFav.ArticleHasFav();
      // } else {
      //   // 获取列表的默认存在的指导意见,并将其填写到内容框中
      //   $(document).on('click', '.hasFav', function () {
      //     alert("请先登录");
      //     myFav.ssologin();
      //   });
      // };
      if ($(this).hasClass("active")) {
        myFav.cancelFav();
      } else {
        myFav.collectArticle();
      }
    });
  },

  // 判断是否收藏
  ArticleHasFav: function () {
    $.ajax({
      url: myxyUrl + "/hasFav?userID=" + myFav.userID + "&siteID=" + myFav.siteID + "&type=" + myFav.type + "&articleID=" + myFav.articleId,
      type: "get",
      dataType: "json",
      success: function (data) {
        if (data && data == true) {
          $(".hasFav").addClass("active");
        };
      },
      error: function (data) {
        console.log(data);
      }
    })
  },


  // 收藏稿件
  collectArticle: function () {
    $.ajax({
      url: myxyUrl + "/fav?userID=" + myFav.userID + "&siteID=" + myFav.siteID + "&type=" + myFav.type + "&articleID=" + myFav.articleId + "&channel=" + myFav.channel,
      type: "get",
      dataType: "json",
      success: function (data) {
        if (data && data == true) {
          alert("收藏成功");
          $(".hasFav").addClass("active");
          window.localStorage.setItem("articleID", myFav.articleId);
          window.localStorage.setItem("imgUrl", myFav.imgUrl);
        }
      },
      error: function (data) {
        alert("收藏失败");
      }
    })

  },

  // 取消收藏
  cancelFav: function () {
    $.ajax({
      url: myxyUrl + "/favCancel",
      type: "post",
      data: {
        "type": myFav.type,
        "channel": myFav.channel,
        "imgUrl": myFav.imgUrl,
        "userID": myFav.userID,
        "siteID": myFav.siteID,
        "articleID": myFav.articleId
      },
      dataType: "json",
      success: function (data) {
        if (data && data == true) {
          alert("取消收藏成功");
          $(".hasFav").removeClass("active");
          window.localStorage.removeItem("articleID");
          window.localStorage.removeItem("imgUrl");
        }
      },
      error: function (data) {
        alert("取消收藏失败");
      }
    })
  },


  // 获取cookie中的uid值
  doGetCookie: function (uid) {
    var aCookie = document.cookie.split("; ");
    for (var i = 0; i < aCookie.length; i++) {
      var aCrumb = aCookie[i].split("=");
      if (uid == aCrumb[0])
        return unescape(aCrumb[1]);
    }
    return null;
  },

  ssologin: function () {
    window.open("https://sso.sinchew.com.my:1443/SSOv2/user/ssoLogin?code=" + myFav.authCode + "&redirectUrl=" + myFav.login_out + "sso/setCookie.html?&anyUrl=" + location.href, "newwindow", myFav.window_site);
  }
}

// window.onload = function () {
//   myFav.init();
// }
