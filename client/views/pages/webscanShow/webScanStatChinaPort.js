Template.webScanStatChinaPort.onCreated(function() {
    var instance = Template.instance();

    instance.autorun(function() {
        var limit = 5;
        var attr = 'port';
        var subscription = instance.subscribe('webScanStatChinaStat', {
            attr: attr,
            limit: limit,
            match: {'port': {$ne: null}}
        });
    })

});

Template.webScanStatChinaPort.onRendered(function() {

    var chart = echarts.init(document.getElementById('webScanStatChinaPortChart'));
    var chartOptions = {
        color: ["#cd5c5c", "#ffa500", "#40e0d0", "#1e90ff", "#ff6347", "#7b68ee", "#00fa9a", "#ffd700"],
        tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
            x: 'left',
            y: 'top',
            orient: 'vertical',
            data: []
        },
        toolbox: {
            x: 'right',
            y: 'center',
            orient: 'vertical',
            show : true,
            feature : {
                mark : {show: true},
                dataView : {show: false, readOnly: false},
                restore : {show: true},
                saveAsImage : {show: true}
            }
        },
        calculable : true,
        series : [
            {
                name:'Port',
                type:'pie',
                radius : ['10%', '65%'],
                center: ['50%', '50%'],
                roseType : 'radius',
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
                            show : true
                        },
                        labelLine : {
                            show : true
                        }
                    }
                }
            }
        ]
    };

    this.autorun(function() {
        var findData = Inspire.Collection.WebScanStatChinaStat.find({attr: 'port'}).fetch();
        if(findData.length > 0){
            var legendData = [];
            var dataValue = [];

            findData.forEach(function(webScan) {
                legendData.push(webScan.label);
                dataValue.push({
                    value: webScan.value,
                    name: webScan.label
                });
            });

            chartOptions.legend.data = legendData;
            chartOptions.series[0].data = dataValue;
            chart.setOption(chartOptions);
        }
    })
});