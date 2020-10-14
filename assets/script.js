//array of cities:
var cities = [];
// This .on("click") function will trigger the AJAX Call
$("#search-button").on("click", function (event) {
    // Preventing the submit button from trying to submit the form
    event.preventDefault();

    // Here we grab the text from the input box
    var city = $("#city-input").val().trim();

    //add new city input to cities array
    cities.push(city);

    // //save cities array
    localStorage.setItem("cities", JSON.stringify(cities));
    renderButtons();

    // Here we construct our URL
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=ae114f10e0e43d04009e934a0983ff33";

    //Ajax call
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);

        var date = response.dt;
        var cityName = response.name;

        console.log(cityName)
        console.log(date)
        $("#city-name").text(cityName + date);

        var temper = response.main.temp;
        console.log(temper);
        $("#temperature").text(temper + "°F");

        var humid = response.main.humidity;
        console.log(humid);
        $("#humidity").text("Humidity: " + humid + "%");
        var wind = response.wind.speed;
        console.log(wind);
        $("#wind-speed").text("Wind Speed: " + wind + " MPH");

    });

    var queryURL5days = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=imperial&appid=ae114f10e0e43d04009e934a0983ff33";
    $.ajax({
        url: queryURL5days,
        method: "GET"
    }).then(function (response5days) {
        console.log(response5days);
        console.log(response5days.list[0]);

        $(".date1").text(response5days.list[5].dt_txt);
        $(".date2").text(response5days.list[13].dt_txt);
        $(".date3").text(response5days.list[21].dt_txt);
        $(".date4").text(response5days.list[29].dt_txt);
        $(".date5").text(response5days.list[37].dt_txt);

        $(".temp1").text(response5days.list[5].main.temp + "°F");
        $(".temp2").text(response5days.list[13].main.temp + "°F");
        $(".temp3").text(response5days.list[21].main.temp + "°F");
        $(".temp4").text(response5days.list[29].main.temp + "°F");
        $(".temp5").text(response5days.list[37].main.temp + "°F");

        $(".humid1").text(response5days.list[5].main.humidity + "%");
        $(".humid2").text(response5days.list[13].main.humidity + "%");
        $(".humid3").text(response5days.list[21].main.humidity + "%");
        $(".humid4").text(response5days.list[29].main.humidity + "%");
        $(".humid5").text(response5days.list[37].main.humidity + "%");
        // $("#five-day").text(JSON.stringify(response));
    });

    // var queryURLuv= "http://api.openweathermap.org/data/2.5/uvi?lat={lat}&lon={lon}&appid={API key}
});