/**
 * Created by meteor on 12/11/15.
 */
//ICP备案信息IP列表
var ICPGnBaxxIPlbSchema = new SimpleSchema({
    SHENGID:{
        type: Number,
        optional: true,
        label: "省份ID"
    },
    SHIID:{
        type: Number,
        optional: true,
        label: "城市ID"
    },
    XIANID:{
        type: Number,
        optional: true,
        label: "区县ID"
    },
    VALUE:{
        type: Number,
        optional: true,
        label: "值"
    },
    SHENG:{
        type: String,
        optional: true,
        label: "省份"
    },
    SHI:{
        type: String,
        optional: true,
        label: "城市"
    },
    XIAN:{
        type: String,
        optional: true,
        label: "区县"
    }
});

Inspire.Schema.ICPGnBaxxIPlb = ICPGnBaxxIPlbSchema;
Inspire.Collection.ICPGnBaxxIPlb = new Meteor.Collection("data_icp_gn_baxx_iplb");
Inspire.Collection.ICPGnBaxxIPlb.attachSchema(Inspire.Schema.ICPGnBaxxIPlb);


if (Meteor.isServer) {
    //ToDo -- publish

    //PERIMISSION
    Meteor.users.allow({
        insert: function(userId,doc,fieldNames,modifier) { return userId && Roles.userIsInRole(userId,['admin']); },
        update: function(userId,doc,fieldNames,modifier) { return userId && Roles.userIsInRole(userId,['admin']); },
        remove: function(userId,doc) { return userId && Roles.userIsInRole(userId,['admin']); }
    });
}