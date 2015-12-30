Inspire.Seed.User = function(){

    if (Meteor.users.findOne()) {
        return;
    }

    var usr = {
      "username": 'superuser',
      "password": 'superuser',
      "roles": ['admin'],
      "profile":{
          "name": '超级用户',
          "avatar": 'img/profile_small_admin.jpg'
      }
    };

    var usr1 = {
        "username": 'admin',
        "password": 'admin',
        "roles": ['analyst'],
        "profile":{
            "name": '李逍遥',
            "avatar": 'img/profile_small_lxy.jpg'
        }
    };

    console.log(usr);
    ZSXT.newDoctorCreated = Accounts.createUser(usr);
    Roles.setUserRoles(ZSXT.newDoctorCreated, usr.roles);

    console.log(usr1);
    ZSXT.newDoctorCreated1 = Accounts.createUser(usr1);
    Roles.setUserRoles(ZSXT.newDoctorCreated1, usr1.roles);
};

