Template.graphLeaflet.rendered = function(){

    L.Icon.Default.imagePath = 'packages/bevanhunt_leaflet/images';

    var map = L.map('map', {
        doubleClickZoom: false
    }).setView([49.25044, -123.137], 13);

    L.tileLayer.provider('Thunderforest.Outdoors').addTo(map);
};