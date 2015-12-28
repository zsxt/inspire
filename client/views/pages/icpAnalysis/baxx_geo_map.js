Template.BaxxGeoMap.onCreated(function() {
  var self = this
  // self.autorun(function() {
    self.subscribe('baxx_geo_stat', {
      context: self.data.context,
      region: 0
    })
  // })
})

Template.BaxxGeoMap.onRendered(function() {
  var ctx = this.data.context
  var map = echarts.init(document.getElementById('chart-map-' + ctx))

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

  var chinaData
  this.autorun(function() {
    chinaData = BaxxGeoStat.find({context: ctx, region: 0}).fetch()
    var maxValue = 0;
    for (var i = 0; i < chinaData.length; ++i) {
      if (maxValue < chinaData[i].value) {
        maxValue = chinaData[i].value;
      }
    }
    mapOption.series[0].data = chinaData;
    mapOption.dataRange.max = parseInt(maxValue * 1.1);
    map.setOption(mapOption);
  })

  map.on(echarts.config.EVENT.MAP_SELECTED, function(param) {
    var target = param.target;
    var targetId = chinaData.filter(function(e) {
        return e.name === target;
    })[0].id;
    Session.set(ctx + '-region', targetId)
  })
})
