Template.webScanStatWorldDeviceType.onCreated(function() {
    var instance = Template.instance();

    instance.autorun(function() {
        var limit = 5;
        var attr = 'devicetype';
        var subscription = instance.subscribe('webScanStatWorldStat', {
            attr: attr,
            limit: limit,
            match: {'devicetype': {$ne: null}}
        });
    })

});

Template.webScanStatWorldDeviceType.onRendered(function() {

    var chart = echarts.init(document.getElementById('webScanStatWorldDeviceTypeChart'));
    var chartOptions = {
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
                itemStyle : {
                    normal: {
                        label: {
                            show: false
                        },
                        labelLine: {
                            show: false
                        }
                    }
                },
                name:'Service',
                type:'pie',
                radius : '65%',
                center: ['50%', '50%'],
                data: []
            }
        ]
    };

    this.autorun(function() {
        var findData = Inspire.Collection.WebScanStatWorldStat.find({attr: "devicetype"}).fetch();
        if(findData.length > 0){
            var legendData = [];
            var dataValue = [];

            findData.forEach(function(webScan) {
                legendData.push(webScan.label);
                dataValue.push({value:webScan.value, name:webScan.label});
            });

            chartOptions.legend.data = legendData;
            chartOptions.series[0].data = dataValue;
            chart.setOption(chartOptions);
        }
    })
});