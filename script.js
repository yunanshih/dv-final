var geocoder = new google.maps.Geocoder();
d3.csv('./data/107A1.csv').then((data) => {
    data.forEach(d => {
        d['經度'] = parseFloat(d['經度']);
        d['緯度'] = parseFloat(d['緯度']);
        var coord = new google.maps.LatLng(25.0439892, 121.5212213);
        geocoder.geocode({'latLng': coord }, function(results, status) {
            if (status === google.maps.GeocoderStatus.OK) {
                if (results) {
                    console.log(results[0]);
                }
            } else {
                alert("Reverse Geocoding failed because: " + status);
            }
        });
    });
});