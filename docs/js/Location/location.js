var script = document.createElement("script");
script.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyCFqTeqJLwx_5QgUf2nem_Q_fBnRUqdFbI";
script.async = "async";
script.defer = "defer";
document.head.appendChild(script);

var mapHolder;
var messageHolder;
function getLocation(mapHolderID, messageHolderID) {
    mapHolder = document.getElementById(mapHolderID);
    messageHolder = document.getElementById(messageHolderID);
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
        messageHolder.innerHTML = "Geolocation is not supported by this browser.";
    }
}

function showPosition(position) {
    lat = position.coords.latitude;
    lon = position.coords.longitude;
    latlon = new google.maps.LatLng(lat, lon)
    mapHolder.style.display = "block";

    var myOptions = {
        center:latlon,zoom:14,
        mapTypeId:google.maps.MapTypeId.ROADMAP,
        mapTypeControl:false,
        navigationControlOptions:{style:google.maps.NavigationControlStyle.SMALL}
    }

    var map = new google.maps.Map(mapHolder, myOptions);
    var marker = new google.maps.Marker({position:latlon,map:map,title:"You are here!"});
}

function showError(error) {
    switch(error.code) {
        case error.PERMISSION_DENIED:
        messageHolder.innerHTML = "User denied the request for Geolocation."
        break;
        case error.POSITION_UNAVAILABLE:
        messageHolder.innerHTML = "Location information is unavailable."
        break;
        case error.TIMEOUT:
        messageHolder.innerHTML = "The request to get user location timed out."
        break;
        case error.UNKNOWN_ERROR:
        messageHolder.innerHTML = "An unknown error occurred."
        break;
    }
}
