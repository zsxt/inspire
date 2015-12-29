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

    this.autorun(function() {
        var worldData = Inspire.Collection.IPAddrStat.find({},{$sort: {ipcount: -1}}).fetch();
        var dataArray = [];
        var maxValue = 0;
        for (var i = 0; i < worldData.length; ++i) {
            dataArray.push({
                name: worldData[i].ctyen,
                value: worldData[i].ipcount
            });


            if (maxValue < worldData[i].ipcount) {
                maxValue = worldData[i].ipcount;
            }
        }
        mapOption.series[0].data = dataArray;
        mapOption.dataRange.max = parseInt(maxValue * 1.1);
        map.setOption(mapOption);
    })
});