// Initialize the map
const map = new maplibregl.Map({
    container: 'map', // container ID
    style: 'https://api.maptiler.com/maps/aquarelle/style.json?key=dZ59VPBA7A1UHvaquwWJ', // Your style URL
    center: [-118.30038673745213, 34.06174261233714], // Starting position [lng, lat]
    zoom: 13.8 // Starting zoom level
});

function addMarker(lat,lng,title,message,index,img){
    let popup_message = `<h4>${title}</h4> <br>${message}`
    new maplibregl.Marker({ element: createImage(img)})         // allows for custom marker
        .setLngLat([lng, lat])
        .setPopup(new maplibregl.Popup().setHTML(popup_message))
        .addTo(map)
    createButtons(lat,lng,title,index);
    return message
}

function createImage(img) {
    const marker = document.createElement('div');
    marker.style.backgroundImage = `url('${img}')`;         // custom markers for map
    marker.style.backgroundSize = 'cover';
    marker.style.width = '70px';
    marker.style.height = '70px';
    return marker;
}

addMarker(34.061574678350695, -118.30422493187976, "MDK Noodles", "Perfect taste of Korean food that satisfies every craving!", 0, 'js/mdk.png')
addMarker(34.060417292180475, -118.29130604309712, "Tangtastic", "Tanghulu in Ktown! Delicious sugar-coated fruits that make a great snack!", 0, 'js/tang.png')
addMarker(34.06404780340599, -118.29757869271238, "Sun Nong Dan", "The yummiest, meatiest, and most filling Korean dishes in town!", 0, 'js/snd.png')
addMarker(34.06447417700057, -118.30985462201751, "Sul and Beans", "Best Korean Dessert (Bingsu) with the best flavors!", 1, 'js/bingsu.png')
addMarker(34.05833460724015, -118.30563719402289, "Heyri Cafe", "Drinks, desserts, and fireplaces; everything you need in a late-night cafe!", 1, 'js/coffee.png')

function createButtons(lat,lng,title,index){
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

    if (index == 0)
    document.getElementById("contents").appendChild(newButton);
    else 
    document.getElementById("contents2").appendChild(newButton);   // for row separation
}
