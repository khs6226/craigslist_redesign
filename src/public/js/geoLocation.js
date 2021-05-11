const geoBtn = $('.geo-button');
let statusMsg;


geoBtn.on('click', () => {
    getGeo((err, results) => {
        console.log(results);
    });
})

function getGeo(cb) {
    navigator.geolocation.getCurrentPosition((position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        const coords = { latitude: lat, longitude: lon }
        cb(null, coords);

    }, () => {
        cb('Could not access your location...', null);
    })
}

