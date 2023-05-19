// Map ID: 1e91fe057ddd1491
// API ID: AIzaSyCDGLc4wLupZis_qoK_QkqvKmjvPml-CFA

var map;

async function initMap() 
{
  const { Map } = await google.maps.importLibrary("maps");

  map = new Map(document.getElementById("map"), { // create map
    center: { lat: 49.2827, lng: -123.1207 }, // center it at Vancouver: 49.2827° N, 123.1207° W (West = negative, South = negative)
    zoom: 9.8,
    mapId: '1e91fe057ddd1491', 
  });
  
  // pass that created map to this function
  setMarkers(map); 
} // end of initmap

// This markers[] array will contain 'location arrays' that contain:
// "Name"
// Latitude, Longitude
// Marker size (width, height)

const markers = [ // we will add a marker at each of the following location array
  [ // Location Array 1 
  "Vancouver", // Location Array 1's [Element 0]
  49.2827, // Location Array 1's [Element 1]
  -123.1207, // Location Array 1's [Element 2]
  25,
  37 // Location Array 1's [Element 3]
  ],

  [ // Location Array 2
  "Burnaby", // same element setup as previous Location Array
  49.2488,
  -122.9805,
  23,
  30
  ],

  [ // Location Array 3
  "Surrey",
  49.1913,
  -122.8490,
  23,
  30
  ],

  [ // Location Array 4
  "Richmond",
  49.1666,
  -123.1336,
  23,
  30
  ],

  [ // Location Array 5
  "Coquitlam",
  49.2838,
  -122.7932,
  23,
  30
  ],

  [ // Location Array 6
  "Abbotsford",
  49.0504,
  -122.3045,
  23,
  30
  ],

  [ // Location Array 7
  "Langley",
  49.1042,
  -122.6604,
  23,
  30
  ],

  [ // Location Array 8
  "White Rock",
  49.0253,
  -122.8030,
  23,
  30
  ],

];


// the actual function that will add markers to our map
function setMarkers(map) 
{
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

  // Shapes define the clickable region of the icon. The type defines an HTML
  // <area> element 'poly' which traces out a polygon as a series of X,Y points.
  // The final coordinate closes the poly by connecting to the first coordinate.
  const shape = {
    coords: [1, 1, 1, 20, 18, 20, 18, 1],
    type: "poly",
  };

for (let i = 0; i < markers.length; i++)
  {
  const currMarker = markers[i];

  // Create a Google Maps Marker
 const marker = new google.maps.Marker({
    position: {lat: currMarker[1], lng: currMarker[2]},
    map,
    icon: 
    {
      url: image.url,
      // This marker is 20 pixels wide by 32 pixels high.
      size: new google.maps.Size(currMarker[3], currMarker[4])
    }, // scaledSize: new google.maps.Size(currMarker[3])
    shape: shape,
    title: currMarker[0], // Title "Name" of Location
    zIndex: 2,
  });

  // Info Window Popup Feature
  const infowindow = new google.maps.InfoWindow({
    content: 
    "<div>" + currMarker[0] + "<br>Latitude: " + currMarker[1] + "<br>Longitude: " + currMarker[2] + "</div>",
  });

  // Then lets have our event listener attached to that Google Maps Marker
  marker.addListener("click", () => {
    infowindow.open(map, marker);
  });

  } // end of for loop
} // end of the setMarkers method

window.initMap() = initMap();

/* 



*/