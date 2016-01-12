Template.webScanStatChinaOs.onCreated(function() {
    var instance = Template.instance();

    instance.autorun(function() {
        var limit = 5;
        var attr = 'os';
        var subscription = instance.subscribe('webScanStatChinaStat', {
            attr: attr,
            limit: limit,
            match: {'os': {$ne: null}}
        });
    })

});

Template.webScanStatChinaOs.onRendered(function() {

    var chart = echarts.init(document.getElementById('webScanStatChinaOsChart'));
    var chartOptions = {
        color: ["#6699FF", "#ff6666", "#3cb371", "#b8860b", "#30e0e0"],
        tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
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
        legend: {
            x: 'left',
            y: 'top',
            orient: 'vertical',
            data : []
        },
        calculable : true,
        series : [
            {
                name:'OS',
                type:'pie',
                radius : ['50%', '65%'],
                center: ['50%', '50%'],
                sort : 'ascending',
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
                                fontSize : '12',
                                fontWeight : 'bold'
                            }
                        }
                    }
                }
            }
        ]
    };

    this.autorun(function() {
        var findData = Inspire.Collection.WebScanStatChinaStat.find({attr: "os"}).fetch();
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