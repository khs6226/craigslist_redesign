const geoBtn = $('.geo-button');


geoBtn.on('click', () => {
    getGeo((err, results) => {
        $('form').attr('action', `/posts/post-preview/?lat=${results.latitude}&lon=${results.longitude}`);
        console.log(results);
    });
})

function getGeo(cb) {
    navigator.geolocation.getCurrentPosition((position) => {
        const lat = position.coords.latitude.toFixed(7);
        const lon = position.coords.longitude.toFixed(7);

        const coords = { latitude: lat, longitude: lon }
        cb(null, coords);

    }, () => {
        cb('Could not access your location...', null);
    })
}

