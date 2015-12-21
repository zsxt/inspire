//用户基本信息
var addrProfile = new SimpleSchema({
    country: {
        type: String,
        label: '国家'
    },
    province: {
        type: String,
        label: '省份',
        optional: true
    },
    city: {
        type: String,
        label: '城市',
        optional: true
    },
    district: {
        type: String,
        label: '区县',
        optional: true
    },
    street: {
        type: String,
        label: '街道',
        optional: true
    },
    areacode: {
        type: String,
        label: '地区编号',
        optional: true
    },
    lat:{
        type: Number ,
        label: '纬度',
        optional: true,
        decimal:true
    },
    lng:{
        type: Number,
        label: '经度',
        optional: true,
        decimal:true
    }
});

var accessProfile = new SimpleSchema({
    operator1: {
        type: String,
        optional: true,
        label: "一级接入商"
    },
    operator2: {
        type: String,
        optional: true,
        label: "二级接入商"
    },
    bgp: {
        type: String,
        optional: true,
        label: "边界路由"
    },
    as: {
        type: String,
        optional: true,
        label: "AS域"
    }
});

var IPAddrSchema = new SimpleSchema({
    ipfrom: {
        type: Number,
        optional: true,
        label: "起始IP"
    },
    ipto: {
        type: Number,
        optional: true,
        label: "终止IP"
    },
    addr: {
        type: addrProfile,
        optional: true,
        label: "地理属性"
    },
    access: {
        type: accessProfile,
        optional: true,
        label: "接入属性"
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
    }
});

Inspire.Schema.IPAddr = IPAddrSchema;
Inspire.Collection.IPAddr = new Meteor.Collection("ipaddr");
Inspire.Collection.IPAddr.attachSchema(Inspire.Schema.IPAddr);


if (Meteor.isServer) {
    Meteor.publish('findIPbyBigint', function (ip_bigint) {
        if (!this.userId) throw new Meteor.Error('403', '没有登录，权限不足');
        return Inspire.Collection.IPAddr.find({
            'ipfrom': {$lte: ip_bigint},
            'ipto': {$gte: ip_bigint}
        });
    });

    Meteor.publish('allips', function () {
        if (!this.userId) throw new Meteor.Error('403', '没有登录，权限不足');
        return Inspire.Collection.IPAddr.find()
    });

    //PERIMISSION
    Meteor.users.allow({
        insert: function(userId,doc,fieldNames,modifier) { return userId && Roles.userIsInRole(userId,['admin']); },
        update: function(userId,doc,fieldNames,modifier) { return userId && Roles.userIsInRole(userId,['admin']); },
        remove: function(userId,doc) { return userId && Roles.userIsInRole(userId,['admin']); }
    });
}