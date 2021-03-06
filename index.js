var notFound = new bootstrap.Modal(document.getElementById("notFound"));
var locationDenied = new bootstrap.Modal(document.getElementById("locationDenied"));

let weather = {
    apiKey: "fa314a00ae1a42dde73d24c64bfd3d5a",
    fetchWeather: function (city) {
      fetch("https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=metric&appid=" + this.apiKey)
        .then((response) => {
          if (!response.ok) {
            notFound.show();
          }
          return response.json();
        })
        .then((data) => this.displayWeather(data))
        
    },
    displayWeather: function (data) {
      const { name } = data;
      const { main, description } = data.weather[0];
      const { temp, humidity } = data.main;
      const { country, sunrise, sunset } = data.sys;
      const { deg, speed } = data.wind;
      const { timezone } = data;
      const windDirection = document.querySelector(".windDirection");
      document.querySelector(".city").innerText = name;
      document.querySelector(".icon").src = "/images/weather/" + main + ".gif"; 
      console.log(country);
      document.querySelector(".countryFlag").src = "https://countryflagsapi.com/svg/" + country;
      document.querySelector(".description").innerText = description;
      document.querySelector(".temp").innerText = parseInt(temp) + "°C";
      document.querySelector(".humidity").innerText = "Humidity: " + humidity + "%";
      document.querySelector(".wind").innerText = "Wind speed: " + speed + " km/h";
      windDirection.style.transform = `rotate(${deg}deg)`;
      windDirection.src = "images/weather/windDirection.png";
    },
    search: function () {
      this.fetchWeather(document.querySelector(".search-bar").value);
      document.getElementById('citySearch').value = '';
    },
};
  

document.querySelector(".search button").addEventListener("click", function () {
  weather.search();
});


document.querySelector(".search-bar").addEventListener("keyup", function (event) {
    if (event.key == "Enter") {
      weather.search();
    }
  });

var div  = document.getElementById("location");
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition, showError);
  } else {
    div.innerHTML = "The Browser Does not Support Geolocation";
  }
}

var currentCity = null;

function showPosition(position) {
  fetch("https://api.openweathermap.org/data/2.5/weather?lat=" + 
  position.coords.latitude + "&lon=" + position.coords.longitude + "&appid=fa314a00ae1a42dde73d24c64bfd3d5a")
    .then(response => response.json())
    .then(data => getCityname(data))
}

function getCityname(data) {
  const { name } = data;
  console.log(data);
  weather.fetchWeather(name);
}

function showError(error) {
  if(error.PERMISSION_DENIED){
    document.querySelector(".icon").src = "/images/locationSearch.gif";
    locationDenied.show();
  }
}

function counts(response) {
  document.getElementById('count').innerText = response.value;
}

getLocation();



