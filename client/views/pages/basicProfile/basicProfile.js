Template.basicProfile.helpers({

});

Template.basicProfile.rendered = function(){
    //leaflet map
    L.Icon.Default.imagePath = 'packages/bevanhunt_leaflet/images';
};

Template.basicProfile.onCreated(function() {
    var instance = Template.instance();
    instance.search = new ReactiveVar('');
    instance.autorun(function() {

        var subscription = instance.subscribe('allips');
        if (subscription.ready()) {
            var map = L.map('dmap', {
                doubleClickZoom: false
            }).setView([0, 0], 2);

            L.tileLayer.provider('OpenStreetMap.HOT').addTo(map);

            var ips = Inspire.Collection.IPAddr.find().fetch();
            ips.forEach(function(ip){
                console.log(ip);
                L.marker([ip.addr.lat, ip.addr.lng]).addTo(map)
                    .bindPopup(ip.addr.country+ip.addr.province+ip.addr.city+ip.addr.district+ip.addr.street);
            });
        }
    });
});