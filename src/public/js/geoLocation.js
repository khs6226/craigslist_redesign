const geoBtn = $('.geo-button');
let statusMsg;


geoBtn.on('click', () => {
    let geoLocation = getGeo();
})

function getGeo() {
    navigator.geolocation.getCurrentPosition(() => {
        
    }, () => {
        console.log('err');
        statusMsg = 'Could not access your location...';
    })
}