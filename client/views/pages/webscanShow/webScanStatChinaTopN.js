Template.webScanStatChinaTopN.onRendered(function() {

    var barTop10 = AmCharts.makeChart("webScanStatChinaTop10", {
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
            "title": "数量(万)"
        }],
        graphs: [{
            alphaField: "alpha",
            "balloonText": "[[value]] 万",
            "dashLengthField": "dashLength",
            "fillAlphas": 0.7,
            "legendValueText": "[[value]] 万",
            "title": "数量(万)",
            "type": "column",
            "valueField": "value",
            "valueAxis": "distanceAxis"
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
        var chinaData = Inspire.Collection.WebScanStatChinaStat.find({attr: "region"},{limit:10}).fetch();
        var dataTop10 = [];
        for (var i = 0; i < chinaData.length; ++i) {
            dataTop10.push({
                label: chinaData[i].label,
                value: chinaData[i].value / 10000
            })
        }
        barTop10.dataProvider = dataTop10;
        barTop10.validateData();
    })
});