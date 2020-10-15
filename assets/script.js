//array of cities:
var cities = [];
// This .on("click") function will trigger the AJAX Call
$("#search-button").on("click", function (event) {
    // Preventing the submit button from trying to submit the form
    event.preventDefault();

    $(".hide").removeClass("hide");
    // Here we grab the text from the input box
    var city = $("#city-input").val().trim();
    var isAdded = false;
    for (var i = 0; i < cities.length; i++) {
        if (cities[i].toLowerCase() === city.toLowerCase()) {
            console.log("city added");
            isAdded = true;

        }
    }

    if (isAdded === false) {
        //add new city input to cities array
        cities.push(city);

        // //save cities array
        localStorage.setItem("cities", JSON.stringify(cities));
        renderButtons();
    }


    // Here we construct our URL
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=ae114f10e0e43d04009e934a0983ff33";

    //Ajax call
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);
        localStorage.setItem("response", JSON.stringify(response));

        pastingcurrent(response);
        var lon = response.coord.lon;
        var lat = response.coord.lat;
        console.log(lon);
        console.log(lat);
        var UVquery = "http://api.openweathermap.org/data/2.5/uvi?lat=" + lat + "&" + "lon=" + lon + "&appid=ae114f10e0e43d04009e934a0983ff33";
        $.ajax({
            url: UVquery,
            method: "GET"
        }).then(function (UVresponse) {
            console.log(UVresponse);
            $("#UV").text("UV Index: ");
            $("#UVnumber").text(UVresponse.value);
            if (parseInt(UVresponse.value) < 3) {
                $("#UVnumber").addClass("green");
                $("#UVnumber").removeClass("yellow");
                $("#UVnumber").removeClass("orange");
                $("#UVnumber").removeClass("red");
                $("#UVnumber").removeClass("purple");

            } else if (parseInt(UVresponse.value) >= 3 && parseInt(UVresponse.value) < 6) {
                $("#UVnumber").addClass("yellow");
                $("#UVnumber").removeClass("green");
                $("#UVnumber").removeClass("orange");
                $("#UVnumber").removeClass("red");
                $("#UVnumber").removeClass("purple");

            } else if (parseInt(UVresponse.value) >= 6 && parseInt(UVresponse.value) < 8) {
                $("#UVnumber").addClass("orange");
                $("#UVnumber").removeClass("green");
                $("#UVnumber").removeClass("yellow");
                $("#UVnumber").removeClass("red");
                $("#UVnumber").removeClass("purple");
            } else if (parseInt(UVresponse.value) >= 8 && parseInt(UVresponse.value) < 11) {
                $("#UVnumber").addClass("red");
                $("#UVnumber").removeClass("green");
                $("#UVnumber").removeClass("yellow");
                $("#UVnumber").removeClass("orange");
                $("#UVnumber").removeClass("purple");
            } else if (parseInt(UVresponse.value) >= 11) {
                $("#UVnumber").addClass("purple");
                $("#UVnumber").removeClass("green");
                $("#UVnumber").removeClass("yellow");
                $("#UVnumber").removeClass("orange");
                $("#UVnumber").removeClass("red");

            }


            localStorage.setItem("UVresponse", JSON.stringify(UVresponse));



        });

    });

    var queryURL5days = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=imperial&appid=ae114f10e0e43d04009e934a0983ff33";
    $.ajax({
        url: queryURL5days,
        method: "GET"
    }).then(function (response5days) {
        console.log(response5days);
        console.log(response5days.list[0]);
        localStorage.setItem("response5days", JSON.stringify(response5days));
        pasting5days(response5days);

    });

    //var queryURLuv = "http://api.openweathermap.org/data/2.5/uvi?lat={lat}&lon={lon}&appid={API key}
});

var retrievedCities = JSON.parse(localStorage.getItem("cities"));
console.log(retrievedCities);


function renderButtons() {
    // Deleting the city buttons prior to adding new movie buttons
    // if not, we will have repeat buttons)
    $("#city-button").empty();
    for (var i = 0; i < cities.length; i++) {
        //create button element for retrievedCities
        var cityButton = $("<button>");
        //add class city (script for later click event) to each button
        cityButton.addClass("city");
        //add class button (css) to each button
        cityButton.addClass("button");
        //add data-name attribute to each city button
        cityButton.attr("data-name", cities[i]);
        //add text which is the city name from cities array to each city button
        cityButton.text(cities[i]);
        //append button to HTML
        $("#city-button").append(cityButton);
    };

};

//initial search will call renderButtons with using cities list, also save the new cities to local storage
//then retrieve that list and save it to retrievedCities
//if retrievedCities is not empty then call rendeButtons again when user refresh page
//let cities = retrieveaCities because renderButtons used cities list
if (retrievedCities) {
    cities = retrievedCities;
    renderButtons();
};

var savedResponse = JSON.parse(localStorage.getItem("response"));

if (savedResponse) {
    response = savedResponse
    pastingcurrent(response);
    $(".hide").removeClass("hide");

}

var savedResponse5day = JSON.parse(localStorage.getItem("response5days"));

if (savedResponse5day) {
    response5days = savedResponse5day;
    pasting5days(response5days);
}


