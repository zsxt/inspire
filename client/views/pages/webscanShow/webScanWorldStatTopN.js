Template.webScanWorldStatTopN.helpers({
    webScanWorldDetail: function(){
        return Inspire.Collection.WebScanStatWorldStat.find({attr: "country"}).fetch();
    },

    fixNumber: function(num){
        if(num){
            return num.toFixed(2);
        }
    }
});

Template.webScanWorldStatTopN.onCreated(function() {
    var instance = Template.instance();
});


Template.webScanWorldStatTopN.onRendered(function() {
    this.$('.full-height-scroll').slimscroll({
        height: '300px',
        railOpacity: 1,
        color: '#cccccc',
        opacity: 1,
        alwaysVisible: true,
        allowPageScroll: false
    });

    var barTop10 = AmCharts.makeChart("webScanWorldStatTop10", {
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
            "balloonText": "[[value]] 万",
            "title": "数量(万)",
            "type": "column",
            "fillAlphas": 0.8,
            "valueField": "value"
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
        var worldData = Inspire.Collection.WebScanStatWorldStat.find({attr: "country"},{limit: 10}).fetch();
        var dataTop10 = [];
        for (var i = 0; i < worldData.length; ++i) {
            dataTop10.push({
                label: worldData[i].label,
                value: worldData[i].value / 10000
            })
        }
        barTop10.dataProvider = dataTop10;
        barTop10.validateData();
    })
});