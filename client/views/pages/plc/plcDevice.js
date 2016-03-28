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
        show: true,
        trigger: 'item',
        formatter: "{b}: {c} ({d}%)"
    },
    legend: {
        show: true,
        orient: 'vertical',
        x: 'left',
        data:[]
    },
    series: [
        {
            type:'pie',
            radius: ['35%', '70%'],
            avoidLabelOverlap: false,
            itemStyle: {
                normal: {
                  label: {show:false}, 
                  labelLine: {show:false}
                }
            },
            data:[]
        }
    ]
  };
  
  this.autorun(function() {
    var data = PlcStat.find({attr: 'device'}).fetch()
    data.sort(function(a, b) {
      return b - a;
    });
    data = data.slice(0, 5);
    option.series[0].data = data;
    option.legend.data = _.pluck(data, 'name');
    chart.hideLoading();
    chart.setOption(option, true);
  })
})