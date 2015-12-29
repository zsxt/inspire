Template.chinaIPStat.onRendered(function() {
    var map = echarts.init(document.getElementById('ipstatmap-china'));

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
            max: 10000,
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
                mapType: 'china',
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
        var chinaData = Inspire.Collection.IPAddrStat.find({attr: "addr.province"},{$sort: {ipcount: -1}}).fetch();
        var dataArray = [];
        var maxValue = 0;
        for (var i = 0; i < chinaData.length; ++i) {
            dataArray.push({
                name: chinaData[i].label,
                value: chinaData[i].ipcount
            });


            if (maxValue < chinaData[i].ipcount) {
                maxValue = chinaData[i].ipcount;
            }
        }
        mapOption.series[0].data = dataArray;
        mapOption.dataRange.max = parseInt(maxValue * 1.1);
        map.setOption(mapOption);
    })
});

Template.chinaIPStat.onCreated(function() {
    var instance = Template.instance();

    instance.autorun(function() {
        var limit = 35;
        var attr = 'addr.province';
        var subscription = instance.subscribe('ipAddrStat', {
            attr: attr,
            limit: limit,
            match: {'addr.country': '中国'}
        });

        if (subscription.ready()) {
            var chinaIP = Inspire.Collection.IPAddrStat.find({attr: attr}).fetch();

            var allIPCount = 0;
            var allIPSeg = 0;
            chinaIP.forEach(function(ip) {
                allIPCount += ip.ipcount;
                allIPSeg += ip.ipseg;
            });

            Session.set('chinaIPCount', allIPCount);
            Session.set('chinaIPSeg', allIPSeg);
        }
    })

});