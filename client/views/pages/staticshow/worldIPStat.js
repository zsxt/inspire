Template.worldIPStat.rendered = function(){
    //统计图标1
    var barData = {
        labels: ["January", "February", "March", "April", "May", "June", "July"],
        datasets: [
            {
                label: "My First dataset",
                fillColor: "rgba(220,220,220,0.5)",
                strokeColor: "rgba(220,220,220,0.8)",
                highlightFill: "rgba(220,220,220,0.75)",
                highlightStroke: "rgba(220,220,220,1)",
                data: [65, 59, 80, 81, 56, 55, 40]
            },
            {
                label: "My Second dataset",
                fillColor: "rgba(26,179,148,0.5)",
                strokeColor: "rgba(26,179,148,0.8)",
                highlightFill: "rgba(26,179,148,0.75)",
                highlightStroke: "rgba(26,179,148,1)",
                data: [28, 48, 40, 19, 86, 27, 90]
            }
        ]
    };

    var barOptions = {
        scaleBeginAtZero: true,
        scaleShowGridLines: true,
        scaleGridLineColor: "rgba(0,0,0,.05)",
        scaleGridLineWidth: 1,
        barShowStroke: true,
        barStrokeWidth: 2,
        barValueSpacing: 5,
        barDatasetSpacing: 1,
        responsive: true
    };


    var ctx = document.getElementById("barChart").getContext("2d");
    var myNewChart = new Chart(ctx).Bar(barData, barOptions);
};

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
        tooltip: {
            trigger: 'item'
        },
        dataRange: {
            //show: false,
            min: 0,
            max: 1000000,
            text:['High','Low'],
            realtime: false,
            calculable : true,
            color: ['orangered','yellow','lightskyblue']
        },
        series : [
            {
                "name":"数量",
                "type":"map",
                "mapType": 'world',
                selectedMode: 'single',
                roam: true,
                mapLocation: {
                    y : 60
                },
                itemStyle:{
                    emphasis:{label:{show:true}}
                },
                "data":[]
            }
        ]
    };

    this.autorun(function() {
        var worldData = Inspire.Collection.IPAddrStat.find().fetch();
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