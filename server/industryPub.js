Meteor.publish('industry_control_china', function() {
  var pipeline = [
    {$match: {country: '中国'}},
    {$group: {_id: '$city', value: {$sum: 1}}},
    {$project: {_id: 0, name: '$_id', value: 1}}
  ]
  var result = Inspire.Collection.IndustryControl.aggregate(pipeline)
  var self = this
  _(result).each(function(r) {
    self.added('industry_control_china', Random.id(), r);
  })
  this.ready()
})
