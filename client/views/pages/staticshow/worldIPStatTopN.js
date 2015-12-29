Template.worldIPStatTopN.onCreated(function() {
    var instance = Template.instance();

    instance.autorun(function() {
        var limit = 20;
        var attr = 'addr.country';
        var subscription = instance.subscribe('ipAddrStat', {
            attr: attr,
            limit: limit,
            match: {'addr.countrycode': {$ne: '*'}}
        });
    })

});


Template.worldIPStatTopN.onRendered(function() {
    var barTop10 = AmCharts.makeChart("ipstattop10-world", {
        type: "serial",
        theme: "light",
        categoryField: "label",
        rotate: true,
        startDuration: 1,
        categoryAxis: {
            gridPosition: "start",
            position: "left"
        },
        trendLines: [],
        graphs: [
            {
                "balloonText": "[[label]]:[[value]]万",
                "fillAlphas": 0.8,
                "id": "AmGraph-2",
                "lineAlpha": 0.2,
                "title": "数量",
                "type": "column",
                "valueField": "value"
            }
        ],
        guides: [],
        valueAxes: [
            {
                id: "ValueAxis-1",
                position: "top",
                axisAlpha: 0
            }
        ],
        allLabels: [],
        balloon: {},
        titles: [],
        export: {
            enabled: false
        }
    });
    barTop10.validateNow();

    this.autorun(function() {
        var worldData = Inspire.Collection.IPAddrStat.find({},{$sort: {ipcount: -1}, limit: 10}).fetch();
        var dataTop10 = [];
        for (var i = 0; i < worldData.length; ++i) {
            dataTop10.push({
                label: worldData[i].label,
                value: worldData[i].ipcount
            })
        }
        barTop10.dataProvider = dataTop10;
        barTop10.validateData();
    })
});