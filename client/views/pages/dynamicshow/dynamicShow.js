Template.dynamicShow.rendered = function(){

    L.Icon.Default.imagePath = 'packages/bevanhunt_leaflet/images';

    var map = L.map('map', {
        doubleClickZoom: false
    }).setView([39.9388838, 116.3974589], 10);

    L.tileLayer.provider('OpenStreetMap.HOT').addTo(map);

    L.marker([39.9388838, 116.3974589]).addTo(map)
        .bindPopup('中国 北京市 西城区 长安街')
        .openPopup();
};