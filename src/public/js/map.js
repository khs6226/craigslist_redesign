const mapDOM = $('#map');
const lat = mapDOM.data('lat');
const lon = mapDOM.data('lon');

var map = L.map('map', {
    center: [lat, lon],
    zoom: 13
});
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png?{foo}', {foo: 'bar', attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'}).addTo(map);
L.circle([lat, lon], 1000).addTo(map)