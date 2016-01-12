Template.webScanStatWorldProduct.onCreated(function() {
    var instance = Template.instance();

    instance.autorun(function() {
        var limit = 5;
        var attr = 'product';
        var subscription = instance.subscribe('webScanStatWorldStat', {
            attr: attr,
            limit: limit
        });
    })

});

Template.webScanStatWorldProduct.onRendered(function() {

    var chart = echarts.init(document.getElementById('webScanStatWorldProductChart'));
    var chartOptions = {
        color: ["#6699FF", "#ff6666", "#3cb371", "#b8860b", "#30e0e0"],
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
                dataView : {show: true, readOnly: false},
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