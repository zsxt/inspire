Template.chinaIPStatTopN.helpers({
    chinaIPTop8: function(){
        return Inspire.Collection.IPAddrStat.find({attr: "addr.province"},{$sort: {ipseg: -1}, limit: 8}).fetch();
    },

    fixNumber: function(num){
        if(num){
            return num.toFixed(2);
        }
    }
});

Template.chinaIPStatTopN.onCreated(function() {
    //var instance = Template.instance();

    //instance.autorun(function () {
    //    var limit = 34;
    //    var attr = 'addr.province';
    //    var subscription = instance.subscribe('ipAddrStat', {
    //        attr: attr,
    //        limit: limit,
    //        match: {'addr.country': '中国'}
    //    });

    //});
});

Template.chinaIPStatTopN.onRendered(function() {
    var barTop10 = AmCharts.makeChart("ipstattop10-china", {
        type: "serial",
        theme: "light",
        legend: {
            equalWidths: false,
            useGraphSettings: true,
            valueAlign: "left",
            valueWidth: 120
        },
        valueAxes: [{
            "id": "distanceAxis",
            "axisAlpha": 0,
            "gridAlpha": 0,
            "position": "left",
            "title": "IP数量"
        }],
        graphs: [{
            alphaField: "alpha",
            "balloonText": "[[ipcount]] 万",
            "dashLengthField": "dashLength",
            "fillAlphas": 0.7,
            "legendValueText": "[[ipcount]] 万",
            "title": "COUNT",
            "type": "column",
            "valueField": "ipcount",
            "valueAxis": "distanceAxis"
        }, {
            "bullet": "square",
            "bulletBorderAlpha": 1,
            "bulletBorderThickness": 1,
            "dashLengthField": "dashLength",
            "legendValueText": "[[ipseg]]",
            "title": "IP数量",
            "fillAlphas": 0,
            "valueField": "ipseg"
        }],
        "chartCursor": {
            "cursorAlpha": 0.1,
            "cursorColor":"#000000",
            "fullWidth":true,
            "valueBalloonsEnabled": false,
            "zoomable": false
        },
        categoryField: "label",
        categoryAxis: {
            gridPosition: "start",
            position: "left",
            autoGridCount: false,
            axisColor: "#555555",
            gridAlpha: 0.1,
            gridColor: "#FFFFFF",
            gridCount: 50
        },
        export: {
            enabled: false
        }
    });
    barTop10.validateNow();

    this.autorun(function() {
        var worldData = Inspire.Collection.IPAddrStat.find({attr: "addr.province"},{$sort: {ipcount: -1}, limit: 10}).fetch();
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