function buildCurrent(current,hourly,container) {
    var today = new Date();
    $("<p>").text("Current Conditions for today, " + today.getDate() + "/" + (parseInt(today.getMonth()) + 1)).appendTo(container);
    $("<i>").addClass("wi").addClass("wi-forecast-io-" + current.icon).addClass("current").appendTo(container);
    $("<p>").text("Temperature " + current.temperature + " C").appendTo(container);
    $("<p>").text(current.summary).appendTo(container);
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
            $("<td>").text(hourlyData.cloudCover == 1 ? "100%" : hourlyData.cloudCover.toString().split(".")[1] + "%").appendTo(hourNode);
            $("<td>").text(hourlyData.temperature + " C").appendTo(hourNode);
            $("<td>").text(hourlyData.windSpeed + " km/h").appendTo(hourNode);
            $("<i>").addClass("wi").addClass("wi-forecast-io-" + hourlyData.icon).appendTo($("<td>")).appendTo(hourNode);
            $("<td>").text(hourlyData.summary).appendTo(hourNode);
            hourNode.appendTo(table);
        }
    }
    table.appendTo(container);
}