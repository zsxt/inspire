Template.worldIPStat.onCreated(function() {
    var instance = Template.instance();

    instance.autorun(function() {
        var limit = 240;
        var attr = 'addr.country';
        var subscription = instance.subscribe('ipAddrStat', {
            attr: attr,
            limit: limit,
            match: {'addr.countrycode': {$ne: '*'}}
        });

        //if (subscription.ready()) {
            //var worldIPAddr = Inspire.Collection.IPAddrStat.find({attr: attr}).fetch();
            //console.log(worldIPAddr);
            //var data = [];
            //var labelClass = ['success', 'info', 'primary', 'default', 'primary'];
            //for(var i=0; i<ipEventSrc.length; i++){
            //    data.push({
            //        number: i+1,
            //        count: ipEventSrc[i].value,
            //        labelClass: labelClass[i],
            //        ipsrc: ipEventSrc[i].name
            //    });
            //}

            //instance.ipSrc.set(data);
        //}
    })

});


Template.worldIPStat.onRendered(function() {
    var map = echarts.init(document.getElementById('ipstatmap-world'));

    var mapOption = {
        tooltip : {
            trigger: 'item'
        },
        toolbox: {
            show : true,
            orient : 'vertical',
            x: 'right',
            y: 'center',
            feature : {
                mark : {show: true},
                dataView : {show: false, readOnly: false},
                restore : {show: true},
                saveAsImage : {show: true}
            }
        },
        dataRange: {
            //show: false,
            min: 0,
            max: 1000000,
            text:['高','低'],
            realtime: false,
            calculable : true,
            color: ['orangered','yellow','lightskyblue'],
            orient: 'vertical',
            x: 'left',
            y: 'bottom',
            precision: 2
        },
        series : [
            {
                name:"数量(万)",
                type:"map",
                mapType: 'world',
                //selectedMode: 'single',
                roam: true,
                //mapLocation: {
                //    y : 100
                //},
                itemStyle:{
                    emphasis:{label:{show:true}}
                },
                "data":[]
            }
        ]
    };

    var barTop10 = AmCharts.makeChart("ipstattop10-world", {
        type: "serial",
        theme: "light",
        categoryField: "country",
        rotate: true,
        startDuration: 1,
        categoryAxis: {
            gridPosition: "start",
            position: "left"
        },
        trendLines: [],
        graphs: [
            {
                "balloonText": "[[country]]:[[count]]",
                "fillAlphas": 0.8,
                "id": "AmGraph-2",
                "lineAlpha": 0.2,
                "title": "数量",
                "type": "column",
                "valueField": "count"
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
        var worldData = Inspire.Collection.IPAddrStat.find({},{$sort: {ipcount: -1}}).fetch();
        var dataArray = [];
        var dataTop10 = [];
        var maxValue = 0;
        for (var i = 0; i < worldData.length; ++i) {
            dataArray.push({
                name: worldData[i].ctyen,
                value: worldData[i].ipcount
            });

            if(i<10){
                dataTop10.push({
                    country: worldData[i].label,
                    count: worldData[i].ipcount
                });
            }

            if (maxValue < worldData[i].ipcount) {
                maxValue = worldData[i].ipcount;
            }
        }
        mapOption.series[0].data = dataArray;
        mapOption.dataRange.max = parseInt(maxValue * 1.1);
        map.setOption(mapOption);

        if(dataTop10.length > 0){
            barTop10.dataProvider = dataTop10;
            barTop10.validateData();
        }
    })
});