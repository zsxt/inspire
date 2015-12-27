Template.dynamicEventIPSrcStat.helpers({
    dynamicEventIPSrc :function(){
        return Template.instance().ipSrc.get();
    },

    intCovertToIPString: function(num){
        var str;
        var tt = new Array();
        tt[0] = (num >>> 24) >>> 0;
        tt[1] = ((num << 8) >>> 24) >>> 0;
        tt[2] = (num << 16) >>> 24;
        tt[3] = (num << 24) >>> 24;
        str = String(tt[0]) + "." + String(tt[1]) + "." + String(tt[2]) + "." + String(tt[3]);
        return str;
    }

});

Template.dynamicEventIPSrcStat.onCreated(function() {
    var instance = Template.instance();
    instance.ipSrc = new ReactiveVar();

    instance.autorun(function() {
        var limit = 5;
        var attr = 'ipsrc';
        var subscription = instance.subscribe('ipEventStat', {
            attr: attr,
            limit: limit
        });

        if (subscription.ready()) {
            var ipEventSrc = Inspire.Collection.IPEventStat.find({attr: attr}).fetch();
            var data = [];
            var labelClass = ['success', 'info', 'primary', 'default', 'primary'];
            for(var i=0; i<ipEventSrc.length; i++){
                data.push({
                    number: i+1,
                    count: ipEventSrc[i].value,
                    labelClass: labelClass[i],
                    ipsrc: ipEventSrc[i].name
                });
            }

            instance.ipSrc.set(data);
        }
    })

});



Template.dynamicEventIPSrcElement.helpers({
    intCovertToIPString: function(num){
        var str;
        var tt = new Array();
        tt[0] = (num >>> 24) >>> 0;
        tt[1] = ((num << 8) >>> 24) >>> 0;
        tt[2] = (num << 16) >>> 24;
        tt[3] = (num << 24) >>> 24;
        str = String(tt[0]) + "." + String(tt[1]) + "." + String(tt[2]) + "." + String(tt[3]);
        return str;
    }
});

