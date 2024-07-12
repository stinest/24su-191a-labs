let mapOptions = {'centerLngLat': [-118.4,34.05], 'zoomLvl': 10}

const map = new maplibregl.Map({
    container: 'map',
    style: 'https://api.maptiler.com/maps/aquarelle/style.json?key=dZ59VPBA7A1UHvaquwWJ',
    center: mapOptions.centerLngLat,
    zoom: mapOptions.zoomLvl
});

function addMarker(lat,lng,title,message,img){
    let popup_message = `<h4>${title}</h4> <br>${message}`
    new maplibregl.Marker({ element: createImage(img)})
        .setLngLat([lng, lat])
        .setPopup(new maplibregl.Popup()
            .setHTML(popup_message))
        .addTo(map)
    createButtons(lat,lng,title);
    return message
}

function createImage(img) {
    const imgURL = `js/${img}.png`;
    const marker = document.createElement('div');
    marker.style.backgroundImage = `url(${imgURL})`;         // custom markers for map
    marker.style.backgroundSize = 'cover';
    marker.style.width = '50px';
    marker.style.height = '50px';
    return marker;
}

let lineCount = 0;
function createButtons(lat,lng,title){
    const newButton = document.createElement("button"); 
    newButton.id = "button"+title; 
    newButton.innerHTML = title; 
    newButton.setAttribute("lat",lat); 
    newButton.setAttribute("lng",lng); 
    newButton.className = "button";
    newButton.addEventListener('click', function(){
        map.flyTo({
            center: [lng,lat],
        })
    })
    
    if (lineCount % 6 == 0) {
        document.getElementById("contents").appendChild(newButton);
    } else if (lineCount % 6 == 1) {
        document.getElementById("contents2").appendChild(newButton);
    } else if (lineCount % 6 == 2) {
        document.getElementById("contents3").appendChild(newButton);
    } else if (lineCount % 6 == 3) {
        document.getElementById("contents4").appendChild(newButton);
    } else if (lineCount % 6 == 4) {
        document.getElementById("contents5").appendChild(newButton);
    } else if (lineCount % 6 == 5) {
        document.getElementById("contents6").appendChild(newButton);
    }

    lineCount++;
}

map.on('load', function() {
    fetch("map.geojson")
        .then(response => response.json())
        .then(data => {
            processData(data); // Call processData with the fetched data
        });
});

function processData(results){
    //console.log(results) //for debugging: this can help us see if the results are what we want
    results.features.forEach(feature => {
        //console.log(feature) // for debugging: are we seeing each feature correctly?
        // the console log can make sure we have the right field names selected!
        let coordinates = feature.geometry.coordinates;
        let longitude = coordinates[0];
        let latitude = coordinates[1];
        let title = feature.properties.place;
        let message = feature.properties.message;
        let img = feature.properties.icon;      // for custom icon
        addMarker(latitude,longitude,title,message,img);
    });
};
