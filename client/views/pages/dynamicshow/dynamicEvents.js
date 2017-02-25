Template.dynamicEvents.helpers({

});

Template.dynamicEvents.rendered = function(){

};

Template.dynamicEvents.onRendered(function() {
    //1. 事件地图
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
            min : -360,
            max : 360,
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
                        return 5 + v/72
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

    //2. 事件表格
    var table = this.$('.dataTables-example').DataTable({
        "dom": 'T<"clear">lfrtip'
    });

    //3. 攻防关系
    var attRelChart = echarts.init(document.getElementById('attRelChart'));
    var attRelOption = {
        tooltip : {
            trigger: 'item',
            formatter: function (params) {
                if (params.indicator2) {    // is edge
                    return params.indicator2 + ' ' + params.name + ' ' + params.indicator;
                } else {    // is node
                    return params.name
                }
            }
        },
        toolbox: {
            show : true,
            orient : 'vertical',
            x: 'right',
            y: 'center',
            feature : {
                restore : {show: true},
                magicType: {show: true, type: ['force', 'chord']},
                saveAsImage : {show: true}
            }
        },
        legend: {
            orient : 'vertical',
            x: 'left'
        },
        series : [
            {
                type:'chord',
                sort : 'ascending',
                sortSub : 'descending',
                showScale : false,
                itemStyle : {
                    normal : {
                        label : {
                            show: false,
                            rotate : true
                        }
                    }
                }
            }
        ]
    };


    //4.攻击占比
    var attSrcChart = echarts.init(document.getElementById('attSrcChart'));
    var attSrcOption = {
        tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
            orient : 'vertical',
            x : 'left'
        },
        toolbox: {
            show : true,
            orient : 'vertical',
            x: 'right',
            y: 'center',
            feature : {
                mark : {show: true},
                dataView : {show: true, readOnly: false},
                magicType : {
                    show: true,
                    type: ['pie', 'funnel'],
                    option: {
                        funnel: {
                            x: '25%',
                            width: '50%',
                            funnelAlign: 'center',
                            max: 1548
                        }
                    }
                },
                restore : {show: true},
                saveAsImage : {show: true}
            }
        },
        calculable : true,
        series : [
            {
                name:'攻击来源',
                type:'pie',
                radius : ['50%', '70%'],
                itemStyle : {
                    normal : {
                        label : {
                            show : false
                        },
                        labelLine : {
                            show : false
                        }
                    },
                    emphasis : {
                        label : {
                            show : true,
                            position : 'center',
                            textStyle : {
                                fontSize : '30',
                                fontWeight : 'bold'
                            }
                        }
                    }
                }
            }
        ]
    };


    var instance = this;
    instance.autorun(function() {
        var selector = {};
        var options = {limit: 50, sort: {eventAt: -1}};

        Meteor.call('formatDynamicEventsFromMemory', selector, options, function (err, ipevents) {
            if(!err){
                var markLinesData = [];
                var markPointData = [];
                var geoCoord = {};
                var countrySrc = [];
                var seriesLinks = [];
                var seriesNodes = [];
                var legendData = [];

                ipevents.forEach(function(ipevent) {
                    //1. map
                    markLinesData.push([
                        {name: ipevent.sAddr.city},
                        {name: ipevent.dAddr.city, value: ipevent.dAddr.lng-ipevent.sAddr.lng}
                    ]);

                    markPointData.push({
                        name: ipevent.dAddr.city,
                        value: ipevent.dAddr.lng-ipevent.sAddr.lng
                    });

                    geoCoord[ipevent.sAddr.city] = [ipevent.sAddr.lng, ipevent.sAddr.lat];
                    geoCoord[ipevent.dAddr.city] = [ipevent.dAddr.lng, ipevent.dAddr.lat];


                    //2. table
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


                    //3. attack relation
                    seriesLinks.push({
                        source: ipevent.sAddr.country,
                        target: ipevent.dAddr.country,
                        weight: 0.9,
                        name: '攻击'
                    });

                    seriesLinks.push({
                        source: ipevent.dAddr.country,
                        target: ipevent.sAddr.country,
                        name: '攻击'
                    });

                    if(!countrySrc[ipevent.sAddr.country]){
                        countrySrc[ipevent.sAddr.country] = 1;
                        seriesNodes.push({name: ipevent.sAddr.country});
                        legendData.push(ipevent.sAddr.country);
                    }
                    else{
                        countrySrc[ipevent.sAddr.country] += 1;
                    }
                });

                var attSrcSeriesData = [];
                legendData.forEach(function(cty) {
                    attSrcSeriesData.push({value:countrySrc[cty], name:cty});
                });

                mapOption.series[0].markLine.data = markLinesData;
                mapOption.series[0].markPoint.data = markPointData;
                mapOption.series[0].geoCoord = geoCoord;
                if(ipevents.length > 500){
                    mapOption.series[0].markLine.large = true;
                    mapOption.series[0].markPoint.large = true;
                }
                map.setOption(mapOption);

                attRelOption.legend.data = legendData;
                attRelOption.series[0].links = seriesLinks;
                attRelOption.series[0].nodes = seriesNodes;
                attRelChart.setOption(attRelOption);

                attSrcOption.legend.data = legendData;
                attSrcOption.series[0].data = attSrcSeriesData;
                attSrcChart.setOption(attSrcOption);
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