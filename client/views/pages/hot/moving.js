Template.hotMoving.onCreated(function()
{
        var instance = Template.instance();
        instance.autorun(function() 
        {
            var subscriptionHotMoving = instance.subscribe('hotMoving');        
            var subscriptionGeoCoord = instance.subscribe('geoCoord');
        });    
});


Template.hotMoving.onRendered(function()
{
    this.autorun(function()
    {
        var dom = document.getElementById('mapHotMoving');
        
        var records = Inspire.Collection.HotMoving.find({}).fetch();

        var max = -1;
        for (var i = 0; i < records.length; ++i) {
            if (records[i].movingCount > max) {
                max = records[i].movingCount;
            }
        }
        var unit = max / 25;
        var planePath = 'path://M1705.06,1318.313v-89.254l-319.9-221.799l0.073-208.063c0.521-84.662-26.629-121.796-63.961-121.491c-37.332-0.305-64.482,36.829-63.961,121.491l0.073,208.063l-319.9,221.799v89.254l330.343-157.288l12.238,241.308l-134.449,92.931l0.531,42.034l175.125-42.917l175.125,42.917l0.531-42.034l-134.449-92.931l12.238-241.308L1705.06,1318.313z';
               
        var geoCoord = function (toponym)
        {
            var coord = Inspire.Collection.ToponymGeoCoord.findOne
                     ({'toponym' : toponym}, {'latitude' : 1, 'longitude' : 1});
                     
            return [coord.longitude, coord.latitude];
        };

        var convertToCoords = function (records) 
        {
            var movingCoords = [];
            
            for (var i = 0; i < records.length; ++i)
            {            
                var fromCoord = geoCoord(records[i].srcPlace);
                var toCoord = geoCoord(records[i].destPlace);
                if (fromCoord && toCoord) 
                {
                    movingCoords.push([{coord: fromCoord}, {coord: toCoord}]);
                }
            }            
            
            return movingCoords;
        };

        var lines = convertToCoords(records);
        console.log(lines);
        var seriesName = 'name';
        var color = ['#a6c84c', '#ffa022', '#46bee9'];
        var series = [];
        series.push
        ({
            name: seriesName,
            type: 'lines',
            zlevel: 1,
            effect: {
                show: true,
                period: 6,
                trailLength: 0.7,
                color: '#fff',
                symbolSize: 3
            },
            lineStyle: {
                normal: {
                    color: '#a6c84c',
                    width: 0,
                    curveness: 0.2
                }
            },
            data: lines
        },
        
        {
            name: seriesName,
            type: 'lines',
            zlevel: 2,
            effect: {
                show: true,
                period: 6,
                trailLength: 0,
                symbol: planePath,
                symbolSize: 15
            },
            lineStyle: {
                normal: {
                    color: '#a6c84c',
                    width: 1,
                    opacity: 0.4,
                    curveness: 0.2
                }
            },
            data: lines
        },
        
        {
            name: seriesName,
            type: 'effectScatter',
            coordinateSystem: 'geo',
            zlevel: 2,
            rippleEffect: {
                brushType: 'stroke'
            },
            label: {
                normal: {
                    show: false,
                    position: 'right',
                    formatter: '{b}'
                }
            },
            symbolSize: function (val) {
                return val[2] / unit;
            },
            itemStyle: {
                normal: {
                    color: '#a6c84c'
                }
            },
            data: records.map(function (record) {
                var g = geoCoord(record.destPlace);
                var ret = null;
                if (g) {
                    ret = {
                        name: record.destPlace,
                        value: g.concat([record.movingCount])
                    };
                }
                return ret;
            }).filter(function (x) {
                return x != null;
            })
        });

        var option = {
            backgroundColor: '#404a59',
            title: {
                text: '',
                subtext: '',
                left: 'center',
                textStyle: {
                    color: '#fff'
                }
            },
            tooltip: {
                trigger: 'item'
            },

            geo: {
                map: 'china',
                label: {
                    emphasis: {
                        show: false
                    }
                },
                roam: true,
                itemStyle: {
                    normal: {
                        areaColor: '#323c48',
                        borderColor: '#404a59'
                    },
                    emphasis: {
                        areaColor: '#2a333d'
                    }
                }
            },
            
            series: series
        };
        
        var chart = echarts3.init(dom);
        chart.setOption(option, true);
    });
});
