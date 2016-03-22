Meteor.publish('plcStat', function(option) {
  var pipeline = [
    {$group: {_id: '$' + option.attr, value: {$sum: 1}}},
    {$project: {_id: 0, name: '$_id', value: 1}}
  ];
  var result = Inspire.Collection.Plc.aggregate(pipeline);
  var self = this;
  _(result).each(function(r) {
    r.name = r.name.replace(/省|市|特别行政区|壮族|维吾尔|回族|自治区/g, '');
    r.attr = option.attr;
    self.added('plcStat', option.attr + '-' + r.name, r);
  });
  this.ready();
});

Meteor.publish('plcTotal', function() { 
  var result = {ip: 0, device: 0, maxDevice: '', maxProvince: ''};
  
  function count(attr) {
    var r = Inspire.Collection.Plc.aggregate([
      {$group: {_id: '$' + attr, }},
      {$group: {_id: 1, count: {$sum: 1}}}
    ]);
    if (r && r[0]) {
      return r[0].count;
    }
    return 0;
  }
  
  function max(attr) {
    var r = Inspire.Collection.Plc.aggregate([
      {$group: {_id: '$' + attr, count: {$sum: 1}}},
      {$sort: {count: -1}},
      {$limit: 1}
    ]);
    if (r && r[0]) {
      return r[0]._id;
    }
    return null;
  }
  
  result.ip = count('ip');
  result.device = count('device');
  result.maxDevice = max('device');
  result.maxProvince = max('province');
  
  this.added('plcTotal', 0, result);
  this.ready();
})