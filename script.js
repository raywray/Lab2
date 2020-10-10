const key = "10bda9a9c8da5389acaa9950ae189244"

document.getElementById("weatherSubmit").addEventListener("click", function(event) {
  event.preventDefault();
  const value = document.getElementById("weatherInput").value;
  if (value === "")
    return;
  fetchData(value);
  getForecastData(value);
});

function fetchData(value) {
  const url = "http://api.openweathermap.org/data/2.5/weather?q=" + value + ",US&units=imperial" + "&APPID=10bda9a9c8da5389acaa9950ae189244";
   fetch(url)
     .then(function(response) {
       return response.json();
     }).then(function(json) {
       let results = "";

        results += "<div class='current-container'>";

         results += '<h2>Weather in ' + json.name + "</h2>";
         for (let i=0; i < json.weather.length; i++) {
     results += '<img src="http://openweathermap.org/img/w/' + json.weather[i].icon + '.png"/>';
         }
         results += '<h2>' + json.main.temp + " &deg;F</h2>"
         results += "<p>"
         for (let i=0; i < json.weather.length; i++) {
     results += json.weather[i].description
     if (i !== json.weather.length - 1)
       results += ", "
         }
         results += "</p>";

         results +="</div>";
         document.getElementById("weatherResults").innerHTML = results;
     });
}

function getForecastData(value) {
  const url2 = "http://api.openweathermap.org/data/2.5/forecast?q=" + value + ", US&units=imperial" + "&APPID=10bda9a9c8da5389acaa9950ae189244";
  fetch(url2)
    .then(function(response) {
      return response.json();
    }).then(function(json) {
      let forecast = "";
            for (let i=0; i < json.list.length; i++) {
        forecast += "<div class ='forecast-container'>";
          forecast += "<div class = 'forecast'>";
            forecast += "<div class ='forecast-title'>";
              forecast += "<h2>" + moment(json.list[i].dt_txt).format('MMMM Do YYYY, h:mm:ss a') + "</h2>";
            forecast += "</div>"
            forecast += "<div class ='temperature'>";
              forecast += "<p>Temperature: " + json.list[i].main.temp + "</p>";
            forecast += "</div>"
              forecast += '<img class="image-class" src="http://openweathermap.org/img/w/' + json.list[i].weather[0].icon + '.png"/>'
          forecast += "</div>";
        forecast += "</div>";
        forecast += "<div class='whitespace'></div>"
            }
            document.getElementById("forecastResults").innerHTML = forecast;
    });
}
