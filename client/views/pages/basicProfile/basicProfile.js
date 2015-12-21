var makersForBasicProfile = new L.LayerGroup();

Template.basicProfile.helpers({
    updateIPAddrCount: function() {
        Meteor.call('getIPAddrCount', function (err, count) {
            Session.set('ipAddrCount', count);
        });

        return Session.get('ipAddrCount');
    },

    ipAddr: function() {
        return Inspire.Collection.IPAddr.findOne();
    }
});

Template.basicProfile.events({
    'change input[id=searchIP]': function(event, instance) {
        event.preventDefault();
        var inputIP = instance.find("#searchIP").value;
        var ip_bigint = instance.IPCovertToInt(inputIP);
        return instance.searchIP.set(ip_bigint);
    }
});

Template.basicProfile.onCreated(function() {
    var instance = Template.instance();
    instance.searchIP = new ReactiveVar(-1);
    instance.map = new ReactiveVar();

    instance.autorun(function() {
        var map = instance.map.get();
        if(map){
            //首先清空标记图层
            for (var i in makersForBasicProfile._layers) {
                map.removeLayer(makersForBasicProfile._layers[i]);
            }
            makersForBasicProfile.clearLayers();

            var lat = 0, lng = 0, viewZoom = 2;
            var subscription = instance.subscribe('findIPbyBigint', instance.searchIP.get());
            if (subscription.ready()) {
                var ips = Inspire.Collection.IPAddr.find().fetch();
                ips.forEach(function(ip){
                    if(ip.addr.lat && ip.addr.lng){
                        var marker = L.marker([ip.addr.lat, ip.addr.lng]).addTo(map)
                            .bindPopup(ip.addr.country+ip.addr.province+ip.addr.city+ip.addr.district+ip.addr.street)
                            .openPopup();

                        makersForBasicProfile.addLayer(marker);
                        lat = ip.addr.lat;
                        lng = ip.addr.lng;
                        viewZoom = 6;
                    }
                });

                map.setView([lat, lng], viewZoom);
            }
        }

    });

    instance.IPCovertToInt = function(ip) {
        ip = ip.split(".");
        var num = Number(ip[0]) * 256 * 256 * 256 + Number(ip[1]) * 256 * 256 + Number(ip[2]) * 256 + Number(ip[3]);
        num = num >>> 0;
        return num;
    };
});

Template.basicProfile.rendered = function(){
    //leaflet map
    L.Icon.Default.imagePath = 'packages/bevanhunt_leaflet/images';
    var map = L.map('dmap', {
        doubleClickZoom: false
    });

    L.tileLayer.provider('OpenStreetMap.HOT').addTo(map);
    this.map.set(map);
    map.setView([0, 0], 2);
};