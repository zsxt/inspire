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
    }
});