// main.js

// Create a Leaflet map instance and specify the center coordinates and initial zoom level
var map = L.map('map').setView([51.505, -0.09], 13);

// Add a tile layer to the map (for example, OpenStreetMap)
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
}).addTo(map);
