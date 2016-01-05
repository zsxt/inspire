Template.totalNum.onCreated(function() {
  var instance = Template.instance()
  instance.autorun(function() {
    var sub = instance.subscribe('baxx_total')
    if (sub.ready()) {
      instance.total = BaxxTotal.findOne()
    }
  })
})

Template.totalNum.helpers({
  domain: function() {
    var total = BaxxTotal.findOne()
    return total && total.domain;
  },
  major: function() {
    var total = BaxxTotal.findOne()
    return total && total.major;
  },
  website: function() {
    var total = BaxxTotal.findOne()
    return total && total.website;
  }
})
