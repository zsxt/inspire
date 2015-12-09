Inspire.Seed.User = function(){
  if (Meteor.users.findOne()) {
    return;
  }

  var usr = {
      "username": 'admin',
      "password": 'admin',
      "roles": ['admin']
  };

  console.log(usr);
  //Meteor.users.insert(usr);
  ZSXT.newDoctorCreated = Accounts.createUser(usr);
  Roles.setUserRoles(ZSXT.newDoctorCreated, usr.roles);
};

