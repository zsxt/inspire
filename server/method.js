/**
 * Created by meteor on 12/20/15.
 */
//地址库数据缓存到内存里，加快加载速度
Inspire.IPAddrData = Inspire.Collection.IPAddr.find({},{
    fields: {ipfrom: 1, ipto: 1, addr: 1}
}).fetch();

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

    formatDynamicEventsFromMemory: function(selector, options)  {
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
            var srcAddr = undefined;
            var dstAddr = undefined;
            var findSrc = false;
            var findDst = false;

            for(var i=0;i<Inspire.IPAddrData.length;i++){
                if(Inspire.IPAddrData[i].ipfrom <= ipevent.ipsrc && Inspire.IPAddrData[i].ipto >= ipevent.ipsrc && findSrc == false){
                    srcAddr = Inspire.IPAddrData[i];
                    findSrc = true;
                }

                if(Inspire.IPAddrData[i].ipfrom <= ipevent.ipdst && Inspire.IPAddrData[i].ipto >= ipevent.ipdst && findDst == false){
                    dstAddr = Inspire.IPAddrData[i];
                    findDst = true;
                }

                if(findSrc==true && findDst == true){
                    break;
                }
            }

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
    },

    formatDynamicEventsFromDB: function(selector, options)  {
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
    },

    getIPEventCount: function (selector) {
        if (selector && selector.text && selector.text != '') {
            selector['si'] = new RegExp(selector.text,'i')
        }
        delete selector.text;

        return Inspire.Collection.IPEvent.find(selector).count();
    }
});