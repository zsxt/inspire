if (Meteor.isServer) {
  Accounts.onCreateUser(function(options, user){
    if (options.profile)  user.profile = options.profile;
    if (options.roles)  user.roles = options.roles;
    return user;
  })
}
