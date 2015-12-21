//IP地址
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
    org: {
        type: String,
        label: '组织机构',
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
    },
    timezone1: {
        type: String,
        label: '时区1',
        optional: true
    },
    timezone2: {
        type: String,
        label: '时区2',
        optional: true
    },
    adcode: {
        type: String,
        label: '行政区划代码',
        optional: true
    },
    phonecode: {
        type: String,
        label: '国际电话代码',
        optional: true
    },
    countrycode: {
        type: String,
        label: '国家二位代码',
        optional: true
    },
    continentcode: {
        type: String,
        label: '世界大洲代码',
        optional: true
    },
    des: {
        type: String,
        label: '地址描述',
        optional: true
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
    source: {
        type: String,
        optional: true,
        label: "来源"
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
    Meteor.publish('findIPAddr', function (ip_bigint) {
        if (!this.userId) throw new Meteor.Error('403', '没有登录，权限不足');
        return Inspire.Collection.IPAddr.find({
            'ipfrom': {$lte: ip_bigint},
            'ipto': {$gte: ip_bigint}
        });
    });

    Meteor.publish('allIPAddrs', function () {
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