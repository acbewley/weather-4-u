$(document).ready(function () {
    $("#search").on("click", function () {
        var city = $("#city-name").val();
        $("#city-name").val("");
        var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=c1ba9a1d8d332b1ef324e57e7f47dbdf"
        $.ajax({
            url: queryURL,
            type: "GET"
        }).then(function (res) {
            console.log(res)
        });
    });
});