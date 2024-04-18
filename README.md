README: 

🔰 About: 
For this project, our focus was on analyzing daily air quality worldwide, leveraging an API as our primary data source. This API collects and disseminates data from various agencies globally, contributing to a comprehensive public dataset. Our exploration involved delving into the functionalities offered by the API and implementing diverse methods to present and report this data using HTML and JavaScript. Through this project, we aimed to offer insights into air quality trends and variations across different regions, contributing to a better understanding of environmental health on a global scale.

Ethical Data:
Air quality data is a valuable public resource that numerous agencies contribute to. The data provided by the AQI API is a prime example of this collaborative effort. As a result, the data collected through the AQI API is considered a clean and accessible, allowing developers, researchers, and concerned citizens to utilize it in various applications with restrictions. 

⚡ Usage:
This page features three distinct map setups, each offering a unique perspective on air quality data. The first map provides a global overview of real-time air quality data, allowing users to monitor pollution levels worldwide. Various layers segregate different types of air pollutants onto separate maps, enhancing clarity and understanding. Additionally, markers on this map represent cities featured in the second map. 

The second map offers a more focused perspective by highlighting air quality data for specific countries. Users can utilize a dropdown menu to select different countries, revealing coordinate bounds and real-time air quality markers. Each marker displays the last update time, location, and pollutant information upon clicking. 

Last, but not least, the third map zooms in further, concentrating on individual stations. A dropdown menu facilitates the selection of station names, generating a bubble map illustrating pollutant levels visually. Station information, including location, air quality score, and health description, is also provided for detailed analysis. Overall, these three map setups cater to various levels of exploration, from a global overview to localized insights, offering valuable data for environmental monitoring and analysis.

📦 Commands:
HTML Starter commands – 
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Leaflet Map with Turf.js</title>

Importing Leaflet CSS 

<!-- Leaflet CSS -->
  <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
    integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
    crossorigin="" />


Importing External libraries 
<!-- Turf JS -->
  <script src="https://unpkg.com/@turf/turf@6/turf.min.js"></script>
  <script src="https://d3js.org/d3.v7.min.js"></script>

JS libraries 
<script src="https://unpkg.com/leaflet/dist/leaflet.js"></script>
<script src="./static/js/logic.js"></script>
<script src="./static/js/bubble_app.js"></script>
<script src="https://cdn.plot.ly/plotly-latest.min.js"></script
![image](https://github.com/RchlEMllr/Project_3/assets/153474345/0e096ed1-5a7e-410e-b0f6-553ef580229d)


📄 Resources:
API Source - 
https://aqicn.org/data-platform/token-confirm/159d1cfa-a23b-441c-8774-e327495ab256
https://www.airnow.gov/sites/default/files/2020-05/aqi-technical-assistance-document-sept2018.pdf


Code Resources:

Base map Tiles 

https://aqicn.org/json-api/demo/

Populate markers – 
https://aqicn.org/json-api/demo/

legend – 

https://leafletjs.com/examples/quick-start/

Time out Function – 
https://aqicn.org/json-api/demo/

Var overlayers 
https://leafletjs.com/examples/quick-start/

TURF - 
https://turfjs.org/docs/#featureOf

Color 

https://colorbrewer2.org/#type=sequential&scheme=YlOrRd&n=6

D3 Library – 
https://d3js.org/

Leaflet – 
https://leafletjs.com/examples/quick-start/

Clicking Function – 

04-Evr_D3_Select

Bubble Map – 

Module_14_HW Assignment 

Drop Down – 

09-Ins_Dropdown_Events
![image](https://github.com/RchlEMllr/Project_3/assets/153474345/7ace968a-4879-4efb-9182-ee4ec34af0d8)


