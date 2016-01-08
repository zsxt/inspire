/**
 * Created by meteor on 12/11/15.
 */
//Web扫描世界统计
var WebScanStatWorldSchema = new SimpleSchema({
    port:{
        type: Number,
        optional: true,
        label: "开放端口"
    },
    service:{
        type: String,
        optional: true,
        label: "开放服务"
    },
    product:{
        type: String,
        optional: true,
        label: "应用类型"
    },
    version:{
        type: String,
        optional: true,
        label: "版本"
    },
    os:{
        type: String,
        optional: true,
        label: "操作系统"
    },
    devicetype:{
        type: String,
        optional: true,
        label: "设备类型"
    },
    country:{
        type: String,
        optional: true,
        label: "国家"
    },
    countryen:{
        type: String,
        optional: true,
        label: "国家英文"
    },
    cnt:{
        type: Number,
        optional: true,
        label: "数量"
    }
});

Inspire.Schema.WebScanStatWorld = WebScanStatWorldSchema;
Inspire.Collection.WebScanStatWorld = new Meteor.Collection("webscan_statworld");
Inspire.Collection.WebScanStatWorld.attachSchema(Inspire.Schema.WebScanStatWorld);


if (Meteor.isServer) {
    //ToDo -- publish


    //PERIMISSION
    Meteor.users.allow({
        insert: function(userId,doc,fieldNames,modifier) { return userId && Roles.userIsInRole(userId,['admin']); },
        update: function(userId,doc,fieldNames,modifier) { return userId && Roles.userIsInRole(userId,['admin']); },
        remove: function(userId,doc) { return userId && Roles.userIsInRole(userId,['admin']); }
    });
}