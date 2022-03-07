
let weather = {
    apiKey: "fa314a00ae1a42dde73d24c64bfd3d5a",
    fetchWeather: function (city) {
      fetch(
        "https://api.openweathermap.org/data/2.5/weather?q=" +
          city +
          "&units=metric&appid=" +
          this.apiKey
      )
        .then((response) => {
          if (!response.ok) {
            /*alert("Can't find the city");*/
            //document.querySelector(".error").innerText = "ERROR: Can't find the city, (Refresh page to search)";
            document.body.innerHTML = "ERROR: Can't find the city, (Refresh page to search)";
            throw new Error("Can't find the city");
          }
          return response.json();
        })
        .then((data) => this.displayWeather(data));
    },
    displayWeather: function (data) {
      const { name } = data;
      const { icon, description } = data.weather[0];
      const { temp, humidity } = data.main;
      const { speed } = data.wind;
      document.querySelector(".city").innerText = name;
      document.querySelector(".icon").src =
        "https://openweathermap.org/img/wn/" + icon + ".png";
      document.querySelector(".description").innerText = description;
      document.querySelector(".temp").innerText = parseInt(temp) + "°C";
      document.querySelector(".humidity").innerText =
        "Humidity: " + humidity + "%";
      document.querySelector(".wind").innerText =
        "Wind speed: " + speed + " km/h";
      document.querySelector(".weather").classList.remove("loading");
    },
    search: function () {
      this.fetchWeather(document.querySelector(".search-bar").value);
    },
  };
  
  document.querySelector(".search button").addEventListener("click", function () {
    weather.search();
  });
  
  document
    .querySelector(".search-bar")
    .addEventListener("keyup", function (event) {
      if (event.key == "Enter") {
        weather.search();
      }
    });
  
    // var div  = document.getElementById("location");
    // function getLocation() {
    //   if (navigator.geolocation) {
    //     navigator.geolocation.getCurrentPosition(showPosition, showError);
    //   } else {
    //     div.innerHTML = "The Browser Does not Support Geolocation";
    //   }
    // }
    
    // function showPosition(position) {
    //   fetch("https://api.openweathermap.org/data/2.5/weather?lat=" + 
    //   position.coords.latitude + "&lon=" + position.coords.longitude + "&appid=fa314a00ae1a42dde73d24c64bfd3d5a")
    //     .then(response => response.json())
    //     .then(data => console.log(data)),
    //   search: function () {
    //     this.fetchWeather(document.querySelector(".search-bar").value);
    //   }
      
    // }
    
    // function showError(error) {
    //   if(error.PERMISSION_DENIED){
    //       div.innerHTML = "The User have denied the request for Geolocation.";
    //   }
    // }
    // getLocation();

  weather.fetchWeather("new york");


