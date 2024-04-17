
const locData = "https://api.waqi.info/v2/map/bounds/?latlng=39.379436,116.091230,40.235643,116.784382&token=5a2a13ac22a673a3b20c8d4d161cb12623e0a237";

  setup(locData);
  stationInfo(locData);
  bubblePlot(locData);

function setup(locData) {
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
            console.log(initialStation);
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
      console.log(stationData);
      if (stationData.aqi <51)
        card.append("h6").text("Air quality is good.");
      else if (stationData.aqi <101)
        card.append("h6").text("Air quality is moderate.");  
        else if (stationData.aqi <151)
        card.append("h6").text("Air quality is unhealthy for sensitive groups.");
        else if (stationData.aqi <201)
        card.append("h6").text("Air quality is unhealthy.");
        else if (stationData.aqi <301)
        card.append("h6").text("Air quality is very unhealthy.");
        else if (stationData.aqi <501)
        card.append("h6").text("Air quality is hazardous.");
        else 
        card.append("h6").text("Air quality is beyond AQI.");        
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

  