Inspire.Seed.User = function(){
    if (Meteor.users.findOne({username:'admin'})) { return; }

    var usr = {
      "username": 'admin',
      "password": 'admin123!@#',
      "profile":{
          "name": '超级用户',
          "avatar": '/img/profile_small_admin.jpg',
          "roles": ['admin'],
      }
    };

    var analyst = {
        "username": 'analyst',
        "password": 'analyst',
        "profile":{
            "name": '分析用户',
            "avatar": '/img/profile_small_analyst.jpg',
            "roles": ['analyst'],
        }
    };

    var industry = {
        "username": 'industry',
        "password": 'industry',
        "profile":{
            "name": '工控用户',
            "avatar": '/img/profile_small_industry.jpg',
            "roles": ['industry'],
        }
    };

    var guest = {
        "username": 'guest',
        "password": 'guest',
        "profile":{
            "name": '临时游客',
            "avatar": '/img/profile_small_guest.jpg',
            "roles": ['guest'],
        }
    };

    var userArray = [usr, analyst, industry, guest];
    for (var i = 0; i < userArray.length; ++i)
    {
        if (Meteor.users.findOne({username:userArray[i].username})) {   continue;   }

        console.log(userArray[i]);
        var userId = Accounts.createUser(userArray[i]);
        Roles.setUserRoles(userId, userArray[i].profile.roles);
    };
};
