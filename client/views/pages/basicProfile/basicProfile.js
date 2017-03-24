var makersForBasicProfile = new L.LayerGroup();

Template.basicProfile.helpers({
    updateIPAddrCount: function() {
        Meteor.call('getIPAddrCount', function (err, count) {
            Session.set('ipAddrCount', count);
        });

        return Session.get('ipAddrCount');
    },

    ipAddr: function() {
        return Template.instance().ipAddr.get();
    }
});

Template.basicProfile.events({
    'change input[id=searchIP]': function(event, instance) {
        event.preventDefault();
        var inputIP = instance.find("#searchIP").value;
        // var ip_bigint = instance.IPCovertToInt(inputIP);
        return instance.searchIP.set(inputIP);
    }
});

Template.basicProfile.onCreated(function() {
    var instance = Template.instance();
    instance.searchIP = new ReactiveVar(-1);
    instance.map = new ReactiveVar();
    instance.ipAddr = new ReactiveVar();

    instance.autorun(function() {
        var map = instance.map.get();
        if(map){
            //首先清空标记图层
            makersForBasicProfile.clearLayers();

            var lat = 30, lng = 160, viewZoom = 2;
            var searchIP = instance.searchIP.get()
            if (searchIP != -1) {
                var ip = Meteor.call('geolocate', instance.searchIP.get(), function(error, ip) {
                    console.log(ip);
                    if (ip.code == 0) {
                        instance.ipAddr.set(ip);
                        if(ip.addr.lat && ip.addr.lng){
                            if(ip.addr.lat != '*' && ip.addr.lat !='' && ip.addr.lng != '*' && ip.addr.lng != ''){
                                lat = ip.addr.lat;
                                lng = ip.addr.lng;
                                viewZoom = 12;

                                var marker = L.marker([lat, lng]).addTo(makersForBasicProfile)
                                    .bindPopup(ip.addr.country+ip.addr.province+ip.addr.city+ip.addr.district)
                                    .openPopup();

                                var circle = L.circle([lat, lng], 1000, {
                                    color: 'red',
                                    fillColor: '#f03',
                                    fillOpacity: 0.3
                                }).addTo(makersForBasicProfile);

                                marker.circle=circle;
                            }
                        }
                    } else {
                        alert(ip.msg);
                    }
                    map.setView([lat, lng], viewZoom);
                })
                
            }

            // var subscription = instance.subscribe('findIPAddr', instance.searchIP.get());
            // if (subscription.ready()) {
            //     var ips = Inspire.Collection.IPAddr.find().fetch();
            //     ips.forEach(function(ip){
            //         if(ip.addr.lat && ip.addr.lng){
            //             if(ip.addr.lat != '*' && ip.addr.lat !='' && ip.addr.lng != '*' && ip.addr.lng != ''){
            //                 lat = ip.addr.lat;
            //                 lng = ip.addr.lng;
            //                 viewZoom = 12;

            //                 var marker = L.marker([lat, lng]).addTo(makersForBasicProfile)
            //                     .bindPopup(ip.addr.country+ip.addr.province+ip.addr.city+ip.addr.district+ip.addr.street)
            //                     .openPopup();

            //                 var circle = L.circle([lat, lng], 1000, {
            //                     color: 'red',
            //                     fillColor: '#f03',
            //                     fillOpacity: 0.3
            //                 }).addTo(makersForBasicProfile);

            //                 marker.circle=circle;
            //             }
            //         }
            //     });

            //     map.setView([lat, lng], viewZoom);
            // }
        }

    });

    instance.IPCovertToInt = function(ip) {
        ip = ip.split(".");
        var num = Number(ip[0]) * 256 * 256 * 256 + Number(ip[1]) * 256 * 256 + Number(ip[2]) * 256 + Number(ip[3]);
        num = num >>> 0;
        return num;
    };
    
    if (Session.get('clientIp') === undefined) {
        Meteor.call('clientIp', function(error, res) {
            Session.set('clientIp', res);
        });
    }
});

Template.basicProfile.rendered = function(){
    //leaflet map
    L.Icon.Default.imagePath = 'packages/bevanhunt_leaflet/images';
    var map = L.map('dmap', {
        doubleClickZoom: false
    });

    L.tileLayer.provider('OpenStreetMap.HOT').addTo(map);
    map.addLayer(makersForBasicProfile);
    this.map.set(map);
    map.setView([30, 160], 2);
    
    var instance = Template.instance();
    instance.autorun(function() {
        if (Session.get('clientIp') !== undefined) {
            instance.find('input[id=searchIP]').value = Session.get('clientIp');
            $('input[id=searchIP]').change();
        }
    });
    
    
};
