$(document).ready(function () {
    var city;
    var prevSearch = [];
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
    function searchCity() {
        var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=c1ba9a1d8d332b1ef324e57e7f47dbdf";
        $.ajax({
            url: queryURL,
            type: "GET"
        }).then(function (res) {
            console.log(res);
        });
    };
    $("#search").on("click", function () {
        city = $("#city-name").val();
        searchCity();
        $("#city-name").val("");
        prevSearch.unshift(city);
        localStorage.setItem("cities", JSON.stringify(prevSearch));
        writePrev();
    });

    $(document).on("click", ".card", function () {
        city = $(this).text().trim();
        searchCity();
    });
    writePrev();
});