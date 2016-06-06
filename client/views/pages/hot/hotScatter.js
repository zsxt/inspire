Template.hotScatter.onCreated(function () {
    var instance = Template.instance();
    instance.autorun(function () {
        var subscriptionHotScatter = instance.subscribe('hotscatterpoint');
    });
});

Template.hotScatter.onRendered(function () {
    var dom = document.getElementById('scatter');
    var scatterMap = echarts3.init(dom);
    var mapOption = {
        backgroundColor: '#404a59',
        title: {
            text: '',
            subtext: 'From ThinkGIS',
            sublink: 'http://www.thinkgis.cn/public/sina',
            left: 'center',
            top: 'top',
            textStyle: {
                color: '#fff'
            }
        },
        legend: {
            left: 'left',
            data: ['强', '中', '弱'],
            textStyle: {
                color: '#ccc'
            }
        },
        geo: {
            name: '强',
            type: 'scatter',
            map: 'china',
            label: {
                emphasis: {
                    show: false
                }
            },
            itemStyle: {
                normal: {
                    areaColor: '#323c48',
                    borderColor: '#111'
                },
                emphasis: {
                    areaColor: '#2a333d'
                }
            }
        },
        series: [{
            name: '弱',
            type: 'scatter',
            coordinateSystem: 'geo',
            symbolSize: 1,
            large: true,
            itemStyle: {
                normal: {
                    shadowBlur: 2,
                    shadowColor: 'rgba(37, 140, 249, 0.8)',
                    color: 'rgba(37, 140, 249, 0.8)'
                }
            },
            data: []
        }, {
                name: '中',
                type: 'scatter',
                coordinateSystem: 'geo',
                symbolSize: 1,
                large: true,
                itemStyle: {
                    normal: {
                        shadowBlur: 2,
                        shadowColor: 'rgba(14, 241, 242, 0.8)',
                        color: 'rgba(14, 241, 242, 0.8)'
                    }
                },
                data: []
            }, {
                name: '强',
                type: 'scatter',
                coordinateSystem: 'geo',
                symbolSize: 1,
                large: true,
                itemStyle: {
                    normal: {
                        shadowBlur: 2,
                        shadowColor: 'rgba(255, 255, 255, 0.8)',
                        color: 'rgba(255, 255, 255, 0.8)'
                    }
                },
                data: []
            }]
    }
    this.autorun(function () {
        var heatdata = HotScatter.findOne();
        if (heatdata) {
            heatdata = heatdata.data;
            var weiboData = [
                heatdata.slice(0, ~~(heatdata.length * 0.6)),
                heatdata.slice(~~(heatdata.length * 0.6), ~~(heatdata.length * 0.9)),
                heatdata.slice(~~(heatdata.length * 0.9))
            ]
            for (var i = 0; i < 3; ++i) {
                mapOption.series[i].data = weiboData[i];
            }
        }
        scatterMap.setOption(mapOption, true);
    });

});