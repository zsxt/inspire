Meteor.publish('hotscatterpoint', function() {
  var heatdata = Inspire.Collection.HotScatter.find().fetch();
  var data = heatdata.map(function(x) {
    return [x.longitude, x.latitude, x.if_point];
  });
  this.added('hotscatterpoint', Random.id(), {data: data});
  this.ready();
})