if(Meteor.isServer) {
  Meteor.startup(function () {
    for (var col in Inspire.Seed) {
      Inspire.Seed[col]();
    }
  })
}

