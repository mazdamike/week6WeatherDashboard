for (var i = 0; i < localStorage.length; i++) {
  var cityInStorage = $("<li class='list-group-item'>" + localStorage.getItem(localStorage.key(i)) + "</li>");
  $("#cityList").append(cityInStorage);
}


$("button").on("click", function() {
    event.preventDefault();
 
    var city = $("#city").val();
    var APIKey = "3c71682f4f047f87294d0577dc780b8d";
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?" +
    "q=" + city + "&appid=" + APIKey;
    
    

    // Append cities to the list, add to local storage, and push to the cities array
    var cityListItem = $("<li class='list-group-item'>" + city + "</li>");
    $("#cityList").prepend(cityListItem);
    localStorage.setItem(city, city);
    

    $.ajax({
        url: queryURL,
        method: "GET"
      })
        
        .then(function(response) {
              
          console.log(response);
          // Convert the temperature in kelvin to fahrenheit
          var tempF = (response.main.temp - 273.15) * 1.80 + 32;
          var condIcon = response.weather[0].icon;
          var w = "http://openweathermap.org/img/wn/" + condIcon + ".png";


          // add temp content to html
          $(".city").html("<h2>" + response.name + " " + moment().format("L") + " " + "<img src= '" + w + "'></img></h2>");
          $(".tempF").text("Temperature (F): " + tempF.toFixed(2));
          $(".humidity").text("Humidity: " + response.main.humidity);
          $(".wind").text("Wind Speed: " + response.wind.speed);
         
          
    
          
          
          
    
          // Log the data in the console as well
          console.log("Temperature (F): " + tempF);
          console.log("Wind Speed: " + response.wind.speed);
          console.log("Humidity: " + response.main.humidity);
          
        });

});














