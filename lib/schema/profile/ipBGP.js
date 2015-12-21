//IP BGP AND AS
var IPBgpSchema = new SimpleSchema({
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
    bgp: {
        type: String,
        optional: true,
        label: "边界路由"
    },
    as: {
        type: String,
        optional: true,
        label: "AS域"
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

Inspire.Schema.IPBgp = IPBgpSchema;
Inspire.Collection.IPBgp = new Meteor.Collection("ipbgp");
Inspire.Collection.IPBgp.attachSchema(Inspire.Schema.IPBgp);


if (Meteor.isServer) {
    Meteor.publish('findBgpByIP', function (ip_bigint) {
        if (!this.userId) throw new Meteor.Error('403', '没有登录，权限不足');
        return Inspire.Collection.IPBgp.find({
            'ipfrom': {$lte: ip_bigint},
            'ipto': {$gte: ip_bigint}
        });
    });

    //PERIMISSION
    Meteor.users.allow({
        insert: function(userId,doc,fieldNames,modifier) { return userId && Roles.userIsInRole(userId,['admin']); },
        update: function(userId,doc,fieldNames,modifier) { return userId && Roles.userIsInRole(userId,['admin']); },
        remove: function(userId,doc) { return userId && Roles.userIsInRole(userId,['admin']); }
    });
}