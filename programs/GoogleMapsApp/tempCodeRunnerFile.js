  map.addListener("click", (event) => 
  { // addListener method expects the event type as the first argument
    if (event.ctrlKey) 
    { // Check if Ctrl key is pressed
      setUserClickMarker( event.latLng); // 'latLng' which will be to set Markers on the latitude and longitude where the user "clicked"
    }
  });