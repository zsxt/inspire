//IP事件
var IPEventSchema = new SimpleSchema({
    ipsrc: {
        type: Number,
        optional: true,
        label: "源IP"
    },
    ipdst: {
        type: Number,
        optional: true,
        label: "目的IP"
    },
    portsrc: {
        type: Number,
        optional: true,
        label: "源端口"
    },
    portdst: {
        type: Number,
        optional: true,
        label: "目的端口"
    },
    pro: {
        type: Number,
        optional: true,
        label: "协议类型"
    },
    event: {
        type: String,
        optional: true,
        label: "事件名称"
    },
    des: {
        type: String,
        optional: true,
        label: "事件描述"
    },
    source: {
        type: String,
        optional: true,
        label: "来源"
    },
    url: {
        type: String,
        optional: true,
        label: "url"
    },
    host: {
        type: String,
        optional: true,
        label: "host"
    },
    cookie: {
        type: String,
        optional: true,
        label: "cookie"
    },
    refer: {
        type: String,
        optional: true,
        label: "refer"
    },
    useragent: {
        type: String,
        optional: true,
        label: "useragent"
    },
    payload: {
        type: Object,
        optional: true,
        label: "payload"
    },
    pkgnum: {
        type: String,
        optional: true,
        label: "包数"
    },
    pkglen: {
        type: String,
        optional: true,
        label: "包字节数"
    },
    remark: {
        type: String,
        optional: true,
        label: "备注"
    },
    eventAt: {
        type: Date,
        optional: true,
        label: "事件时间"
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
    }
});

Inspire.Schema.IPEvent = IPEventSchema;
Inspire.Collection.IPEvent = new Meteor.Collection("ipevent");
Inspire.Collection.IPEvent.attachSchema(Inspire.Schema.IPEvent);


if (Meteor.isServer) {
    Meteor.publish('findEventByIPsrc', function (ip_bigint) {
        if (!this.userId) throw new Meteor.Error('403', '没有登录，权限不足');
        return Inspire.Collection.IPEvent.find({
            'ipsrc': ip_bigint
        });
    });

    Meteor.publish('findEventByIPdst', function (ip_bigint) {
        if (!this.userId) throw new Meteor.Error('403', '没有登录，权限不足');
        return Inspire.Collection.IPEvent.find({
            'ipdst': ip_bigint
        });
    });

    //PERIMISSION
    Meteor.users.allow({
        insert: function(userId,doc,fieldNames,modifier) { return userId && Roles.userIsInRole(userId,['admin']); },
        update: function(userId,doc,fieldNames,modifier) { return userId && Roles.userIsInRole(userId,['admin']); },
        remove: function(userId,doc) { return userId && Roles.userIsInRole(userId,['admin']); }
    });
}