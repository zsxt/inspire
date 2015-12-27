/**
 * Created by meteor on 12/11/15.
 */
//Web扫描信息
var WebScanSchema = new SimpleSchema({
    ipdst: {
        type: Number,
        label: "IP地址"
    },
    portdst:{
        type: Number,
        optional: true,
        label: "开放端口"
    },
    service:{
        type: String,
        optional: true,
        label: "开放服务"
    },
    type:{
        type: String,
        optional: true,
        label: "服务器类型"
    },
    ip_private:{
        type: Number,
        optional: true,
        label: "IP是否备案"
    },
    icp_private:{
        type: Number,
        optional: true,
        label: "icp是否备案"
    },
    source: {
        type: String,
        optional: true,
        label: "来源"
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

Inspire.Schema.WebScan = WebScanSchema;
Inspire.Collection.WebScan = new Meteor.Collection("webscan");
Inspire.Collection.WebScan.attachSchema(Inspire.Schema.WebScan);


if (Meteor.isServer) {
    //ToDo -- publish
    Meteor.publish('findWebServerByIP', function (ip_bigint) {
        if (!this.userId) throw new Meteor.Error('403', '没有登录，权限不足');
        return Inspire.Collection.WebScan.find({
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