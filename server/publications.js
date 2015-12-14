Meteor.publish('icp', function() {
  // return [
  //   Inspire.Collection.ICPGnBaxx.find(),
  //   Inspire.Collection.ICPGnBaxxIPlb.find(),
  //   Inspire.Collection.ICPGnBaxxWz.find(),
  //   Inspire.Collection.ICPGnBaxxYmlb.find(),
  //   Inspire.Collection.ICPGnBaxxZt.find(),
  // ]
  return Inspire.Collection.ICPGnBaxxIPlb.find()
})

collections = {
    'ymlb': Inspire.Collection.ICPGnBaxxYmlb,
    'iplb': Inspire.Collection.ICPGnBaxxIPlb,
    'wz': Inspire.Collection.ICPGnBaxxWz,
    'ip': Inspire.Collection.ICPGnBaxx,
    'zt': Inspire.Collection.ICPGnBaxxZt,
}

Meteor.publish('other_data', function(option) {
  var sub = this
  collection = collections[option.context]
  var projection = {
    VALUE: 1,
    _id: 0
  }
  projection[option.attr] = 1
  var pipeline = [
    {$project: projection},
    {$group: {_id: '$' + option.attr, value: {$sum: '$VALUE'}}},
    {$sort: {value: -1}},
    {$limit: option.limit}
  ]
  var between = {$lte: option.end, $gte: option.start}
  // if (option.context === 'ip') {
  //   pipeline.unshift({$match: {SBSJ: between}})
  // }
  // else {
  //   pipeline.unshift({$match: {SCBBSJ: between}})
  // }
  var results = collection.aggregate(pipeline)
  _.each(results, function(r) {
    sub.added('other_data', r._id, r)
  })
  sub.ready()
})

Meteor.publish('other_data2', function() {
  option = {
    context: 'iplb',
    attr: 'SHENG',
    limit: 10
  }
  var sub = this
  collection = collections['iplb']
  var results = results = collection.aggregate([
    {$project: {VALUE: 1, SHENG: 1, _id: 0}},
    {$group: {_id: '$' + option.attr, value: {$sum: '$VALUE'}}},
    {$sort: {value: -1}},
    {$limit: 10}
  ])
  _.each(results, function(r) {
    sub.added('other_data', Random.id(), r)
  })
  sub.ready()
})
