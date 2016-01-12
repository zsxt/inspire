Template.webScanStatWorldService.onCreated(function() {
    var instance = Template.instance();

    instance.autorun(function() {
        var limit = 5;
        var attr = 'service';
        var subscription = instance.subscribe('webScanStatWorldStat', {
            attr: attr,
            limit: limit
        });
    })

});

Template.webScanStatWorldService.onRendered(function() {

    var chart = echarts.init(document.getElementById('webScanStatWorldServiceChart'));
    var chartOptions = {
        tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        //legend: {
        //    orient : 'vertical',
        //    x : 'left',
        //    data: []
        //},
        toolbox: {
            x: 'right',
            y: 'bottom',
            show : true,
            feature : {
                mark : {show: true},
                dataView : {show: true, readOnly: false},
                restore : {show: true},
                saveAsImage : {show: true}
            }
        },
        calculable : true,
        series : [
            {
                name:'Service',
                type:'pie',
                radius : '65%',
                center: ['50%', '45%'],
                data: []
            }
        ]
    };

    this.autorun(function() {
        var findData = Inspire.Collection.WebScanStatWorldStat.find({attr: "service"}).fetch();
        if(findData.length > 0){
            var legendData = [];
            var dataValue = [];

            findData.forEach(function(webScan) {
                //legendData.push(webScan.label);
                dataValue.push({value:webScan.value, name:webScan.label});
            });

            //chartOptions.legend.data = legendData;
            chartOptions.series[0].data = dataValue;
            chart.setOption(chartOptions);
        }
    })
});