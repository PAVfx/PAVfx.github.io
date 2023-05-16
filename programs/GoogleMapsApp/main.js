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

  setMarkers(map);
} // end of initmap

// This markers[] array will contain 'location arrays' that contain:
// "Name"
// Latitude, Longitude
// Marker size (width, height)
const markers = [
  [ // Location Array 1
  "Vancouver", // Location Array 1's [Element 0]
  49.2827 // Location Array 1's [Element 1]
  -123.1207 // Location Array 1's [Element 2]
  (5,5) // Location Array 1's [Element 3]
  ],

  [ // Location Array 2
  "Burnaby", // same element setup as previous Location Array
  49.2488
  -122.9805
  (3,3)
  ],

  [ // Location Array 3
  "Surrey",
  49.1913
  -122.8490
  (3,3)
  ],
];

function setMarkers(map) {
  // Adds markers to the map.
  // Marker sizes are expressed as a Size of X,Y where the origin of the image
  // (0,0) is located in the top left of the image.
  // Origins, anchor positions and coordinates of the marker increase in the X
  // direction to the right and in the Y direction down.
  const image = {
    url: "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png",
    // This marker is 20 pixels wide by 32 pixels high.
    size: new google.maps.Size(20, 32),
    // The origin for this image is (0, 0).
    origin: new google.maps.Point(0, 0),
    // The anchor for this image is the base of the flagpole at (0, 32).
    anchor: new google.maps.Point(0, 32),
  };

for (let i = 0; i < markers.length; i++)
  {
  const currMarker = markers[i];

  // Create a Google Maps Marker
  var marker = new google.maps.Marker({
    position: {lat: currMarker[1], lng: currMarker[2]},
    map,
    icon: {scaledSize: currMarker[3]},
    title: currMarker[0] // Title "Name" of Location
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
} // end of the setMarkers method

window.initMap() = initMap();