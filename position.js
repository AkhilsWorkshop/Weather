
var div  = document.getElementById("location");
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition, showError);
  } else {
    div.innerHTML = "The Browser Does not Support Geolocation";
  }
}

function showPosition(position) {
  div.innerHTML = "Latitude: " + position.coords.latitude + "<br>Longitude: " + position.coords.longitude;
  fetch("https://api.openweathermap.org/data/2.5/weather?lat=" + 
  position.coords.latitude + "&lon=" + position.coords.longitude + "&appid=fa314a00ae1a42dde73d24c64bfd3d5a")
    .then(response => response.json())
    .then(data =>
      console.log(data))
  
}

function showError(error) {
  if(error.PERMISSION_DENIED){
      div.innerHTML = "The User have denied the request for Geolocation.";
  }
}
getLocation();