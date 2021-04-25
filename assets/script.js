$(document).ready(function () {
    var prevSearch = [];
    function writeWeather() {
        searchCity(prevSearch[prevSearch.length - 1])
    }
    function writePrev() {
        $("#prev-search").html("<li id='new-card-here'></li>");
        var storedSearch = JSON.parse(localStorage.getItem("cities"));
        if (storedSearch != null) {
            prevSearch = storedSearch;
        }
        prevSearch.reverse();
        for (i = 0; i < prevSearch.length; i++) {
            var newCard = "<li><div class='card'><div class='card-body'><h5>" + prevSearch[i] + "</h5></div></div></li>";
            var newCardHere = $("#new-card-here");
            newCardHere.prepend(newCard);
        };
    };
    function searchCity(city) {
        var lat;
        var lon;
        var singleURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=c1ba9a1d8d332b1ef324e57e7f47dbdf";

        $.ajax({
            url: singleURL,
            type: "GET"
        }).then(function (res) {
            lat = res.coord.lat
            lon = res.coord.lon
            console.log(res);
            $("#date").text(convertDate(res.dt + res.timezone + 14400))
            $("#city-name").text(res.name)
            $("#temp").text("Tempurature: " + ((res.main.temp).toFixed(1)) + "° F")
            $("#hum").text("Humidity: " + res.main.humidity + "%")
            $("#wind-speed").text("Wind Speed: " + res.wind.speed + " mph")
            $("#icon").attr("src", "http://openweathermap.org/img/w/" + res.weather[0].icon + ".png")
            var weeklyURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&units=imperial&exclude=minutely,hourly,alerts&appid=c1ba9a1d8d332b1ef324e57e7f47dbdf";
            $.ajax({
                url: weeklyURL,
                type: "GET"
            }).then(function (res) {
                console.log(res)
                $("#weekly").html("<div id='new-weekday-here'></div>")
                $("#uv").text("UV Index: " + res.current.uvi)
                for (i = 5; i > 0; i--) {
                    var newCard = "<div class='col-sm-3'><div class='card text-center'><div class='card-body'><h5 class='card-title'>" + getWeekday(res.daily[i].dt) + "</h5><img src=" + "http://openweathermap.org/img/w/" + res.daily[i].weather[0].icon + ".png" + " alt='icon'><p class='card-text'>" + (res.daily[i].temp.max.toFixed(1)) + "° F" +"</p><p class='card-text'>" + res.daily[i].humidity + "%" + "</p></div></div></div>"
                    var newCardHere = $("#new-weekday-here");
                    newCardHere.prepend(newCard)
                }
            })
        });
        console.log(lat, lon)



    };

    $("#search").on("click", function () {
        searchCity($("#city-input").val());
        prevSearch.unshift($("#city-input").val());
        $("#city-input").val("");
        localStorage.setItem("cities", JSON.stringify(prevSearch));
        writePrev();

    });

    $(document).on("click", ".card", function () {
        searchCity($(this).text().trim());
    });

    function convertDate(timestamp) {
        var a = new Date(timestamp * 1000);
        return a.toLocaleString("en-US")
    }

    function getWeekday(timestamp) {
        var a = new Date(timestamp * 1000);
        return a.toLocaleDateString('en-US', { weekday: 'long' })
    }

    writePrev();
    writeWeather();
    console.log(prevSearch)
});