//add click event to all elements with class "city"
//when city button is click run displayCityWeather function to show that city's weather info
$(document).on("click", ".city", displayCityweather);
//function to get API info for each city button
function displayCityweather() {
    var city = $(this).attr("data-name");
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=ae114f10e0e43d04009e934a0983ff33";
    //Ajax call
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response)
        pastingcurrent(response);

        var lon = response.coord.lon;
        var lat = response.coord.lat;
        console.log(lon);
        console.log(lat);
        var UVquery = "http://api.openweathermap.org/data/2.5/uvi?lat=" + lat + "&" + "lon=" + lon + "&appid=ae114f10e0e43d04009e934a0983ff33";
        $.ajax({
            url: UVquery,
            method: "GET"
        }).then(function (UVresponse) {
            console.log(UVresponse);
            $("#UV").text("UV Index: ");
            $("#UVnumber").text(UVresponse.value);
            if (parseInt(UVresponse.value) < 3) {
                $("#UVnumber").addClass("green");
                $("#UVnumber").removeClass("yellow");
                $("#UVnumber").removeClass("orange");
                $("#UVnumber").removeClass("red");
                $("#UVnumber").removeClass("purple");

            } else if (parseInt(UVresponse.value) >= 3 && parseInt(UVresponse.value) < 6) {
                $("#UVnumber").addClass("yellow");
                $("#UVnumber").removeClass("green");
                $("#UVnumber").removeClass("orange");
                $("#UVnumber").removeClass("red");
                $("#UVnumber").removeClass("purple");

            } else if (parseInt(UVresponse.value) >= 6 && parseInt(UVresponse.value) < 8) {
                $("#UVnumber").addClass("orange");
                $("#UVnumber").removeClass("green");
                $("#UVnumber").removeClass("yellow");
                $("#UVnumber").removeClass("red");
                $("#UVnumber").removeClass("purple");
            } else if (parseInt(UVresponse.value) >= 8 && parseInt(UVresponse.value) < 11) {
                $("#UVnumber").addClass("red");
                $("#UVnumber").removeClass("green");
                $("#UVnumber").removeClass("yellow");
                $("#UVnumber").removeClass("orange");
                $("#UVnumber").removeClass("purple");
            } else if (parseInt(UVresponse.value) >= 11) {
                $("#UVnumber").addClass("purple");
                $("#UVnumber").removeClass("green");
                $("#UVnumber").removeClass("yellow");
                $("#UVnumber").removeClass("orange");
                $("#UVnumber").removeClass("red");
            }


        });

    });
    //UV
    // 

    var queryURL5days = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=imperial&appid=ae114f10e0e43d04009e934a0983ff33";
    $.ajax({
        url: queryURL5days,
        method: "GET"
    }).then(function (response5days) {
        console.log(response5days);
        console.log(response5days.list[0]);

        pasting5days(response5days);
    });

}

function pasting5days(response5days) {
    $("#forecast").text("5-Day Forcast:");
    $(".date1").text(response5days.list[5].dt_txt);
    $(".date2").text(response5days.list[13].dt_txt);
    $(".date3").text(response5days.list[21].dt_txt);
    $(".date4").text(response5days.list[29].dt_txt);
    $(".date5").text(response5days.list[37].dt_txt);

    $(".temp1").text("Temp: "+response5days.list[5].main.temp + "°F");
    $(".temp2").text("Temp: "+response5days.list[13].main.temp + "°F");
    $(".temp3").text("Temp: "+response5days.list[21].main.temp + "°F");
    $(".temp4").text("Temp: "+response5days.list[29].main.temp + "°F");
    $(".temp5").text("Temp: "+response5days.list[37].main.temp + "°F");

    $(".humid1").text("Humidity: "+response5days.list[5].main.humidity + "%");
    $(".humid2").text("Humidity: "+response5days.list[13].main.humidity + "%");
    $(".humid3").text("Humidity: "+response5days.list[21].main.humidity + "%");
    $(".humid4").text("Humidity: "+response5days.list[29].main.humidity + "%");
    $(".humid5").text("Humidity: "+response5days.list[37].main.humidity + "%");

    var icon1 = "http://openweathermap.org/img/wn/" + response5days.list[5].weather[0].icon + ".png"
    $("#icon1").attr("src", icon1);
    var icon2 = "http://openweathermap.org/img/wn/" + response5days.list[13].weather[0].icon + ".png"
    $("#icon2").attr("src", icon2);
    var icon3 = "http://openweathermap.org/img/wn/" + response5days.list[21].weather[0].icon + ".png"
    $("#icon3").attr("src", icon3);
    var icon4 = "http://openweathermap.org/img/wn/" + response5days.list[29].weather[0].icon + ".png"
    $("#icon4").attr("src", icon4);
    var icon5 = "http://openweathermap.org/img/wn/" + response5days.list[37].weather[0].icon + ".png"
    $("#icon5").attr("src", icon5);
}


function pastingcurrent(response) {
    var date = moment().format(" DD/MM/YYYY");
    var iconCurrent = "http://openweathermap.org/img/wn/" + response.weather[0].icon + ".png"
    $("#iconCurrent").attr("src", iconCurrent)
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

}

