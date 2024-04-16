let locData = "https://api.waqi.info/v2/map/bounds/?latlng="+location+"&token=5a2a13ac22a673a3b20c8d4d161cb12623e0a237";

const locations = {
  Beijing: "39.379436,116.091230,40.235643,116.784382",
  Bucharest:
      "44.50858895332098,25.936583232631918,44.389144165939854,26.300222840009447",
  London: "51.69945358064312,-0.5996591366844406,51.314690280921894,0.3879568209963314",
  Bangalore:
      "13.106898860432123,77.38497433246386,12.825861486200223,77.84571346820603",
  Gdansk: "54.473394,18.380491,54.272590,18.981516",
  Paris: "49.073532,1.998255,48.709611,2.668288",
  "Los Angeles": "34.337507,-118.710957,33.706749,-118.132830",
  Seoul: "37.684622,126.853182,37.399941,127.209392",
  Jakarta: "-6.080818,106.663287,-6.367509,106.994250",
};

function setup() {
   let dropDown = d3.select("#selDataset");
   d3.json(locData).then(function(data) {
    console.log(data);
    names = [];
    for (let i = 0; i < data.data.length; i++) {
    names.push(data.data[i].station.name);
    }
    names.sort();
    console.log(names);
    names.forEach((name) => {
         dropDown.append("option")
         .text(name)
         .property("value", name);
       });
          
          let initialStation = names[0]
            bubblePlot(initialStation);
            stationInfo(initialStation);
    });
};

setup();

function stationInfo (selectedStation) {
  d3.json(locData).then(function(data) {
    let stationList = {};
    stationList = data;
    console.log(stationList);
    for (let i = 0; i < stationList.data.length; i++) {
    if (stationList.data[i].station.name == selectedStation){
      stationData = stationList.data[i];
    };
    }
      let card = d3.select("#station-info");
      card.html("");
    
      for (key in stationData) {
      if (key!=="station") {card.append("h6").text(key+": "+stationData[key])}
      };
  });
};

function bubblePlot (selectedStation) {
  d3.json(locData).then(function(data) {

    for (let i = 0; i < data.data.length; i++) {
      if (data.data[i].station.name == selectedStation){
        coords = data.data[i].lat+";"+data.data[i].lon;
      };
    };
  console.log(coords);

  let stationAPI = "https://api.waqi.info/feed/geo:"+coords+"/?token=5a2a13ac22a673a3b20c8d4d161cb12623e0a237";
  console.log(stationAPI);

  d3.json(stationAPI).then(function(apiData) {
  console.log(apiData);

  let pollutants = ["pm25","pm10", "o3", "no2","co","so2"];

  let pollutantValues = []
  if (apiData.data.iaqi.pm25){pollutantValues.push(apiData.data.iaqi.pm25.v)}
  else pollutantValues.push(0);
  if (apiData.data.iaqi.pm10){pollutantValues.push(apiData.data.iaqi.pm10.v)}
  else pollutantValues.push(0);
  if (apiData.data.iaqi.o3){pollutantValues.push(apiData.data.iaqi.o3.v)}
  else pollutantValues.push(0);
  if (apiData.data.iaqi.no2){pollutantValues.push(apiData.data.iaqi.no2.v)}
  else pollutantValues.push(0);
  if (apiData.data.iaqi.co){pollutantValues.push(apiData.data.iaqi.co.v)}
  else pollutantValues.push(0);
  if (apiData.data.iaqi.so2){pollutantValues.push(apiData.data.iaqi.so2.v)}
  else pollutantValues.push(0);

console.log(apiData.data.iaqi);
  let pollutantNames = ["Particulate Matter under 2.5µm", "Particulate Matter under 10µm",
                          "Ozone", "Nitrogen Dioxide","Carbon Monoxide","Sulfur Dioxide"]

  let trace2 = [
      {x: pollutants,
       y: pollutantValues,
       text: pollutantNames,
       mode:"markers",
       marker:{
          size: (pollutantValues),
          color: markerColor(apiData.data.aqi),
          line: {
            color: 'black',
            width: 2
          }
       }

      }];

      function markerColor(aqi){
        if (aqi < 50) return "green";
        else if (aqi < 100) return "yellow";
        else if (aqi < 150) return "orange";
        else if (aqi < 200) return "red";
        else if (aqi < 300) return "purple";
        else return "maroon";
      }

  let layout = {
      xaxis: {title:"Location: "+apiData.data.city.name+"; Major pollutant: "+apiData.data.dominentpol}
  };

  Plotly.newPlot("bubble", trace2, layout);

  });
  
});
};
function optionChanged(selectedStation) {
  stationInfo(selectedStation);
  bubblePlot(selectedStation);
};

  