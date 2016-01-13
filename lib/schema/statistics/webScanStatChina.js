/**
 * Created by meteor on 12/11/15.
 */
//Web扫描中国统计
var WebScanStatChinaSchema = new SimpleSchema({
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
    region:{
        type: String,
        optional: true,
        label: "省份"
    },
    cnt:{
        type: Number,
        optional: true,
        label: "数量"
    }
});

Inspire.Schema.WebScanStatChina = WebScanStatChinaSchema;
Inspire.Collection.WebScanStatChina = new Meteor.Collection("webscan_statchina");
Inspire.Collection.WebScanStatChina.attachSchema(Inspire.Schema.WebScanStatChina);


if (Meteor.isServer) {
    //ToDo -- publish


    //PERIMISSION
    Inspire.Collection.WebScanStatChina.allow({
        insert: function(userId,doc,fieldNames,modifier) { return userId && Roles.userIsInRole(userId,['admin']); },
        update: function(userId,doc,fieldNames,modifier) { return userId && Roles.userIsInRole(userId,['admin']); },
        remove: function(userId,doc) { return userId && Roles.userIsInRole(userId,['admin']); }
    });
}