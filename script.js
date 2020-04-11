// var cityInStorage = $("<li class='list-group-item'>" + JSON.parse(localStorage.getItem(localStorage.key(0))) + "</li>");
// $("#cityList").append(cityInStorage);


//   var keyName = window.localStorage.key(0);
//   if (keyName !== null) {
//   console.log(keyName);
//   var cityInStorage = $("<li class='list-group-item'>" + keyName + "</li>");
//   $("#cityList").append(cityInStorage);
// }



// Main click function that gets and stores the weather and UV index
$("button").on("click", function (event) {
  event.preventDefault();

  var city = $("#city").val();
  var APIKey = "3c71682f4f047f87294d0577dc780b8d";
  var queryURL = "https://api.openweathermap.org/data/2.5/weather?" +
    "q=" + city + "&appid=" + APIKey;
  var queryURLFive = "https://api.openweathermap.org/data/2.5/forecast?" +
    "q=" + city + "&appid=" + APIKey;


  // First API call to get the weather
  $.ajax({
    url: queryURL,
    method: "GET"
  })
    .then(function (response) {

      // Convert the temperature in kelvin to fahrenheit
      var tempF = (response.main.temp - 273.15) * 1.80 + 32;
      var condIcon = response.weather[0].icon;
      var w = "http://openweathermap.org/img/wn/" + condIcon + ".png";

      // add temp content to html
      $(".city").html("<h2>" + response.name + " " + moment().format("L") + " " + "<img src= '" + w + "'></img></h2>");
      $(".tempF").text("Temperature (F): " + tempF.toFixed(2));
      $(".humidity").text("Humidity: " + response.main.humidity);
      $(".wind").text("Wind Speed: " + response.wind.speed);

      // Get and display the UV index
      var lat = response.coord.lat;
      var long = response.coord.lon;
      var queryURLuv = "http://api.openweathermap.org/data/2.5/uvi?&lat=" + lat + "&lon=" + long + "&appid=" + APIKey;

      // Second API call to get the UV index
      $.ajax({
        url: queryURLuv,
        method: "GET"
      })
        .then(function (responsetwo) {

          // Display UV index with color depending on severity
          var uvIndex = responsetwo.value;
          if (uvIndex <= 3) {
            $(".uvindex").html("UV Index: <span class='uvStyleGreen'>" + uvIndex + "</span>");
          } else if (uvIndex >= 6) {
            $(".uvindex").html("UV Index: <span class='uvStyleRed'>" + uvIndex + "</span>");
          } else {
            $(".uvindex").html("UV Index: <span class='uvStyleYellow'>" + uvIndex + "</span>");
          }

          // Append cities to the list and add to local storage
          var cityListItem = $("<li class='list-group-item'>" + city + "</li>");
          $("#cityList").prepend(cityListItem);
          localStorage.setItem(city, JSON.stringify(response));

          // Add UV index to local storage
          localStorage.setItem(city + "UV", uvIndex);

          //Display five-day forecast
          $.ajax({
            url: queryURLFive,
            method: "GET"
          })
            .then(function (responseThree) {
              console.log(responseThree);




            });










          // Function to display weather and UV index when an item in the list is clicked
          $("li").on("click", function () {
            var cityObj = JSON.parse(localStorage.getItem(this.innerHTML));
            var tempF2 = (cityObj.main.temp - 273.15) * 1.80 + 32;
            var condIcon2 = cityObj.weather[0].icon;
            var w2 = "http://openweathermap.org/img/wn/" + condIcon2 + ".png";
            var uvKey = this.innerHTML + "UV";

            $(".city").html("<h2>" + cityObj.name + " " + moment().format("L") + " " + "<img src= '" + w2 + "'></img></h2>");
            $(".tempF").text("Temperature (F): " + tempF2.toFixed(2));
            $(".humidity").text("Humidity: " + cityObj.main.humidity);
            $(".wind").text("Wind Speed: " + cityObj.wind.speed);

            // Give the UV index a background color depending on severity
            if (uvKey <= 3) {
              $(".uvindex").html("UV Index: <span class='uvStyleGreen'>" + localStorage.getItem(uvKey) + "</span>");
            } else if (uvKey >= 6) {
              $(".uvindex").html("UV Index: <span class='uvStyleRed'>" + localStorage.getItem(uvKey) + "</span>");
            } else {
              $(".uvindex").html("UV Index: <span class='uvStyleYellow'>" + localStorage.getItem(uvKey) + "</span>");
            }

          });

        });


      // $("li").on("click", function () {
      //   var cityObj = JSON.parse(localStorage.getItem(this.innerHTML));
      //   var tempF2 = (cityObj.main.temp - 273.15) * 1.80 + 32;
      //   var condIcon2 = cityObj.weather[0].icon;
      //   var w2 = "http://openweathermap.org/img/wn/" + condIcon2 + ".png";
      //   var uvKey = this.innerHTML + "uv";



      // // Give the UV index a background color depending on severity
      // if (uvIndex <= 3) {
      //   $(".uvindex").html("UV Index: <span class='uvStyleGreen'>" + localStorage.getItem(uvKey) + "</span>");
      // } else if (uvIndex >= 6) {
      //   $(".uvindex").html("UV Index: <span class='uvStyleRed'>" + localStorage.getItem(uvKey) + "</span>");
      // } else {
      //   $(".uvindex").html("UV Index: <span class='uvStyleYellow'>" + localStorage.getItem(uvKey) + "</span>");
      // }




      // });
    });
});


