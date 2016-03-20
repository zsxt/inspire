Meteor.publish('industry_control_china', function() {
  var pipeline = [
    {$match: {country: '中国'}},
    {$group: {_id: '$city', value: {$sum: 1}}},
    {$project: {_id: 0, name: '$_id', value: 1}}
  ]
  var result = Inspire.Collection.IndustryControl.aggregate(pipeline)
  var self = this;
  _(result).each(function(r) {
    self.added('industry_control_china', Random.id(), r);
  })
  this.ready()
})


Meteor.publish('industry_control_globe',function(){
  var pipeline_globe = [
    {$group:{_id: '$country',value:{$sum: 1}}},
    {$project:{_id:0,name:'$_id',value: 1}}
  ]
  var result_globe = Inspire.Collection.IndustryControl.aggregate(pipeline_globe)
  var self = this;
  _(result_globe).each(function(r){
    self.added('industry_control_globe',Random.id(),r);
  })
  this.ready()
})

Meteor.publish('industry_control_brand',function(){
  var pipeline_brand = [
  {$group:{_id:'$brand',value:{$sum:1}}},
  {$sort:{value:-1}},
  {$limit:10},
  {$project:{_id:0,name:'$_id',value:1}}
  ]
  var result_brand = Inspire.Collection.IndustryControl.aggregate(pipeline_brand)
  var self = this;
  _(result_brand).each(function(r){
    self.added('industry_control_brand',Random.id(),r);
  })
  this.ready()
})