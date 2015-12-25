collections = {
    'ymlb': Inspire.Collection.ICPGnBaxxYmlb,
    'iplb': Inspire.Collection.ICPGnBaxxIPlb,
    'wz': Inspire.Collection.ICPGnBaxxWz,
    'ip': Inspire.Collection.ICPGnBaxx,
    'zt': Inspire.Collection.ICPGnBaxxZt
};

Meteor.publish('baxx_stat', function(option) {
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
  var results = collection.aggregate(pipeline)
  _(results).each(function(r) {
    sub.added('baxx_stat', Random.id(), r)
  })
  sub.ready()
});

Meteor.publish('baxx_time_stat', function(option) {
  var sub = this
  collection = collections[option.context]

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
});

Meteor.publish('ipevent_stat', function(option) {
  var sub = this;
  var collection = Inspire.Collection.IPEvent;
  var projection = {
    _id: 0
  };
  projection[option.attr] = 1;

  var pipeline = [
    {$project: projection},
    {$group: {_id: '$' + option.attr, value: {$sum: 1}}},
    {$sort: {value: -1}},
    {$limit: option.limit},
    {$project: {_id: 0, id: '$_id', value: 1, attr: {$literal: option.attr}}}
  ];

  if (option.start && option.end) {
    var between = {$lte: new Date(option.end), $gte: new Date(option.start)};

    pipeline.unshift({$match: {eventAt: between}})
  }

  var results = collection.aggregate(pipeline);
  _(results).each(function(r) {
    sub.added('ipevent_stat', Random.id(), r)
  });
  sub.ready()
});