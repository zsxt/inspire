Meteor.zslogin = function(username,password,callback){
  var loginRequest = {
    'up':[username,password]
  };
  Accounts.callLoginMethod({
    methodArguments: [ loginRequest ],
    userCallback: callback
  });
};