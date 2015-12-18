Inspire.Seed.User = function(){
  if (Meteor.users.findOne()) {
    return;
  }

  var usr = {
      "username": 'admin',
      "password": 'admin',
      "roles": ['admin'],
      "profile":{
          "name": '李逍遥',
          "avatar": 'img/profile_small_lxy.jpg'
      }
  };

  console.log(usr);
  //Meteor.users.insert(usr);
  ZSXT.newDoctorCreated = Accounts.createUser(usr);
  Roles.setUserRoles(ZSXT.newDoctorCreated, usr.roles);
};

