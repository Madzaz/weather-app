$(document).ready(function () {
  $("#dropdownMenu").click(function () {
    $(".weatherInfo").toggleClass("active");
  });

  $.ajax({
    method: "GET",
    url: "http://api.weatherapi.com/v1/forecast.json",
    data: {
      key: "80e5d57f1b0e4b1c831205951240805",
      q: "Amsterdam",
    },
    success: function (response) {
      var isDay = response["current"]["is_day"];
      if (isDay === 1) {
        $("main").css("background-image", "url(images/dayTime.jpg)");
      } else {
        $("main").css("background-image", "url(images/nightTime.jpg)");
      }

      $("#cityName").text(response["location"]["name"]);
      $("#cityTemp").text(response["current"]["temp_c"] + "°");
      $("#weather").text(response["current"]["condition"]["text"]);

      $(".dayNow .temp").text(response["current"]["temp_c"] + "°");
      $(".dayNow .weatherIcon").text(response["current"]["temp_c"] + "°");

      var todayForecast = response.forecast.forecastday[0];
      $("#highTemp").text("H:" + todayForecast["day"]["maxtemp_c"] + "°");
      $("#lowTemp").text("L:" + todayForecast["day"]["mintemp_c"] + "°");

      var iconURL = response["current"]["condition"]["icon"];
      var timeZone = response["forecast"]["forecastday"][0]["hour"];

      // Yesterday
      $(".lastDay .weatherIcon").attr(
        "src",
        "https:" + timeZone[12]["condition"]["icon"]
      );
      $(".lastDay .temp").text(timeZone[12]["temp_c"] + "°");
      $(".lastDay .rainChance").text(timeZone[12]["chance_of_rain"] + "%");

      // Today
      $(".dayNow .weatherIcon").attr("src", "https:" + iconURL);

      // Day One
      $(".dayOne .weatherIcon").attr(
        "src",
        "https:" + timeZone[14]["condition"]["icon"]
      );
      $(".dayOne .temp").text(timeZone[14]["temp_c"] + "°");
      $(".dayOne .rainChance").text(timeZone[14]["chance_of_rain"] + "%");

      // Day Two
      $(".dayTwo .weatherIcon").attr(
        "src",
        "https:" + timeZone[18]["condition"]["icon"]
      );
      $(".dayTwo .temp").text(timeZone[18]["temp_c"] + "°");
      $(".dayTwo .rainChance").text(timeZone[18]["chance_of_rain"] + "%");

      // Day Three
      $(".dayThree .weatherIcon").attr(
        "src",
        "https:" + timeZone[22]["condition"]["icon"]
      );
      $(".dayThree .temp").text(timeZone[22]["temp_c"] + "°");
      $(".dayThree .rainChance").text(timeZone[22]["chance_of_rain"] + "%");
    },
  });
});
