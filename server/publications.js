var collections = {
    'ymlb': Inspire.Collection.ICPGnBaxxYmlb,
    'iplb': Inspire.Collection.ICPGnBaxxIPlb,
    'wz': Inspire.Collection.ICPGnBaxxWz,
    'ip': Inspire.Collection.IPGnBaxx,
    'zt': Inspire.Collection.ICPGnBaxxZt
};

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
});

Meteor.publish('baxx_time_stat', function(option) {
  var sub = this
  var collection = collections[option.context]
  // Mongo版本低于3.0时，不支持$dateToString操作符。Jan 4,2016的提交引入$dateToString。
  // 外部Mongo版本>=3.0，没问题；自带Mongo版本低（当前1.1.7），运行时会报错。
  // 自带Mongo该collection记录为空；判断为空，函数就返回，规避此问题。
  if (undefined === collection.findOne())  {	return; }

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
    {$group: {'_id': {$dateToString: {format: '%Y-%m', date: '$' + attr}}, value: {'$sum': '$VALUE'}}},
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
  _(results).each(function(r) {
    if (r.id === 999999) { // id of value "unknown"
      return
    }
    if (r.name === '黑龙') {
      r.name = '黑龙江'
    }
    else if (r.name === '内蒙') {
      r.name = '内蒙古'
    }
    sub.added('baxx_geo_stat', r.context + '#' + r.id, r)
  })
  sub.ready()
}

Meteor.publish('baxx_geo_stat', baxxGeoStat)

Meteor.publish('baxx_total', function() {
  
  var ret = {domain: 0, major: 0, website: 0};
  
  function sumValue(c) {
    var result = collections[c].aggregate([
      {$group: {_id: null, value: {$sum: '$VALUE'}}}
    ]);
    if (result && result[0]) {
      return result[0].value;
    }
    return 0;
  }
  ret.domain = sumValue('ymlb');
  ret.major = sumValue('zt');
  ret.website = sumValue('wz');
  
  this.added('baxx_total', 0, ret)
  this.ready()
})
