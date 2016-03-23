Template.plcProvince.onCreated(function() {
  var instance = Template.instance();
  instance.autorun(function() {
    instance.subscribe('plcStat', {attr: 'province'});
  })
});

Template.plcProvince.onRendered(function() {
  var chart = echarts.init(document.getElementById('province'))
  var option = {
      tooltip : {
          trigger: 'item'
      },
      toolbox: {
          show : false,
          feature : {
              mark : {show: true},
              dataView : {show: true, readOnly: false},
              magicType: {show: true, type: ['line', 'bar']},
              restore : {show: true},
              saveAsImage : {show: true}
          }
      },
      xAxis : [
          {
              type : 'value',
              boundaryGap : [0, 0.01]
          }
      ],
      yAxis : [
          {
              type : 'category',
              data : ['']
          }
      ],
      series : [
          {
              type:'bar',
              data:[0],
              name: '数量',
              itemStyle: {
                  normal: {
                      color: '#27ae60'
                  }
              },
          }
      ]
  };
  
  this.autorun(function() {
    var data = PlcStat.find({attr: 'province'}).fetch()
    data.sort(function(a, b) {
      return b.value - a.value;
    });
    data = data.slice(0, 10).reverse();
    option.yAxis[0].data = _.pluck(data, 'name');
    option.series[0].data = _.pluck(data, 'value');
    chart.hideLoading();
    chart.setOption(option, true);
  })
})