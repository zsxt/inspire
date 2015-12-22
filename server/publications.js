var collections = {
    'ymlb': Inspire.Collection.ICPGnBaxxYmlb,
    'iplb': Inspire.Collection.ICPGnBaxxIPlb,
    'wz': Inspire.Collection.ICPGnBaxxWz,
    'ip': Inspire.Collection.ICPGnBaxx,
    'zt': Inspire.Collection.ICPGnBaxxZt
}

Meteor.publish('baxx_stat', function(option) {
  var sub = this
  var collection = collections[option.context]
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
  var results = collection.aggregate(pipeline)
  _(results).each(function(r) {
    sub.added('baxx_stat', Random.id(), r)
  })
  sub.ready()
})

Meteor.publish('baxx_time_stat', function(option) {
  var sub = this
  var collection = collections[option.context]

  var attr = 'SCBBSJ'
  if (option.context === 'ip') {
    attr = 'SBSJ'
  }

  var projection = {
    VALUE: 1,
    _id: 0
  }
  projection[attr] = 1

  var pipeline = [
    {$project: projection},
    {$group: {'_id': '$' + attr, value: {'$sum': '$VALUE'}}},
    {$sort: {'_id': 1}},
    {$project: {id: '$_id', _id: 0, value: 1, context: {$literal: option.context}}}
  ]
  var results = collection.aggregate(pipeline)
  _(results).each(function(r) {
    sub.added('baxx_time_stat', Random.id(), r)
  })
  sub.ready()
})


function baxxGeoStat(option) {
  var sub = this
  var collection = collections[option.context]
  var level = option.level || 'sheng'
  var region = parseInt(option.region)
  console.log(region, 'hello')
  var m, g, p;
  if (level == 'sheng' || region === 0) {
    m = {}
    g = {_id: {name: '$SHENG', id: '$SHENGID'}}
    p = {id: '$_id.id', name: {$substr: ['$_id.name', 0, 6]}}
  }
  else if (level == 'shi' && [110000, 120000, 310000, 500000].indexOf(region) > -1) {
    m = {SHENGID: region},
    g = {_id: {name: '$XIAN', id: '$XIANID'}}
    p = {id: '$_id.id', name: '$_id.name'}
  }
  else {
    m = {SHENGID: region}
    g = {_id: {name: '$SHI', id: '$SHIID'}}
    p = {id: '$_id.id', name: '$_id.name'}
  }
  // if (option.context !== 'ip') {
  //   _.extend(m, {SCBBSJ: {$lte: new Date(option.end), $gte: new Date(option.start)}})
  // }
  _.extend(g, {value: {$sum: '$VALUE'}})
  _.extend(p, {value: 1, _id: 0, context: {$literal: option.context}, region: {$literal: region}})

  var pipeline = [
    {$match: m},
    {$group: g},
    {$project: p},
    {$match: {name: {$ne: null}}},
    {$sort: {value: -1}}
  ]

  var results = collection.aggregate(pipeline)
  console.log(pipeline)
  _(results).each(function(r) {
    if (r.name === '黑龙') {
      r.name = '黑龙江'
    }
    else if (r.name === '内蒙') {
      r.name = '内蒙古'
    }
    sub.added('baxx_geo_stat', Random.id(), r)
  })
  sub.ready()

}

Meteor.publish('baxx_geo_stat', baxxGeoStat)
// Meteor.publish('baxx_geo_stat_all', function(option) {
//   baxxGeoStat(_.extend(option, {level: 'sheng', region: 0}))
// })
