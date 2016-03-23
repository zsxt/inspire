Template.SimpleChart.onCreated(function() {
  var instance = this
  instance.limit = new ReactiveVar(10)
  instance.start = new ReactiveVar('')
  instance.end = new ReactiveVar('')
  instance.autorun(function() {
    var limit = instance.limit.get()
    var subscription = instance.subscribe('baxx_stat', {
      context: instance.data.context,
      attr: instance.data.attr,
      limit: instance.limit.get(),
      start: instance.start.get(),
      end: instance.end.get()
    })
  })
  instance.result = function() {
    return BaxxStat.find({context: instance.data.context, attr: instance.data.attr})
  }
})

Template.SimpleChart.onRendered(function() {
  var self = this
  var id = self.data.context + self.data.attr

  function textInfo(domId, option, data) {
    var limit = self.limit.get()
    var table = $('<table class="table table-hover table-striped no-margins"></table>')
    table.append($('<thead><tr><th>#</th><th>' + option.ta + '</th><th>' + option.tb + '</th></tr></thead>'))
    var tbody = $('<tbody></tbody>')
    for (var i = 0; i < limit && i < data.length; ++i) {
      var d = data[i];
      var tr = $('<tr></tr>')
      tr.append($('<th>' + (i + 1) + '</th>'))
      tr.append($('<td>' + d.id + '</td>'))
      tr.append($('<td>' + d.value + '</td>'))
      tbody.append(tr)
    }
    table.append(tbody)
    $('#' + domId).empty().append(table)
  }

  var chartType = self.data.chartType;
  var dom = document.getElementById('chart-' + chartType + '-' + id);
  var chart = echarts.init(dom, {
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
  });
  var option = {};
  switch (chartType) {
    case "pie":
      option = {
        tooltip: {
            trigger: 'item',
            formatter: "{b}: {c} ({d}%)"
        },
        legend: {
            orient: 'vertical',
            x: 'left',
            data:[]
        },
        series: [
            {
                type:'pie',
                radius: '60%',
                avoidLabelOverlap: true,
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
      break;
    case "pie2":
      option = {
        tooltip: {
            trigger: 'item',
            formatter: "{b}: {c} ({d}%)"
        },
        legend: {
            orient: 'vertical',
            x: 'left',
            data:[]
        },
        series: [
            {
                type:'pie',
                radius: ['15%', '70%'],
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
      break;
    case "pie3":
      option = {
        tooltip: {
            trigger: 'item',
            formatter: "{b}: {c} ({d}%)"
        },
        legend: {
            orient: 'vertical',
            x: 'left',
            data:[]
        },
        series: [
            {
                type:'pie',
                radius: ['15%', '70%'],
                avoidLabelOverlap: false,
                roseType: 'area',
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
      break;
  }
  chart.setOption(option);

  this.autorun(function() {
    var r = self.result().fetch()
    r = r.slice(0, self.limit.get());
    _.each(r, function(obj) {
      obj['name'] = obj['id'];
      delete obj['id'];
    });
    
    option.series[0].data = r;
    var names = _.pluck(r, 'name');
    option.legend.data = names;
    chart.hideLoading()
    chart.setOption(option, true);
  })

  $('.limit-' + id).val(this.limit.get())
  $('.start-' + id).val(this.start.get())
  $('.end-' + id).val(this.end.get())

  $('.limit-' + id).change(function() {
    var v = parseInt($(this).val())
    self.limit.set(v)
    $('.limit-' + id).val(v)
  })

  $('.start-' + id).change(function() {
    var v = $(this).val()
    self.start.set(v)
    $('.start-' + id).val(v)
  })

  $('.end-' + id).change(function() {
    var v = $(this).val()
    self.end.set(v)
    $('.end-' + id).val(v)
  })
})
