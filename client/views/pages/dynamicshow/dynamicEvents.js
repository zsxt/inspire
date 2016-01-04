Template.dynamicEvents.helpers({

});

Template.dynamicEvents.rendered = function(){

};

Template.dynamicEvents.onRendered(function() {
    var map = echarts.init(document.getElementById('dynamicEventsMap'));

    var mapOption = {
        backgroundColor: 'rgba(4,64,93,1)',
        color: ['gold','aqua','lime'],

        tooltip : {
            trigger: 'item',
            formatter: '{b}'
        },

        toolbox: {
            show : true,
            orient : 'vertical',
            x: 'right',
            y: 'center',
            feature : {
                mark : {show: true},
                dataView : {show: true, readOnly: false},
                restore : {show: true},
                saveAsImage : {show: true}
            }
        },

        dataRange: {
            min : -180,
            max : 180,
            calculable : true,
            color: ['#ff3333', 'orange', 'yellow','lime','aqua', 'aliceblue'],
            textStyle:{
                color:'#fff'
            }
        },

        series : [
            {
                name: '网络事件',
                type: 'map',
                roam: true,
                hoverable: false,
                mapType: 'world',
                itemStyle:{
                    normal:{
                        borderColor:'rgba(100,149,237,1)',
                        borderWidth:0.5,
                        areaStyle:{
                            color: 'rgba(0,72,130,1)'
                        }
                    }
                },
                data:[],
                markLine : {
                    smooth:true,
                    effect : {
                        show: true,
                        scaleSize: 1,
                        period: 30,
                        color: '#fff',
                        shadowBlur: 10
                    },
                    itemStyle : {
                        normal: {
                            label:{show:false},
                            borderWidth:1,
                            lineStyle: {
                                type: 'solid',
                                shadowBlur: 5
                            }
                        }
                    }
                },
                markPoint : {
                    symbol: 'emptyCircle',
                    symbolSize : function (v){
                        return 5 + v/36
                    },
                    effect : {
                        show: true,
                        shadowBlur : 0
                    },
                    itemStyle:{
                        normal:{
                            label:{show:false}
                        },
                        emphasis: {
                            label:{position:'top'}
                        }
                    }
                }
            }
        ]
    };

    var table = this.$('.dataTables-example').DataTable({
        "dom": 'T<"clear">lfrtip'
    });

    var instance = this;
    instance.autorun(function() {
        var selector = {};
        var options = {limit: 20, sort: {eventAt: -1}};

        Meteor.call('formatDynamicEventsFromMemory', selector, options, function (err, ipevents) {
            if(!err){
                var markLinesData = [];
                var markPointData = [];
                var geoCoord = {};
                var countrySrc = [];
                var countryDst = [];

                ipevents.forEach(function(ipevent) {
                    markLinesData.push([
                        {name: ipevent.sAddr.city},
                        {name: ipevent.dAddr.city, value: ipevent.dAddr.lng}
                    ]);

                    markPointData.push({
                        name: ipevent.dAddr.city,
                        value: ipevent.dAddr.lng
                    });

                    geoCoord[ipevent.sAddr.city] = [ipevent.sAddr.lng, ipevent.sAddr.lat];
                    geoCoord[ipevent.dAddr.city] = [ipevent.dAddr.lng, ipevent.dAddr.lat];

                    table.row.add( [
                        ipevent.eAt.toLocaleString(),
                        instance.intCovertToIPString(ipevent.ipsrc),
                        ipevent.psrc,
                        instance.intCovertToIPString(ipevent.ipdst),
                        ipevent.pdst,
                        ipevent.pro,
                        ipevent.sAddr.country+'-'+ipevent.sAddr.province+'-' +ipevent.sAddr.city,
                        ipevent.dAddr.country+'-'+ipevent.dAddr.province+'-' +ipevent.dAddr.city
                    ] ).draw( false );

                    if(!countrySrc[ipevent.sAddr.country]){
                        countrySrc[ipevent.sAddr.country] = 1;
                    }
                    else{
                        countrySrc[ipevent.sAddr.country] += 1;
                    }

                    if(!countryDst[ipevent.dAddr.country]){
                        countryDst[ipevent.dAddr.country] = 1;
                    }
                    else{
                        countryDst[ipevent.dAddr.country] += 1;
                    }
                });

                console.log(countrySrc);
                console.log(countryDst);

                mapOption.series[0].markLine.data = markLinesData;
                mapOption.series[0].markPoint.data = markPointData;
                mapOption.series[0].geoCoord = geoCoord;
                if(ipevents.length > 500){
                    mapOption.series[0].markLine.large = true;
                    mapOption.series[0].markPoint.large = true;
                }
                map.setOption(mapOption);
            }
        });

    });

    instance.intCovertToIPString = function(num){
        var str;
        var tt = new Array();
        tt[0] = (num >>> 24) >>> 0;
        tt[1] = ((num << 8) >>> 24) >>> 0;
        tt[2] = (num << 16) >>> 24;
        tt[3] = (num << 24) >>> 24;
        str = String(tt[0]) + "." + String(tt[1]) + "." + String(tt[2]) + "." + String(tt[3]);
        return str;
    }
});

Template.dynamicEvents.onCreated(function() {
    var instance = Template.instance();
});