//IP GPS
var gpsProfile = new SimpleSchema({
    lat:{
        type: Number,
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
    ua: {
        type: String,
        optional: true,
        label: "设备UserAgent"
    },
    source: {
        type: String,
        optional: true,
        label: "来源"
    },
    foundAt: {
        type: Date,
        optional: true,
        label: "发现时间"
    }
});

var IPGpsSchema = new SimpleSchema({
    ipsrc: {
        type: Number,
        label: "起始IP"
    },
    gps:{
        type: [gpsProfile],
        optional: true,
        label: "gps"
    },
    type: {
        type: String,
        optional: true,
        label: "节点类型"
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

Inspire.Schema.IPGps = IPGpsSchema;
Inspire.Collection.IPGps = new Meteor.Collection("ipgps");
Inspire.Collection.IPGps.attachSchema(Inspire.Schema.IPGps);


if (Meteor.isServer) {
    Meteor.publish('findGpsByIP', function (ip_bigint) {
        if (!this.userId) throw new Meteor.Error('403', '没有登录，权限不足');
        return Inspire.Collection.IPGps.find({
            'ipsrc': ip_bigint
        });
    });

    //PERIMISSION
    Inspire.Collection.IPGps.allow({
        insert: function(userId,doc,fieldNames,modifier) { return userId && Roles.userIsInRole(userId,['admin']); },
        update: function(userId,doc,fieldNames,modifier) { return userId && Roles.userIsInRole(userId,['admin']); },
        remove: function(userId,doc) { return userId && Roles.userIsInRole(userId,['admin']); }
    });
}