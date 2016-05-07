if (Meteor.isServer) {
  Accounts.onCreateUser(function(options, user){
    if (options.profile && options.profile.roles)
    {
      var roles = options.profile.roles;
      delete options.profile.roles;
           
      user.profile = options.profile;
      user.roles = roles;
    }
    
    return user;
  })
}
