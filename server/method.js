/**
 * Created by meteor on 12/20/15.
 */
Meteor.methods({
    getIPAddrCount: function () {
        return Inspire.Collection.IPAddr.find().count();
    },

    getEventAddrByIP: function(ipsrc, ipdst) {
        var srcAddr = Inspire.Collection.IPAddr.findOne({
            'ipfrom': {$lte: ipsrc},
            'ipto': {$gte: ipsrc}
        });

        var dstAddr = Inspire.Collection.IPAddr.findOne({
            'ipfrom': {$lte: ipdst},
            'ipto': {$gte: ipdst}
        });

        return { 'srcAddr': srcAddr, 'dstAddr': dstAddr};
    },

    formatDynamicEventData: function(selector, options)  {
        if (selector && selector.text && selector.text != '') {
            selector['si'] = new RegExp(selector.text,'i')
        }
        delete selector.text;

        if (!options.limit){
            options.limit = 20; //如果订阅时没有传递limit，默认只有20条
        }

        var events = Inspire.Collection.IPEvent.find(selector, options).fetch();
        var results = [];

        events.forEach(function(ipevent) {
            var srcAddr = Inspire.Collection.IPAddr.findOne({
                'ipfrom': {$lte: ipevent.ipsrc},
                'ipto': {$gte: ipevent.ipsrc}
            });

            var dstAddr = Inspire.Collection.IPAddr.findOne({
                'ipfrom': {$lte: ipevent.ipdst},
                'ipto': {$gte: ipevent.ipdst}
            });

            if(srcAddr && dstAddr){
                results.push({
                    'ipsrc': ipevent.ipsrc,
                    'ipdst': ipevent.ipdst,
                    'psrc': ipevent.portsrc,
                    'pdst': ipevent.portdst,
                    'pro': ipevent.pro,
                    'eAt': ipevent.eventAt,
                    'sAddr': {
                        'country': srcAddr.addr.country,
                        'province': srcAddr.addr.province,
                        'city': srcAddr.addr.city,
                        'lat': srcAddr.addr.lat,
                        'lng': srcAddr.addr.lng
                    },
                    'dAddr': {
                        'country': dstAddr.addr.country,
                        'province': dstAddr.addr.province,
                        'city': dstAddr.addr.city,
                        'lat': dstAddr.addr.lat,
                        'lng': dstAddr.addr.lng
                    }
                })
            }
        });

        return results;
    }
});