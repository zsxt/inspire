Template.worldIPStat.onCreated(function() {
    var instance = Template.instance();

    instance.autorun(function() {
        var limit = 260;
        var attr = 'addr.country';
        var subscription = instance.subscribe('ipAddrStat', {
            attr: attr,
            limit: limit,
            match: {'addr.countrycode': {$ne: '*'}}
        });
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
        var worldIP = Inspire.Collection.IPAddrStat.find({attr: "addr.country"},{$sort: {ipcount: -1}}).fetch();
        var dataArray = [];
        var maxValue = 0;
        var allIPCount = 0;
        var allIPSeg = 0;
        worldIP.forEach(function(ip) {
            allIPCount += ip.ipcount;
            allIPSeg += ip.ipseg;

            dataArray.push({
                name: ip.ctyen,
                value: ip.ipcount
            });


            if (maxValue < ip.ipcount) {
                maxValue = ip.ipcount;
            }
        });

        Session.set('worldIPCount', allIPCount);
        Session.set('worldIPSeg', allIPSeg);

        mapOption.series[0].data = dataArray;
        mapOption.dataRange.max = parseInt(maxValue * 1.1);
        map.setOption(mapOption);
    })
});