https://rchlemllr.github.io/Project_3/

🔰 About: 
For this project, our focus was on analyzing daily air quality worldwide, leveraging the World Air Quality Index APIs as our primary data source. These APIs collect and disseminate data from various agencies globally, contributing to a comprehensive public dataset. Our exploration involved delving into the functionalities offered by the APIs and implementing diverse methods to present and report this data using HTML and JavaScript. Through this project, we aimed to offer insights into air quality trends and variations across different regions, contributing to a better understanding of environmental health on a global scale.

Ethical Data:
Air quality data is a valuable public resource that numerous agencies contribute to. The data provided by the WAQI API is a prime example of this collaborative effort. As a result, the data collected through the WAQI API is considered clean and accessible, allowing developers, researchers, and concerned citizens to utilize it in various applications with restrictions. 

⚡ Usage:
This page features three distinct visualizations, each offering a unique perspective on air quality data. The first map provides a global overview of real-time air quality data, allowing users to monitor pollution levels worldwide. Various layers divide different types of air pollutants onto separate maps, enhancing clarity and understanding. Additionally, markers on this map represent cities featured in the second map. 

The second map offers a more focused perspective by highlighting air quality data for specific cities. Users can utilize a dropdown menu to select different cities, revealing coordinate map bounds and real-time air quality markers. Each marker displays the last update time, location, and pollutant information upon clicking. 

Last, but not least, the third visualization zooms in further, concentrating on individual stations in Beijing, China. A dropdown menu facilitates the selection of station names, generating a bubble plot illustrating pollutant levels visually. Station information, including location, air quality score, and applicable health warning, is also provided for detailed analysis. Overall, these three visualizations cater to various levels of exploration, from a global overview to localized insights, offering valuable data for environmental monitoring and analysis.

### External Libraries

- [Turf.js](https://unpkg.com/@turf/turf@6/turf.min.js)
- [D3.js](https://d3js.org/d3.v7.min.js)
- [Leaflet.js](https://unpkg.com/leaflet/dist/leaflet.js)
- [Plotly.js](https://cdn.plot.ly/plotly-latest.min.js)

### JavaScript Libraries

- [Logic.js](./static/js/logic.js)
- [Bubble App.js](./static/js/bubble_app.js)

### Resources

- [AQI API Source](https://aqicn.org/data-platform/token-confirm/159d1cfa-a23b-441c-8774-e327495ab256)
- [AQI Technical Assistance Document](https://www.airnow.gov/sites/default/files/2020-05/aqi-technical-assistance-document-sept2018.pdf)
- [Base Map Tiles](https://aqicn.org/json-api/demo/)
- [Marker Population Data](https://aqicn.org/json-api/demo/)
- [Legend](https://leafletjs.com/examples/quick-start/)
- [Timeout Function](https://aqicn.org/json-api/demo/)
- [Overlayers](https://leafletjs.com/examples/quick-start/)
- [Turf Documentation](https://turfjs.org/docs/#featureOf)
- [Color Brewer](https://colorbrewer2.org/#type=sequential&scheme=YlOrRd&n=6)


### Additional Resources

- [D3 Library](https://d3js.org/)
- [Leaflet Documentation](https://leafletjs.com/examples/quick-start/)
- [Dropdown Events](https://leafletjs.com/examples/quick-start/)

Leaflet: [Quick Start Guide](https://leafletjs.com/examples/quick-start/)

Clicking Function: [04-Evr_D3_Select](#)

Bubble Map: [Module_14_HW Assignment](#)

Drop Down: [09-Ins_Dropdown_Events](#)



