Template.BaxxTimeChart.onCreated(function() {
  var instance = this
  this.autorun(function() {
    var subscription = instance.subscribe('baxx_time_stat', {
      context: instance.data.context
    })
  })
})

Template.BaxxTimeChart.onRendered(function() {
  var context = this.data.context
  this.autorun(function() {
    var data = BaxxTimeStat.find({context: context}).fetch()
    line('chart-line-' + context, {date: 'id', value: 'value'}, data);
  })
})
