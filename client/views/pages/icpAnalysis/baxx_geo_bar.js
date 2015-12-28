Template.BaxxGeoBar.onCreated(function() {
  var self = this
  var ctx = self.data.context
  var key = ctx + '-region'
  Session.setDefault(key, 0)
  this.autorun(function() {
    var sub = self.subscribe('baxx_geo_stat', {
      context: ctx,
      region: Session.get(key),
      level: 'shi'
    })
  })
})

Template.BaxxGeoBar.onRendered(function() {
  var self = this
  var ctx = this.data.context
  var bar = echarts.init(document.getElementById('chart-mapbar-' + ctx), {
    loadingOption: {
      text: 'spin',
      effect: 'spin',
      textStyle: {
        fontSize: 36
      }
    },
    noDataLoadingOption: {
      effect: ''
    }
  })

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

  this.autorun(function() {
    var region = Session.get(ctx + '-region')
    var data = BaxxGeoStat.find({context: self.data.context, region: region}).fetch()
    bar.hideLoading()
    barOption = extractBarOption(data);
    bar.setOption(barOption, true);
  })

  bar.on(echarts.config.EVENT.DBLCLICK, function(param) {
      Session.set(ctx + '-region', 0)
  })

})
