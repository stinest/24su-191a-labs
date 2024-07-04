// Initialize the map
const map = new maplibregl.Map({
    container: 'map', // container ID
    style: 'https://api.maptiler.com/maps/streets-v2-light/style.json?key=wsyYBQjqRwKnNsZrtci1', // Your style URL
    center: [-118.30038673745213, 34.06174261233714], // Starting position [lng, lat]
    zoom: 15 // Starting zoom level
});

function addMarker(lat,lng,title,message,index){
    let popup_message = `<h4>${title}</h4> <br>${message}`
    new maplibregl.Marker({ color: '#B6E6DB' })
        .setLngLat([lng, lat])
        .setPopup(new maplibregl.Popup().setHTML(popup_message))
        .addTo(map)
    createButtons(lat,lng,title,index);
    return message
}

addMarker(34.061574678350695, -118.30422493187976, "MDK Noodles", "Perfect taste of Korean food that satisfies every craving!", 0)
addMarker(34.060417292180475, -118.29130604309712, "Tangtastic", "Tanghulu in Ktown! Delicious sugar-coated fruits that make a great snack!", 0)
addMarker(34.06404780340599, -118.29757869271238, "Sun Nong Dan", "The yummiest, meatiest, and most filling Korean dishes in town!", 0)
addMarker(34.06447417700057, -118.30985462201751, "Sul and Beans", "Best Korean Dessert (Bingsu) with the best flavors!", 1)
addMarker(34.05833460724015, -118.30563719402289, "Heyri Cafe", "Drinks, desserts, and fireplaces; everything you need in a late-night cafe!", 1)

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
    document.getElementById("contents2").appendChild(newButton);
}
