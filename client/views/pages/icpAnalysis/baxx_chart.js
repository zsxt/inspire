Template.BaxxChart.onCreated(function() {
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

Template.BaxxChart.onRendered(function() {
  var self = this
  var id = self.data.context + self.data.attr
  this.autorun(function() {
    var r = self.result().fetch()
    pie2d('chart-pie-' + id, {category: 'id', value: 'value', yTitle: '数值'}, r);
    column2d('chart-column-' + id, {category: 'id', value: 'value', yTitle: '数值'}, r);
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
