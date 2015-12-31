Inspire.Seed.User = function(){

    if (Meteor.users.findOne()) {
        return;
    }

    var usr = {
      "username": 'admin',
      "password": 'admin',
      "roles": ['admin'],
      "profile":{
          "name": '超级用户',
          "avatar": 'img/profile_small_admin.jpg'
      }
    };

    var analyst = {
        "username": 'analyst',
        "password": 'analyst',
        "roles": ['analyst'],
        "profile":{
            "name": '李逍遥',
            "avatar": 'img/profile_small_lxy.jpg'
        }
    };

    var guest = {
        "username": 'guest',
        "password": 'guest',
        "roles": ['guest'],
        "profile":{
            "name": '游客',
            "avatar": 'img/profile_small.jpg'
        }
    };

    console.log(usr);
    ZSXT.newAdminCreated = Accounts.createUser(usr);
    Roles.setUserRoles(ZSXT.newAdminCreated, usr.roles);

    console.log(analyst);
    ZSXT.newAnalystCreated = Accounts.createUser(analyst);
    Roles.setUserRoles(ZSXT.newAnalystCreated, analyst.roles);

    console.log(guest);
    ZSXT.newGuestCreated = Accounts.createUser(guest);
    Roles.setUserRoles(ZSXT.newGuestCreated, guest.roles);
};

