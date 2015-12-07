Inspire.Seed.User = function(){
  if (Meteor.users.findOne()) {
    return;
  }

  var usr = {
      "_id": "adm001",
      "username": 'admin',
      "password": '123',
      "roles": ['admin']
  };

  console.log(usr);
  Meteor.users.insert(usr);
  //  Accounts.createUser(usr)
};

