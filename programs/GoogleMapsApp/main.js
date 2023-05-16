// Map ID: 1e91fe057ddd1491
// API ID: AIzaSyCDGLc4wLupZis_qoK_QkqvKmjvPml-CFA

var map;

async function initMap() {
  const { Map } = await google.maps.importLibrary("maps");

  map = new Map(document.getElementById("map"), {
    center: { lat: 49.2827, lng: -123.1207 }, // Vancouver: 49.2827° N, 123.1207° W (West = negative, South = negative)
    zoom: 10,
    mapId: '1e91fe057ddd1491', 
  });

// This markers[] array will contain location array that contain:
// "Name"
// Latitude, Longitude
// Marker size (width, height)
const markers = [
  [
  "Vancouver",
  49.2827
  -123.1207
  (5,5)
  ],
  [
  "Burnaby",
  49.2488
  -122.9805
  (3,3)
  ],
  [
  "Surrey",
  49.1913
  -122.8490
  (3,3)
  ],
]

for (let i = 0; i < markers.length; i++){
  const currMarker = markers[i];

  // Google Maps Marker set as a constant
  var marker = new google.maps.Marker({
    position: {lat: currMarker[1], lng: currMarker[2]},
    map,
    title: currMarker[0],
  });

  // Info Window Popup Feature
  const infowindow = new google.maps.InfoWindow({
    content: currMarker[0], // Title
    ariaLabel: "Vancouver",
  });

  // Then lets have our event listener attached to that Google Maps Marker
  marker.addListener("click", () => {
    infowindow.open({
      anchor: marker,
      map,
    });
  });

} // end of for loop

} // end of initmap

initMap();