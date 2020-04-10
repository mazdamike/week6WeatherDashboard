// for (var i = 0; i < localStorage.length; i++) {
//   var cityInStorage = $("<li class='list-group-item'>" + JSON.parse(localStorage.getItem(localStorage.key(i))) + "</li>");
//   $("#cityList").append(cityInStorage);
// }


// Main click function that gets and stores the weather and UV index
$("button").on("click", function() {
    event.preventDefault();
 
    var city = $("#city").val();
    var APIKey = "3c71682f4f047f87294d0577dc780b8d";
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?" +
    "q=" + city + "&appid=" + APIKey;

        // API call to get the weather
        $.ajax({
        url: queryURL,
        method: "GET"
      })
        .then(function(response) {
              
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

          // API call to get the UV index
          $.ajax({
            url: queryURLuv,
            method: "GET"
          })
            .then(function(responsetwo) {
        
             console.log(responsetwo);
             $(".uvindex").text("UV Index: " + responsetwo.value);
            
             // Add UV index to local storage
             localStorage.setItem(city + "uv", responsetwo.value);

            });

         
          // Append cities to the list and add to local storage
           var cityListItem = $("<li class='list-group-item'>" + city + "</li>");
           $("#cityList").prepend(cityListItem);
           localStorage.setItem(city, JSON.stringify(response));
        

           // Function to display weather and UV index when an item in the list is clicked
          $("li").on("click", function() {
          var cityObj = JSON.parse(localStorage.getItem(this.innerHTML));
          var tempF2 = (cityObj.main.temp - 273.15) * 1.80 + 32;
          var condIcon2 = cityObj.weather[0].icon;
          var w2 = "http://openweathermap.org/img/wn/" + condIcon2 + ".png";
          var uvKey = this.innerHTML + "uv";

          $(".city").html("<h2>" + cityObj.name + " " + moment().format("L") + " " + "<img src= '" + w2 + "'></img></h2>");
          $(".tempF").text("Temperature (F): " + tempF2.toFixed(2));
          $(".humidity").text("Humidity: " + cityObj.main.humidity);
          $(".wind").text("Wind Speed: " + cityObj.wind.speed);
          $(".uvindex").text("UV Index: " +  localStorage.getItem(uvKey));

          });
      });
});


