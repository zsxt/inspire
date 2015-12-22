Template.BaxxGeoChart.onCreated(function() {
  var instance = this
  // var subAll = instance.subscribe('baxx_geo_stat_all')

  instance.region = new ReactiveVar(0)
  instance.start = new ReactiveVar('')
  instance.end = new ReactiveVar('')
  instance.autorun(function() {
    var region = instance.region.get()
    var level = 'shi'
      var sub = instance.subscribe('baxx_geo_stat', {
      context: instance.data.context,
      region: region,
      level: level,
      start: instance.start.get(),
      end: instance.end.get()
    })
  })
  // instance.subscribe('baxx_geo_stat', {context: 'zt'})
})

Template.BaxxGeoChart.onRendered(function() {
  var self = this
  var context = this.data.context
  console.log(context)
  var map = echarts.init(document.getElementById('chart-map-' + this.data.context))
  var bar = echarts.init(document.getElementById('chart-map-bar-' + this.data.context))
  bar.showLoading({
    text: 'spin',
    effect: 'spin',
    textStyle: {
      fontSize: 20
    }
  })
  var mapOption = {
    tooltip: {
        trigger: 'item'
    },
    dataRange: {
        min: 0,
        max: 2500,
        x: 'left',
        y: 'bottom',
        text:['高','低'],           // 文本，默认为数值文本
        calculable : true
    },
    series : [
        {
            "name":"数量",
            "type":"map",
            "mapType": 'china',
            selectedMode: 'single',
            itemStyle:{
                normal:{label:{show:true}},
                emphasis:{label:{show:true}}
            },
            "data":[]
        }
    ]
  }
  var barOption = {
    title: {
        text: '主体数量'
    },
    tooltip: {
        trigger: 'axis'
    },
    xAxis: [
        {
            type: 'category',
            data: []
        }
    ],
    yAxis: [
        {
            type: 'value'
        }
    ],
    series: [
        {
            name: '域名数量',
            type: 'bar',
            data: []
        }
    ]
  }
  function extractBarOption(data) {
      var cats = [], values = [];
      data.slice(0, 10).forEach(function(e) {
          cats.push(e.name);
          values.push(e.value);
      });
      barOption.xAxis[0].data = cats;
      barOption.series[0].data = values;
      return barOption;
  }

  var begin = 0
  var chinaData
  Meteor.subscribe('baxx_geo_stat', {context: 'zt'}, function() {
  // self.autorun(function() {
    chinaData = BaxxGeoStat.find({context: 'zt', region: 0}).fetch()
    console.log(chinaData)
    var maxValue = 0;
    for (var i = 0; i < chinaData.length; ++i) {
      if (maxValue < chinaData[i].value) {
        maxValue = chinaData[i].value;
      }
    }
    mapOption.series[0].data = chinaData;
    mapOption.dataRange.max = parseInt(maxValue * 1.1);
    map.setOption(mapOption);
    barOption = extractBarOption(chinaData);
    bar.hideLoading()
    bar.setOption(barOption, true);
  })

  this.autorun(function() {
    var data = BaxxGeoStat.find({context: self.data.context, region: self.region.get()}).fetch()
    bar.hideLoading()
    barOption = extractBarOption(data);
    bar.setOption(barOption, true);
  })

  map.on(echarts.config.EVENT.MAP_SELECTED, function(param) {
    var target = param.target;
    var targetId = chinaData.filter(function(e) {
        return e.name === target;
    })[0].id;
    self.region.set(targetId)
  })
  bar.on(echarts.config.EVENT.DBLCLICK, function(param) {
      bar.setOption(extractBarOption(chinaData), true);
  })
})
