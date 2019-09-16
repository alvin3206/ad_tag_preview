/**
 *
 * @authors Blake
 * @date    2017-05-02 09:30:02
 * @version 1.0
 */
var allCity = {
    'cities': [
        {
            'en': "Keelung",
            'cn': '基隆市'
        },
        {
            'en': "TaipeiCity",
            'cn': '臺北市'
        },
        {
            'en': "Taipei",
            'cn': '新北市'
        },
        {
            'en': "Taoyuan",
            'cn': '桃園市'
        },
        {
            'en': "HsinchuCity",
            'cn': '新竹市'
        },
        {
            'en': "Hsinchu",
            'cn': '新竹縣'
        },
        {
            'en': "Miaoli",
            'cn': '苗栗縣'
        },
        {
            'en': "Taichung",
            'cn': '臺中市'
        },
        {
            'en': "Changhua",
            'cn': '彰化縣'
        },
        {
            'en': "Nantou",
            'cn': '南投縣'
        },
        {
            'en': "Yunlin",
            'cn': '雲林縣'
        },
        {
            'en': "ChiayiCity",
            'cn': '嘉義市'
        },
        {
            'en': "Chiayi",
            'cn': '嘉義縣'
        },
        {
            'en': "Yilan",
            'cn': '宜蘭縣'
        },
        {
            'en': "Hualien",
            'cn': '花蓮縣'
        },
        {
            'en': "Taitung",
            'cn': '臺東縣'
        },
        {
            'en': "Tainan",
            'cn': '臺南市'
        },
        {
            'en': "KaohsiungCity",
            'cn': '高雄市'
        },
        {
            'en': "Pingtung",
            'cn': '屏東縣'
        },
        {
            'en': "Matsu",
            'cn': '連江縣'
        },
        {
            'en': "Kinmen",
            'cn': '金門縣'
        },
        {
            'en': "Penghu",
            'cn': '澎湖縣'
        }]
};

//印出各縣市
var eachCity = function() {
    $.each(allCity.cities, function (key, city) {
        $('#weather_link').append('<a href="javascript:void(0)" name="'+ city.en +'" onclick="changeCity(this)"> ' + city.cn +' </a><br/>');
    })
};

//連結觸發
var changeCity = function(object) {
    var CityEnglish = object.name;

    setCookie(CityEnglish);

    getWeatherData(CityEnglish);
};

//取得IP資料
function getIpData()
{
    // freegeoip.net已無法使用 都先給台北市
    return 'TaipeiCity';

    var local;
    var url = 'https://freegeoip.net/json/';
    $.ajax({
        url: url,
        data: {time: '123123123'},
        async: false,
        success: function(json) {
            if (json.city !== '') {
                local = json.city;
            } else {
                local = false;
            }
        }
    });
    return local;
}

//取得cookie資料
function checkCookieData(cookieName)
{
    var name = cookieName + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1);
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return false;
}

//設定cookie
function setCookie(data)
{
    document.cookie = "WeatherData" + "=" + data + ";expires = 365"+"; path = /";
}

//請求天氣資料
function getWeatherData()
{
        return;
    var cookie = checkCookieData('WeatherData');
    if (cookie !== false) {
        city = cookie;
    } else {
        city = getIpData();
        setCookie(city);
    }

    $.ajax({
        url: '//cache.ltn.com.tw/program/weather/Controller.php',
        data: {cityname : city},
        type: 'GET',
        async: false,
        crossDomain: true,
        success: function(json) {
            var data = $.parseJSON(json);
            results = {
                'cityname': data.Area,
                'temperature': data.Temperature,
                'status': data.Status,
                'img': data.Simg
            };
        }
    });
    return results;
};
