var personalMessage = {
  userId: '',
  imgUrl: window.localStorage.getItem("imgUrl"),
  articleId: window.localStorage.getItem("articleID"),
  siteID: 1,
  type: 0,
  channel: 1,
  uid: "", //目前是假的，这块的uid应该是登录的时候，就存储到cookie中的，如果获取不到，请联系袁志康老师
  myFav: {},
  myFavLength: 0,
  authCode: "xypc",
  login_out: "https://" + window.location.host + "/",
  window_site: "height=490, width=420,top=" + (window.screen.availHeight - 490) / 2 + ",left=" + (window.screen.availWidth - 420) / 2 + ", toolbar=no, menubar=no, scrollbars=yes, resizable=no, location=no, status=no",
  // 初始化方法
  init: function () {
    // 获取cookie中的uid---这块的uid应该是登录的时候，存储到cookie中的
    // 请求uid
    personalMessage.uid = personalMessage.doGetCookie("uid_fouNder");
    if (personalMessage.uid) {
      // 获取信息
      personalMessage.getMessage();
    };

    // 上传头像
    $("#upload").click(function () {
      personalMessage.uploadHeadImg();
    });

    // 保存修改信息
    $("#bc").click(function () {
      personalMessage.modifyMessage();
    });

    // 注册
    $(".headspinning").click(function () {
      personalMessage.register();
    });

    // 登录
    $("#loginaftercheck").click(function () {
      personalMessage.ssologin();
    });

    // 退出登录
    $(".logout").click(function () {
      personalMessage.exit();
    });

  },

  // 获取详细信息(已经通了)
  getMessage: function () {
    $.ajax({
      url: mysso_url + '/info?uid=' + personalMessage.uid,
      type: 'get',
      dataType: 'json',
      success: function (data) {
        $(".personal-name").text(data.nickname);
        $(".email").text(data.email);
        $(".birthDay").text(data.birthday);
        if (data.sex == "0") {
          $(".sex").text("男");
        } else {
          $(".sex").text("女");
        }
        $(".personal-icon img").attr("src", data.head);
        $(".collection-icon img").attr('src', data.head);
        $("#uploadResult img").attr("src", data.head);

        // userId
        personalMessage.userId = data.userId;
        console.log(personalMessage.userId);
        $("#uploadForm #userId").val(personalMessage.userId);

        // 获取我的收藏
        personalMessage.getFavArticle();
      }
    })

  },

  // 获取收藏的稿件(已经通了)
  getFavArticle: function () {
    $.ajax({
      url: myxyUrl + "/myFav",
      type: "post",
      dataType: "json",
      data: {
        "userID": personalMessage.uid,
        "page": 0,
        "siteId": 1
      },
      success: function (data) {
        personalMessage.myFav = data.list;
        personalMessage.myFavLength = data.list.length;
        $(".collection-total").text(personalMessage.myFavLength + "篇");
        var html = "";
        personalMessage.myFav.forEach(element => {
          html += '<div class="newsList">' +
            '<div class="newsList-img">' +
            '<img src="" alt="" >' +
            '</div>' +
            '<div class="newsList-content" data-articleID= "'+ element.articleID +'">' +
            '<a href="' + element.url + '">' +
            '<div class="article-title"><span class="article-column">' + element.column + '/</span>' + element.title + '</div>' +
            '<div class="article-description">' + element.title + '</div>' +
            '</a>' +
            '</div>' +
            '<div class="newsList-delete">删除</div>' +
            '</div>'
        });
        $(".collection-list").html(html);

        // 删除收藏稿件
        $(".newsList-delete").click(function () {
          var _this = this;
          personalMessage.cancelFav(_this);
        })
      }
    })
  },

  // 修改资料(修改资料通了，修改密码通了)
  modifyMessage: function () {
    $.ajax({
      // url: mysso_app + "/modify",
      // url: myxy_app + 'modify?uid=' + personalMessage.uid + '&nickname=' + $("#username").val() + '&sex=' + $("input[name='sex']:checked").val() + '&birthday=' + $("#birthDay").val() + '&email=' + $("#email").val(),
      // type: "get",
      url: "https://sso.sinchew.com.my:1443/sso-app/api/modify",
      type: "post",
      dataType: "json",
      data: {
        "uid": personalMessage.uid,
        "nickname": $("#username").val(),
        "sex": $("input[name='sex']:checked").val(),
        "birthday": $("#birthDay").val()
        // "email": $("#email").val()
      },
      success: function (data) {
        if (data && data.code == '1') {
          alert('修改资料成功');
        }
      }
    });
    // 修改密码接口
    $.ajax({
      // url: mysso_app + "/updatePassword",
      // url: myxy_app + 'updatePassword',
      url: "https://sso.sinchew.com.my:1443/sso-app/api/updatePassword",
      type: "post",
      dataType: "json",
      data: {
        "uid": personalMessage.uid,
        "password": hex_md5($("#oldpassword").val()),
        "newPassword": hex_md5($("#password").val())
      },
      success: function (data) {
        if (data && data.code == "1") {
          console.log("密码修改成功")
        }
      }
    })
  },

  // 上传头像(已经通了)
  uploadHeadImg: function () {
    var form = new FormData(document.getElementById("uploadForm"));
    $.ajax({
      url: myxyUrl + "/amuc/api/member/uploadImage",
      type: "post",
      data: form,
      processData: false,
      contentType: false,
      success: function (data) {
        var upData = JSON.parse(data);
        if (upData.code == "1") {
          $("#uploadResult img").attr("src", upData.msg);
        } else {
          $("#uploadResult").html(JSON.stringify(data, null, "\t"));
        }
      },
      error: function (e) {
        alert("错误！！");
      }
    });
  },

  // 退出登录
  exit: function () {
    window.open("https://sso.sinchew.com.my:1443/SSOv2/user/ssoLogout?code=" + personalMessage.authCode + "&uid=" + personalMessage.uid + "&sso_token=" + personalMessage.doGetCookie("sso_token") +
      "&from=" + personalMessage.login_out + "sso/delCookie.html", "newwindow", personalMessage.window_site);

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

  cancelFav: function (_this) {
    $.ajax({
      url: myxyUrl + "/favCancel",
      type: "post",
      data: {
        "type": personalMessage.type,
        "channel": personalMessage.channel,
        "imgUrl": personalMessage.imgUrl,
        "userID": personalMessage.uid,
        "siteID": personalMessage.siteID,
          // "articleID": personalMessage.articleId
        "articleID": $(_this).parent().attr('data-articleID')
      },
      dataType: "json",
      success: function (data) {
        if (data && data == true) {
          alert("取消收藏成功");
          $(_this).parent().remove();
          window.localStorage.removeItem("articleID");
          window.localStorage.removeItem("imgUrl");
          $(".collection-total").text(parseInt($(".collection-total").text()) - 1 + "篇");
        }
      },
      error: function (data) {
        alert("取消收藏失败");
      }
    })
  },

  // 登录
  ssologin: function () {
    window.open("https://sso.sinchew.com.my:1443/SSOv2/user/ssoLogin?code=" + personalMessage.authCode + "&redirectUrl=" + personalMessage.login_out + "sso/setCookie.html?&anyUrl=" + location.href, "newwindow", personalMessage.window_site);
  },


  // 注册
  register: function () {
    window.open("https://sso.sinchew.com.my:1443/SSOv2/user/register", "newwindow", personalMessage.window_site)
  }

}

// window.onload = function () {
//   personalMessage.init();
// }

