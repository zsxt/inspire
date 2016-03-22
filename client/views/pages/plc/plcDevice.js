Template.plcDevice.onCreated(function() {
  var instance = Template.instance();
  instance.autorun(function() {
    instance.subscribe('plcStat', {attr: 'device'});
  })
});

Template.plcDevice.onRendered(function() {
  var chart = echarts.init(document.getElementById('device'))
  var option = {
    tooltip: {
        show: false,
        trigger: 'item',
        formatter: "{b}: {c} ({d}%)"
    },
    legend: {
        show: false,
        orient: 'vertical',
        x: 'left',
        data:[]
    },
    series: [
        {
            type:'pie',
            radius: ['35%', '70%'],
            avoidLabelOverlap: false,
            label: {
                normal: {
                    show: false,
                    position: 'center'
                },
                emphasis: {
                    show: true,
                    textStyle: {
                        fontSize: '30',
                        fontWeight: 'bold'
                    }
                }
            },
            labelLine: {
                normal: {
                    show: false
                }
            },
            data:[]
        }
    ]
  };
  
  this.autorun(function() {
    var data = PlcStat.find({attr: 'device'}).fetch()
    // var cats = _.pluck(data, 'name');
    // option.legend.data = cats;
    option.series[0].data = data;
    chart.hideLoading();
    chart.setOption(option, true);
  })
})