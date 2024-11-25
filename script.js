document.addEventListener('DOMContentLoaded', function () {
    // Inicializē karti
    var map = L.map('map').setView([56.8796, 24.6032], 8); // Centrs uz Latviju

    // Pievieno OpenStreetMap kartes slāni
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    }).addTo(map);

    // Ielādē datus no geomap.json
    fetch('geomap.json')
        .then(response => response.json())
        .then(data => {
            data.features.forEach(feature => {
                if (feature.properties.PLACESUBTY === 2) { // Filtrē tikai atpūtas vietas
                    var coordinates = feature.geometry.coordinates;
                    var latLng = LKS92WGS84.convertXYToLatLon(coordinates);
                    var marker = L.marker([latLng[0], latLng[1]]).addTo(map);
                    marker.bindPopup(`<b>${feature.properties.PLACENAME}</b><br>${feature.properties.PLACESUBTY}`);
                }
            });
        })
});
