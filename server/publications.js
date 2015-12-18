collections = {
    'ymlb': Inspire.Collection.ICPGnBaxxYmlb,
    'iplb': Inspire.Collection.ICPGnBaxxIPlb,
    'wz': Inspire.Collection.ICPGnBaxxWz,
    'ip': Inspire.Collection.ICPGnBaxx,
    'zt': Inspire.Collection.ICPGnBaxxZt
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
    {$limit: option.limit},
    {$project: {id: '$_id', _id: 0, value: 1, context: {$literal : option.context}, attr: {$literal: option.attr}}}
  ]
  if (option.start && option.end) {
    var between = {$lte: new Date(option.end), $gte: new Date(option.start)}
    if (option.context === 'ip') {
      pipeline.unshift({$match: {SBSJ: between}})
    }
    else {
      pipeline.unshift({$match: {SCBBSJ: between}})
    }
  }
  console.log(option)
  var results = collection.aggregate(pipeline)
  // sub.added('other_data', Random.id(), {data: results, context: option.context, attr: option.attr})
  _(results).each(function(r) {
    sub.added('other_data', Random.id(), r)
  })
  sub.ready()
})
