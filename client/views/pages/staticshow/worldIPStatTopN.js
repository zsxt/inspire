Template.worldIPStatTopN.helpers({
    worldIPTop8: function(){
        return Inspire.Collection.IPAddrStat.find({attr: "addr.country"},{$sort: {ipseg: -1}, limit: 8}).fetch();
    },

    fixNumber: function(num){
        if(num){
            return num.toFixed(2);
        }
    }
});

Template.worldIPStatTopN.onCreated(function() {
    var instance = Template.instance();

    //instance.autorun(function() {
    //    var limit = 20;
    //    var attr = 'addr.country';
    //    var subscription = instance.subscribe('ipAddrStat', {
    //        attr: attr,
    //        limit: limit,
    //        match: {'addr.countrycode': {$ne: '*'}}
    //    });
    //})

});


Template.worldIPStatTopN.onRendered(function() {
    var barTop10 = AmCharts.makeChart("ipstattop10-world", {
        "type": "serial",
        "theme": "light",
        "legend": {
            "useGraphSettings": true,
            "markerSize":12,
            "valueWidth":0,
            "verticalGap":0
        },
        "valueAxes": [{
            "position": "top",
            "axisAlpha":0,
            "gridAlpha": 0
        }],
        "startDuration": 1,
        "graphs": [{
            "balloonText": "[[ipcount]]万",
            "title": "IP数量",
            "type": "column",
            "fillAlphas": 0.8,
            "valueField": "ipcount"
        }, {
            "balloonText": "[[ipseg]]",
            "bullet": "round",
            "bulletBorderAlpha": 1,
            "bulletColor": "#FFFFFF",
            "useLineColorForBulletBorder": true,
            "fillAlphas": 0,
            "lineThickness": 2,
            "lineAlpha": 1,
            "bulletSize": 7,
            "title": "段数",
            "valueField": "ipseg"
        }],
        "rotate": true,
        "categoryField": "label",
        "categoryAxis": {
            "gridPosition": "start"
        },
        export: {
            enabled: false
        }
    });
    barTop10.validateNow();

    this.autorun(function() {
        var worldData = Inspire.Collection.IPAddrStat.find({attr: "addr.country"},{$sort: {ipcount: -1}, limit: 10}).fetch();
        var dataTop10 = [];
        for (var i = 0; i < worldData.length; ++i) {
            dataTop10.push({
                label: worldData[i].label,
                ipcount: worldData[i].ipcount,
                ipseg: worldData[i].ipseg
            })
        }
        barTop10.dataProvider = dataTop10;
        barTop10.validateData();
    })
});