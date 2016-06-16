if (Meteor.isServer) {
  Accounts.onCreateUser(function(options, user){
    if (options.profile && options.profile.roles)
    {
      // 操作前后，不改变options的内容
      var temp1 = JSON.parse( JSON.stringify( options ) );
      var temp2 = JSON.parse( JSON.stringify( options.profile ) );

      delete temp1.profile.roles;
      
      user.profile = temp1.profile;
      user.roles = temp2.roles;
    }
    
    return user;
  })
}
