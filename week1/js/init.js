// Initialize the map
const map = new maplibregl.Map({
    container: 'map', // container ID
    style: 'https://api.maptiler.com/maps/streets/style.json?key=wsyYBQjqRwKnNsZrtci1', // Your style URL
    center: [ -118.442, 34.0709], // Starting position [lng, lat]
    zoom: 15 // Starting zoom level
});

const markerColors = ['#d87093', '#52A4D3', '#bfd16f'];

// Add a marker to the map
new maplibregl.Marker({ color: markerColors[0] })
    .setLngLat([ -118.4439, 34.0725])
    .setPopup(new maplibregl.Popup({ offset: 25 }) // Add popups
        .setHTML('Lobby in Kaufman Hall! Super quiet in the daytime and the interior is just gorgeous.'))
    .addTo(map);

new maplibregl.Marker({ color: markerColors[1] })
    .setLngLat([ -118.4403, 34.0712])
    .setPopup(new maplibregl.Popup({ offset: 25 }) // Add popups
        .setHTML('Music Library in the Shoenberg Music Building! Light seeps in so beautifully in the daytime that I feel like a happy plant.'))
    .addTo(map);

new maplibregl.Marker({ color: markerColors[2] })
    .setLngLat([ -118.4425, 34.0678])
    .setPopup(new maplibregl.Popup({ offset: 25 }) // Add popups
        .setHTML('Meeting Rooms at CNSI Level 5! Can be very private and has a pretty view of South Campus.'))
    .addTo(map);