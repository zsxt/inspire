Template.webScanStatWorld.onCreated(function() {
    var instance = Template.instance();

    instance.autorun(function() {
        var limit = 260;
        var attr = 'country';
        var subscription = instance.subscribe('webScanStatWorldStat', {
            attr: attr,
            limit: limit
        });
    })

});


Template.webScanStatWorld.onRendered(function() {
    var map = echarts.init(document.getElementById('webScanWorldStatMap'));

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
                name:"数量",
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

    this.autorun(function() {
        var webScanWorld = Inspire.Collection.WebScanStatWorldStat.find({attr: 'country'}).fetch();
        console.log(webScanWorld);
        var dataArray = [];
        var maxValue = 0;
        var worldServer = 0;
        webScanWorld.forEach(function(webScan) {
            worldServer += webScan.value;

            dataArray.push({
                name: webScan.ctyen,
                value: webScan.value
            });


            if (maxValue < webScan.value) {
                maxValue = webScan.value;
            }
        });

        Session.set('webScanWorldServer', worldServer);
        Session.set('webScanWorldCountry', webScanWorld.length);

        mapOption.series[0].data = dataArray;
        mapOption.dataRange.max = parseInt(maxValue * 1.1);
        map.setOption(mapOption);
    })
});