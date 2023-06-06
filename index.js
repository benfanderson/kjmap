let distanceWalked

// Replace YOUR_API_KEY with your Google Maps API key

const apiKey = 'AIzaSyDaMCjuouGRFDlX5nussd03DzzIr8DU6eM';

const googleMapsUrl = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=geometry&callback=initMap`;

 

// Starting point coordinates

const startingPoint = { lat: -31.94878898970997, lng:  115.85445722330034 }; // HBF co-ordinates

 

// Create a map centered at the starting point

function initMap() {

  const map = new google.maps.Map(document.getElementById('map'), {

    center: startingPoint,

    zoom: 15,

  });

 

  // Generate a random angle for the route

  const randomAngle = Math.random() * 360;

 

  // Calculate the destination point using the starting point and random angle

  const destinationPoint = google.maps.geometry.spherical.computeOffset(

    new google.maps.LatLng(startingPoint.lat, startingPoint.lng),

    distanceWalked, // walking distance

    randomAngle

  );

 

  // Create a directions service object

  const directionsService = new google.maps.DirectionsService();

 

  // Request directions from starting point to destination point

  directionsService.route(

    {

      origin: startingPoint,

      destination: destinationPoint,

      travelMode: google.maps.TravelMode.WALKING,

    },

    (response, status) => {

      if (status === google.maps.DirectionsStatus.OK) {

        // Render the directions on the map

        const directionsRenderer = new google.maps.DirectionsRenderer();

        directionsRenderer.setMap(map);

        directionsRenderer.setDirections(response);

      } else {

        console.log('Directions request failed with status:', status);

      }

    }

  );

 

  let geocoder = new google.maps.Geocoder();

  let destLatLng= {lat: destinationPoint.lat(), lng:destinationPoint.lng()}

 

 

  geocoder

  .geocode({ location: destLatLng })

  .then((response) => {

    if (response.results[0]) {

      let streetNumber = response.results[0].address_components[0].long_name;

      let streetName = response.results[0].address_components[1].long_name;

      let suburb = response.results[0].address_components[2].long_name;

     let address = `${streetNumber} ${streetName}, ${suburb}`

      document.getElementById("address").innerHTML = `Final destination: ${address}`;

    } else {

      window.alert("No results found");

    }

  })

  .catch((e) => window.alert("Geocoder failed due to: " + e));

}

 

// Load the Google Maps API script asynchronously

function loadGoogleMapsScript() {

  const script = document.createElement('script');

  script.src = googleMapsUrl;

  script.defer = true;

  script.async = true;

  document.head.appendChild(script);

}

 

document.getElementById("submit").addEventListener("click", () => {

  distanceWalked = document.getElementById('distance').value;

  // Call the loadGoogleMapsScript function to load the Google Maps API

loadGoogleMapsScript();

});

 

// Get the input field

let input = document.getElementById("distance");

// Execute a function when the user presses a key on the keyboard

input.addEventListener("keypress", function(event) {

  // If the user presses the "Enter" key on the keyboard

  if (event.key === "Enter") {

    // Cancel the default action, if needed

    event.preventDefault();

    // Trigger the button element with a click

    document.getElementById("submit").click();

  }

});