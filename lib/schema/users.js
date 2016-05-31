//用户基本信息
var profileInfo = new SimpleSchema({
  name: {
    type: String,
    label: '姓名'
  },
  avatar: {
    type: String,
    label: '用户头像',
    optional: true
  },
  mobile: {
    type: String,
    label: '手机',
    regEx: /^1\d{10}$/,
    optional: true
  },
  birthday: {
    type: Date,
    label: '出生日期',
    optional: true
  },
  gender: {
    type: String,
    label: '性别',
    allowedValues: ['男', '女'],
    optional: true
  },
  region: {
    type: String,
    label: '地区',
    optional: true
  }
});

var UserSchema = new SimpleSchema({
  username: {
    type: String,
    optional: true,
    label: "用户名"
  },
  password: {
    type: String,
    label: "创建密码",
    optional: true
  },
  confirmPassword: {
    type: String,
    label: "再输密码",
    optional: true
  },
  services: {
    type: Object,
    optional: true,
    blackbox: true
  },
  createdAt: {
    type: Date,
    autoValue: function () {
      if (this.isInsert) {
        return new Date();
      }
      else if (this.isUpsert) {
        return {$setOnInsert: new Date};
      }
      else {
        this.unset();
      }
    }
  },
  updatedAt: {
    type: Date,
    optional: true,
    autoValue: function () {
      if (this.isUpdate) return new Date()
    }
  },
  roles: {
    type: [String],
    label: '角色',
    allowedValues: ['admin', 'analyst', 'normal', 'guest'],
    optional: true
  },
  profile: {
    type: profileInfo,
    optional: true
  }
});

Inspire.Schema.User = UserSchema;
Meteor.users.attachSchema(Inspire.Schema.User);


if (Meteor.isServer) {
  //发布当前登录用户信息,Meteor.user By default the server publishes username, emails, and profile,所以加了一个单独的publish
  Meteor.publish('userData', function () {
    if (!this.userId) return null;
    console.log("subscribe userData :");
    return Meteor.users.find(this.userId, {
      fields: {
        roles: 1,
        profile:1
      }
    })
  });

  //我的个人信息
  Meteor.publish('myInfo', function () {
    if (!this.userId) throw new Meteor.Error('403', '没有登录，权限不足');
    // 返回当前登录用户的个人信息
    return Meteor.users.find(this.userId, {fields: {profile: 1}});
  });
  //查询后台管理员信息
  Meteor.publish('adminUsers', function (options) {
    if (!this.userId || !Roles.userIsInRole(this.userId, ['admin'])){
      throw new Meteor.Error('403', '没有登录，权限不足');
    }
    return Meteor.users.find({roles:{$in:['admin']}},options)
  });

  /**
   * 通过 Id 查询信息, 可以附带条件参数，比如 fields 限定
   */
  Meteor.publish('userById', function(uid, options) {
    return Meteor.users.find(uid, options);
  });

  //PERIMISSION
  Meteor.users.allow({
    insert: function(userId,doc,fieldNames,modifier) { return userId && Roles.userIsInRole(userId,['admin']); },
    update: function(userId,doc,fieldNames,modifier) { return userId && Roles.userIsInRole(userId,['admin']); },
    remove: function(userId,doc) { return userId && Roles.userIsInRole(userId,['admin']); }
  });
  
  
  // 除admin之外，其他所有用户账户信息
  Meteor.publish('allAccountsInfoExceptAdmin', function()
  {
    return Meteor.users.find({username:{$ne:"admin"}},{sort:{'username': 1}});
  }); 
  
}