/**
 * Created by meteor on 12/11/15.
 */
//Web扫描信息
var WebScanLocationSchema = new SimpleSchema({
    area:{
        type: String,
        optional: true,
        label: "地区"
    },
    country:{
        type: String,
        optional: true,
        label: "国家"
    },
    region:{
        type: String,
        optional: true,
        label: "省"
    },
    isp:{
        type: String,
        optional: true,
        label: "运营商"
    },
    city:{
        type: String,
        optional: true,
        label: "城市"
    },
    countryen:{
        type: String,
        optional: true,
        label: "国家英文"
    }
});

var WebScanRecordSchema = new SimpleSchema({
    ip_private:{
        type: Number,
        optional: true,
        label: "IP是否备案"
    },
    icp_private:{
        type: Number,
        optional: true,
        label: "icp是否备案"
    }
});

var WebScanSchema = new SimpleSchema({
    ip_num: {
        type: Number,
        label: "IP地址整型"
    },
    ip:{
        type: String,
        optional: true,
        label: "IP地址"
    },
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
    timestamp: {
        type: Date,
        optional: true,
        label: "时间戳"
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
    title:{
        type: String,
        optional: true,
        label: "标题"
    },
    location:{
        type: WebScanLocationSchema,
        optional: true,
        label: "地理位置"
    },
    header:{
        type: String,
        optional: true,
        label: "html header"
    },
    banner:{
        type: String,
        optional: true,
        label: "端口响应信息"
    },
    body:{
        type: String,
        optional: true,
        label: "html body"
    },
    charset:{
        type: String,
        optional: true,
        label: "html charset"
    },
    ip_port:{
        type: String,
        optional: true,
        label: "ip地址：端口"
    },
    record:{
        type: WebScanRecordSchema,
        optional: true,
        label: "备案信息"
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
            'ip_num': ip_bigint
        });
    });

    //PERIMISSION
    Meteor.users.allow({
        insert: function(userId,doc,fieldNames,modifier) { return userId && Roles.userIsInRole(userId,['admin']); },
        update: function(userId,doc,fieldNames,modifier) { return userId && Roles.userIsInRole(userId,['admin']); },
        remove: function(userId,doc) { return userId && Roles.userIsInRole(userId,['admin']); }
    });
}