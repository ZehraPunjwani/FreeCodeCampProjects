$(document).ready(function() {
	$.ajaxSetup({
		cache: false
	});
	var lat, lon;
	myGeoLocationFunction(lat, lon);
	myWeatherFunction(lat, lon);
});

function myGeoLocationFunction(lat, lon) {
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(function(position) {
			lat = position.coords.latitude;
			lon = position.coords.longitude;
			// console.log("Latitde: " + lat + " Longitude: " + lon);
		});
	} else {
		alert("Geolocation is not supported by this browser.");
	}
}

function myWeatherFunction(lat, lon){
	var api = "https://api.darksky.net/forecast/2a164244b53ebfb183225014749bf7c1/" + lat + ", " + lon;
	$.getJSON(api, function(data) {
		console.log(data);
	});
}

function myChangeFunction() {
	var data = document.getElementById("weatherMetric").innerHTML;
	var changeTo;
	if (data === "F") {
		changeTo = "C";
	} else {
		changeTo = "F";
	}
	document.getElementById("weatherMetric").innerHTML = changeTo;
}