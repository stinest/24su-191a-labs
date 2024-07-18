// declare variables
let mapOptions = {'centerLngLat': [-118.444,34.0709],'startingZoomLevel':5}

const map = new maplibregl.Map({
    container: 'map',
    style: 'https://api.maptiler.com/maps/aquarelle/style.json?key=dZ59VPBA7A1UHvaquwWJ',
    center: mapOptions.centerLngLat,
    zoom: mapOptions.startingZoomLevel
});

function addMarker(data){
    let popup_message;
    let lng = data['lng'];
    let lat = data['lat'];
    popup_message = `<h1>${data['Where would you consider home? (City, State/Country)']}!</h1><p>Best Part: ${data['What do you like most about your hometown?']}</p>`

    let img = 'lock';
    if (data['How would you best describe the community?'] == 'Close-knit') {
        img = 'yarn'
    }
    else if (data['How would you best describe the community?'] == 'Diverse') {
        img = 'puzzle'
    }
    else if (data['How would you best describe the community?'] == 'Friendly') {
        img = 'hand'
    }
    else if (data['How would you best describe the community?'] == 'Reserved') {
        img = 'lock'
    }

    new maplibregl.Marker({ element: createImage(img) })
        .setLngLat([lng, lat])
        .setPopup(new maplibregl.Popup()
            .setHTML(popup_message))
        .addTo(map)
    createButtons(lat,lng,data['Where would you consider home? (City, State/Country)']);
}

function createButtons(lat,lng,title){
    const newButton = document.createElement("button");
    newButton.id = "button"+title; 
    newButton.innerHTML = title;
    newButton.setAttribute("lat",lat);
    newButton.setAttribute("lng",lng);
    newButton.addEventListener('click', function(){
        map.flyTo({
            center: [lng,lat],
        })
    })
    document.getElementById("contents").appendChild(newButton);
}

function createImage(img) {
    const imgURL = `js/${img}.png`;
    const marker = document.createElement('div');
    marker.style.backgroundImage = `url(${imgURL})`;         // custom markers for map
    marker.style.backgroundSize = 'cover';
    marker.style.width = '50px';
    marker.style.height = '50px';

    marker.addEventListener('mouseenter', function() {
        marker.style.width = '70px';
        marker.style.height = '70px';
    });
    marker.addEventListener('mouseleave', function() {
        marker.style.width = '50px';
        marker.style.height = '50px';
    });

    return marker;
}

const dataUrl = "https://docs.google.com/spreadsheets/d/e/2PACX-1vSw2jgPu-Yg18p0xSnhRK8nv7I6NcN8yNs1LraVb3_tBIQ9Kzm52eXEqlVUYLhakWZfm2V2f9XKOBgD/pub?output=csv"

// When the map is fully loaded, start adding GeoJSON data
map.on('load', function() {
    // Use PapaParse to fetch and parse the CSV data from a Google Forms spreadsheet URL
    Papa.parse(dataUrl, {
        download: true, // Tells PapaParse to fetch the CSV data from the URL
        header: true, // Assumes the first row of your CSV are column headers
        complete: function(results) {
            // Process the parsed data
            processData(results.data); // Use a new function to handle CSV data
        }
    });
});

function processData(results){
    console.log(results) //for debugging: this can help us see if the results are what we want
    results.forEach(feature => {
        //console.log(feature) // for debugging: are we seeing each feature correctly?
        // assumes your geojson has a "title" and "message" attribute
        // let coordinates = feature.geometry.coordinates;
        let longitude = feature['lng']
        let latitude = feature['lat'];
        let title = feature['Where would you consider home?'];
        let message = feature['What do you like most about your hometown?'];
        addMarker(feature);
    });
};