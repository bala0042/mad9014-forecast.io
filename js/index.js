var scriptsLoaded = 0;

document.addEventListener("DOMContentLoaded", function(){
  
	var css = document.createElement("link");
	css.setAttribute("rel", "stylesheet");
	css.setAttribute("href", "css/main.css");
	css.addEventListener("load", loadCount);
	document.querySelector("head").appendChild(css);

	var jq = document.createElement("script");
	jq.addEventListener("load", loadCount);
	jq.setAttribute("src","//ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js");
	document.querySelector("head").appendChild(jq);
	
});

function buildWidget(container){
	var devKey = '00e2713e9e89411fbfda002f1abcd5dd'; // https://api.forecast.io/forecast/00e2713e9e89411fbfda002f1abcd5dd/37.8267,-122.423
	var latLon = '45.348391,-75.757045';
    $.ajax({
        url: "https://api.forecast.io/forecast/" + devKey + "/" + latLon + "?units=ca",
        type: "GET",
        dataType: "jsonp",
        success: function(response) {
            displayWidget(response.currently,response.hourly,container);
            console.log(response);
        },
        error: function() {
            alert("An error occurred");
        }
    })
}

var monthNames = ["January", "February", "March", "April", "May", "June", // from http://stackoverflow.com/a/1643468
  "July", "August", "September", "October", "November", "December"
];

function displayWidget(current,hourly,container) {
    var today = new Date();
    $("<p>").text(monthNames[today.getMonth()] + " " + today.getDate() ).appendTo(container);
    $("<i>").addClass("wi").addClass("wi-forecast-io-" + current.icon).addClass("current").appendTo(container);
    $("<b>").text(" " + current.temperature + " \xB0C - " + current.summary).appendTo(container);
    var table = $("<table>");
    var today = new Date();
    for (var i = 0; i < hourly.data.length; i++) {
        var hourlyData = hourly.data[i];
        var time = new Date(hourlyData.time * 1000);
        if (time.getDate() === today.getDate()) {
            time = time.getHours() + ":00";
            var hourNode = $("<tr>");
            $("<td>").text(time).appendTo(hourNode);
            $("<td>").text(hourlyData.humidity.toString().split(".")[1] + "%").appendTo(hourNode);
            $("<td>").text(hourlyData.cloudCover == 1 ? "100%" : parseInt(hourlyData.cloudCover.toString().split(".")[1],10) + "%").appendTo(hourNode);
            $("<td>").text(hourlyData.temperature + " C").appendTo(hourNode);
            $("<td>").text(hourlyData.windSpeed + " km/h").appendTo(hourNode);
            $("<td>").html($("<i>").addClass("wi").addClass("wi-forecast-io-" + hourlyData.icon)).appendTo(hourNode);
            $("<td>").text(hourlyData.summary).appendTo(hourNode);
            hourNode.appendTo(table);
        }
    }
    table.appendTo(container);
}

function loadCount(){
  scriptsLoaded++;
    if(scriptsLoaded === 2){
      //call the function in My widget script to load the JSON and build the widget
      buildWidget(".weather-forecast");
      console.log("both scripts loaded");
    }
}