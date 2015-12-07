
//console.log 'Loading fixture.coffee'

if (Meteor.isServer){
  if (Meteor.users.find({roles:{$in:['admin']}}).count() < 1){
    //Asclepius.Seed.AdminUsersSeeding();
  }
}



