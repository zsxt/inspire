Template.plcTotal.onCreated(function() {
  var instance = Template.instance()
  instance.autorun(function() {
    var sub = instance.subscribe('plcTotal')
    if (sub.ready()) {
      instance.total = PlcTotal.findOne()
    }
  })
})

Template.plcTotal.helpers({
  ip: function() {
    var total = PlcTotal.findOne()
    return total && total.ip;
  },
  device: function() {
    var total = PlcTotal.findOne()
    return total && total.device;
  },
  maxProvince: function() {
    var total = PlcTotal.findOne()
    return total && total.maxProvince;
  },
  maxDevice: function() {
    var total = PlcTotal.findOne()
    return total && total.maxDevice;
  },
  equals: function(a, b) {
    return a == b;
  }
})

Template.plcTotal.helpers({
  equals: function(a, b) {
    return a == b;
  }
})