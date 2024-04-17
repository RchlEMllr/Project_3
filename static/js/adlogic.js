
 let myMap = L.map("map").setView([45.52, -122.67], 3);


// add the basemap tiles
    let tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(myMap);
//pm
    let pm2_5 = L.tileLayer('https://tiles.aqicn.org/tiles/usepa-pm25/{z}/{x}/{y}.png?token=295dcb510bbc355e4e3441bae95aed6b7496884a', {
        attribution: '&copy; <a href="http://waqi.info">waqi.info</a>'
    }).addTo(myMap);
//pm10 layer
    let pm10 = L.tileLayer('https://tiles.aqicn.org/tiles/usepa-10/{z}/{x}/{y}.png?token=295dcb510bbc355e4e3441bae95aed6b7496884a', {
        attribution: '&copy; <a href="http://waqi.info">waqi.info</a>'
    }).addTo(myMap);
//ozone layer

    let ozone = L.tileLayer('https://tiles.aqicn.org/tiles/usepa-o3/{z}/{x}/{y}.png?token=295dcb510bbc355e4e3441bae95aed6b7496884a', {
        attribution: '&copy; <a href="http://waqi.info">waqi.info</a>'
    }).addTo(myMap);
 //nitrogen layer

    let nitrogen_dioxide = L.tileLayer('https://tiles.aqicn.org/tiles/usepa-no2/{z}/{x}/{y}.png?token=295dcb510bbc355e4e3441bae95aed6b7496884a', {
        attribution: '&copy; <a href="http://waqi.info">waqi.info</a>'
    }).addTo(myMap);
  //sulfur layer

    let sulfur_dioxide = L.tileLayer('https://tiles.aqicn.org/tiles/usepa-so2/{z}/{x}/{y}.png?token=295dcb510bbc355e4e3441bae95aed6b7496884a', {
        attribution: '&copy; <a href="http://waqi.info">waqi.info</a>'
    }).addTo(myMap);
    //carbon layer
    let carbon_monoxide = L.tileLayer('https://tiles.aqicn.org/tiles/usepa-co{z}/{x}/{y}.png?token=295dcb510bbc355e4e3441bae95aed6b7496884a', {
        attribution: '&copy; <a href="http://waqi.info">waqi.info</a>'
    }).addTo(myMap);


let queryUrl = "https://api.waqi.info/feed/here/?token=295dcb510bbc355e4e3441bae95aed6b7496884a"


// Define grades and colors for the legend
let grades = ["Good", "Moderate", "Unhealthy for Sensitive Groups", 'Unhealthy', "Very Unhealthy", "Hazardous"];
let colors = ["#d9f0a3", "#ffffb2", "#fd8d3c", "#de2d26", "#7a0177", "#bd0026"];
let Quality = [50,100,150,200,300,500]
// Create a legend control
let legend = L.control({ position: 'bottomright' });

// Add legend to map
legend.onAdd = function () {
    let div = L.DomUtil.create('div', 'info legend');

    // Loop through grades to generate legend labels and styles
    for (let i = 0; i < grades.length; i++) {
        div.innerHTML +=
            '<i style="background:' + colors[i] + '"></i> ' +
            (i === 0 ? '0-' : (Quality[i-1] + 1) + '-') + Quality[i] +
            ' ' + grades[i] + (grades[i + 1] ? '<br>' : '+');
    }

    return div;
};

legend.addTo(myMap);

//layer control
var baseLayers = {
    "tiles":tiles
};

var overlayLayers = {
    "pm2_5": pm2_5,
    "pm10": pm10,
    "ozone": ozone,
    "nitrogen_dioxide" : nitrogen_dioxide,
    "sulfur_dioxide": sulfur_dioxide,
    "carbon_monoxide": carbon_monoxide
};


L.control.layers(baseLayers, overlayLayers).addTo(myMap);
//Turf Geometry//Center

// Function to add city marker
function addCityMarker(coordinates, cityName) {
    // Convert coordinates to Turf points
    var cityPoints = turf.points(coordinates);

    // Calculate center
    var cityCenter = turf.center(cityPoints);

    // Extract the coordinates of the center point
    var cityCenterCoordinates = cityCenter.geometry.coordinates;

    // Create a Leaflet marker at the center coordinates
    var cityMarker = L.marker([cityCenterCoordinates[1], cityCenterCoordinates[0]]).addTo(myMap);

    // Add a popup to the marker displaying the city name
    var popupContent = "<b>" + cityName;
    cityMarker.bindPopup(popupContent);

    // Bind click event to open popup
    cityMarker.on('click', function() {
        cityMarker.openPopup();
    });
}

// Define coordinates for each city
var cityCoordinates = {
    "Paris": [
        [2.389941, 48.814219],
        [2.681079, 48.412797],
        [2.291064, 48.725518]
    ],
    "Gdansk": [
        [18.538825, 54.424190],
        [18.434363, 54.381038],
        [18.555674, 54.320155]
    ],
    "Los Angeles": [
        [-118.657842, 34.233766],
        [-118.233495, 34.006386],
        [-118.181310, 34.134931]
    ],
    "Seoul": [
        [126.9780, 37.5665],
        [127.0369, 37.5326],
        [126.9778, 37.5550]
    ],
    "Jakarta": [
        [106.700082, -6.095253],
        [106.690126, -6.110956],
        [106.970964, -6.164207]
    ]
};

// Add markers for each city
for (var city in cityCoordinates) {
    addCityMarker(cityCoordinates[city], city);
}

