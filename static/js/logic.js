let allMarkers = {};

function createMap() {
    var OpenStreetMap_Mapnik = L.tileLayer(
        "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
        {
            maxZoom: 19,
            attribution:
                '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        }
    );

    let map = L.map(document.getElementById("leaflet-map"), {
        attributionControl: false,
        gestureHandling: true,
        zoomSnap: 0.1,
    })
        .setView([0, 0], 12)
        .addLayer(OpenStreetMap_Mapnik);

    setTimeout(function () {
        map.on("moveend", () => {
            let bounds = map.getBounds();
            bounds =
                bounds.getNorth() +
                "," +
                bounds.getWest() +
                "," +
                bounds.getSouth() +
                "," +
                bounds.getEast();
            document.getElementById("leaflet-map-bounds").innerHTML =
                "bounds: " + bounds.split(",").join(", ");
            populateMarkers(map, bounds, true);
        });
    }, 1000);

    return map;
}

function populateMarkers(map, bounds, isRefresh) {
    return fetch(
        "https://api.waqi.info/v2/map/bounds/?latlng=" +
            bounds +
            "&token=" + "5cfd44299d5c50db6be23375f1ae11a770e80b97"

    )
        .then((x) => x.json())
        .then((stations) => {
            if (stations.status != "ok") throw stations.data;

            stations.data.forEach((station) => {
                if (allMarkers[station.uid])
                    map.removeLayer(allMarkers[station.uid]);

                let iw = 83,
                    ih = 107;
                let icon = L.icon({
                    iconUrl:
                        "https://waqi.info/mapicon/" + station.aqi + ".30.png",
                    iconSize: [iw / 2, ih / 2],
                    iconAnchor: [iw / 4, ih / 2 - 5],
                });

                let marker = L.marker([station.lat, station.lon], {
                    zIndexOffset: station.aqi,
                    title: station.station.name,
                    icon: icon,
                }).addTo(map);

                marker.on("click", () => {
                    let popup = L.popup()
                        .setLatLng([station.lat, station.lon])
                        .setContent(station.station.name)
                        .openOn(map);

                    getMarkerPopup(station.uid).then((info) => {
                        popup.setContent(info);
                    });
                });

                allMarkers[station.uid] = marker;
            });

            document.getElementById("leaflet-map-error").style.display = "none";
            return stations.data.map(
                (station) => new L.LatLng(station.lat, station.lon)
            );
        })
        .catch((e) => {
            var o = document.getElementById("leaflet-map-error");
            o.innerHTML = "Sorry...." + e;
            o.style.display = "";
        });
}

function populateAndFitMarkers(map, bounds) {
    removeMarkers(map);
    if (bounds.split(",").length == 2) {
        let [lat, lng] = bounds.split(",");
        lat = parseFloat(lat);
        lng = parseFloat(lng);
        bounds = `${lat - 0.5},${lng - 0.5},${lat + 0.5},${lng + 0.5}`;
    }
    populateMarkers(map, bounds).then((markerBounds) => {
        let [lat1, lng1, lat2, lng2] = bounds.split(",");
        let mapBounds = L.latLngBounds(
            L.latLng(lat2, lng2),
            L.latLng(lat1, lng1)
        );
        map.fitBounds(mapBounds, { maxZoom: 12, paddingTopLeft: [0, 40] });
    });
}

function removeMarkers(map) {
    Object.values(allMarkers).forEach((marker) => map.removeLayer(marker));
    allMarkers = {};
}

function getMarkerPopup(markerUID) {
    return getMarkerAQI(markerUID).then((marker) => {
        let info =
            marker.city.name +
            ": AQI " +
            marker.aqi +
            " updated on " +
            new Date(marker.time.v * 1000).toLocaleTimeString() +
            "<br>";

        if (marker.city.location) {
            info += "<b>Location</b>: ";
            info += "<small>" + marker.city.location + "</small><br>";
        }

        let pollutants = ["pm25", "pm10", "o3", "no2", "so2", "co"];

        info += "<b>Pollutants</b>: ";
        for (specie in marker.iaqi) {
            if (pollutants.indexOf(specie) >= 0)
                info += "<u>" + specie + "</u>:" + marker.iaqi[specie].v + " ";
        }
        info += "<br>";

        info += "<b>Weather</b>: ";
        for (specie in marker.iaqi) {
            if (pollutants.indexOf(specie) < 0)
                info += "<u>" + specie + "</u>:" + marker.iaqi[specie].v + " ";
        }
        info += "<br>";

        info += "<b>Attributions</b>: <small>";
        info += marker.attributions
            .map(
                (attribution) =>
                    "<a target=_ href='" +
                    attribution.url +
                    "'>" +
                    attribution.name +
                    "</a>"
            )
            .join(" - ");
        return info;
    });
}

function getMarkerAQI(markerUID) {
    return fetch(
        "https://api.waqi.info/feed/@" + markerUID + "/?token=" + "5cfd44299d5c50db6be23375f1ae11a770e80b97"
    )
        .then((x) => x.json())
        .then((data) => {
            if (data.status != "ok") throw data.reason;
            return data.data;
        });
}

function init() {
    var map = createMap();

    const locations = {  Beijing: "39.379436,116.091230,40.235643,116.784382",
    Bucharest:
        "44.50858895332098,25.936583232631918,44.389144165939854,26.300222840009447",
    London: "51.69945358064312,-0.5996591366844406,51.314690280921894,0.3879568209963314",
    Bangalore:
        "13.106898860432123,77.38497433246386,12.825861486200223,77.84571346820603",
    Gdansk: "54.473394,18.380491,54.272590,18.981516",
    Paris: "49.073532,1.998255,48.709611,2.668288",
    "Los Angeles": "34.337507,-118.710957,33.706749,-118.132830",
    Seoul: "37.684622,126.853182,37.399941,127.209392",
    Jakarta: "-6.080818,106.663287,-6.367509,106.994250"
    };

    let oldButton;

    // Populate the dropdown menu with cities
    Object.keys(locations).forEach((city) => {
        let option = document.createElement("option");
        option.value = locations[city];
        option.textContent = city;
        document.getElementById("location-dropdown").appendChild(option);
    });

    // Add event listener to the dropdown
    document.getElementById("location-dropdown").addEventListener("change", function() {
        // Get the selected city and bounds from the dropdown
        let city = this.options[this.selectedIndex].textContent;
        let bounds = this.value;
        // Populate and fit markers on the map
        populateAndFitMarkers(map, bounds);
        // Call _aqiFeed function to display AQI information for the selected city
        //_aqiFeed({
          //  container: "city-aqi-container",
           // city: city,
           // lang: "en"
        //});
    });

    // Fetch AQI data for the current location
   // fetch("https://api.waqi.info/v2/feed/here/?token=" + "5cfd44299d5c50db6be23375f1ae11a770e80b97")
     //   .then((response) => response.json())
       // .then((data) => {
            // Add the current location to the dropdown
         //   let option = document.createElement("option");
          //  option.value = data.data.city.geo.join(",");
           // option.textContent = data.data.city.name;
            //document.getElementById("location-dropdown").appendChild(option);
        //})
        //.catch((error) => {
          //  console.error("Error fetching AQI data:", error);
        //});

}

init();

