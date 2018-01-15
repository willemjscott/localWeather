var url;
var lat;
var long;
var place;
var weather;
var tempCelc;
var icon;
var data = [];
var tempUnit = "C";
$(document).ready(function () {
    navigator.geolocation.getCurrentPosition(position);

    function position(coordinates) {
        lat = coordinates.coords.latitude;
        long = coordinates.coords.longitude;
        url = "https://fcc-weather-api.glitch.me/api/current?lat=" + lat + "&lon=" + long;
        $.getJSON(url, function (json) {
            data = json;
            console.log(data);
            place = json.name;
            weather = json.weather[0].main;
            tempCelc = json.main.temp;
            tempFar = Math.round((tempCelc * 1.8) + 32);
            icon = json.weather[0].icon;
            $("#name").html(place);
            $("#weather").html(weather);
            $("#temp").html(tempCelc + String.fromCharCode(176) + tempUnit);
            $("#icon").html('<img src="' + icon + '" alt="' + weather + '" id="icon-image">');
            $("#temp").on("click", function () {
                if (tempUnit === "C") {
                    tempUnit = "F";
                    $("#temp").html(tempFar + String.fromCharCode(176) + tempUnit);
                } else if (tempUnit === "F") {
                    tempUnit = "C"
                    $("#temp").html(tempCelc + String.fromCharCode(176) + tempUnit);
                };
            });
        });
    };
});