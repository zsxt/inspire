/**
 * Created by meteor on 12/11/15.
 */
//Web扫描信息
var WebScanSchema = new SimpleSchema({
    province:{
        type: String,
        optional: true,
        label: "省份"
    },
    service:{
        type: String,
        optional: true,
        label: "开放服务"
    },
    server_type:{
        type: String,
        optional: true,
        label: "服务器"
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
    server_port:{
        type: Number,
        optional: true,
        label: "开放端口"
    },
    value:{
        type: Number,
        optional: true
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

    //PERIMISSION
    Meteor.users.allow({
        insert: function(userId,doc,fieldNames,modifier) { return userId && Roles.userIsInRole(userId,['admin']); },
        update: function(userId,doc,fieldNames,modifier) { return userId && Roles.userIsInRole(userId,['admin']); },
        remove: function(userId,doc) { return userId && Roles.userIsInRole(userId,['admin']); }
    });
}