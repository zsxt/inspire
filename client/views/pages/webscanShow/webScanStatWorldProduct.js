Template.webScanStatWorldProduct.onCreated(function() {
    var instance = Template.instance();

    instance.autorun(function() {
        var limit = 5;
        var attr = 'product';
        var subscription = instance.subscribe('webScanStatWorldStat', {
            attr: attr,
            limit: limit,
            match: {'product': {$ne: null}}
        });
    })

});

Template.webScanStatWorldProduct.onRendered(function() {

    var chart = echarts.init(document.getElementById('webScanStatWorldProductChart'));
    var chartOptions = {
        color: ["#87cefa", "#da70d6", "#32cd32", "#6495ed", "#ff69b4", "#ba55d3", "#cd5c5c"],
        tooltip : {
            trigger: 'axis'
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
        polar : [
            {
                indicator : [],
                center: ['50%', '50%']
            }
        ],
        series : [
            {
                name: '服务器比例',
                type: 'radar',
                itemStyle: {
                    normal: {
                        areaStyle: {
                            type: 'default'
                        }
                    }
                },
                data : [
                    {
                        value : [],
                        name : 'Product'
                    }
                ]
            }
        ]
    };

    this.autorun(function() {
        var findData = Inspire.Collection.WebScanStatWorldStat.find({attr: "product"}).fetch();
        var polarIndicator = [];
        var dataValue = [];
        var maxValue = 0;
        findData.forEach(function(webScan) {
            if(maxValue < webScan.value){
                maxValue = webScan.value;
            }
        });

        findData.forEach(function(webScan) {
            polarIndicator.push({
                text: webScan.label,
                max: maxValue
            });

            dataValue.push(webScan.value);
        });

        chartOptions.polar[0].indicator = polarIndicator;
        chartOptions.series[0].data[0].value = dataValue;
        chart.setOption(chartOptions);
    })
});