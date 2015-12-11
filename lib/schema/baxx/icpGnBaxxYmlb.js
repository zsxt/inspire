/**
 * Created by meteor on 12/11/15.
 */
//ICP备案信息域名列表
var ICPGnBaxxYmlbSchema = new SimpleSchema({
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
    },
    POSTFIX:{
        type: String,
        optional: true
    },
    SCBBSJ:{
        type: Date,
        optional: true
    }
});

Inspire.Schema.ICPGnBaxxYmlb = ICPGnBaxxYmlbSchema;
Inspire.Collection.ICPGnBaxxYmlb = new Meteor.Collection("data_icp_gn_baxx_ymlb");
Inspire.Collection.ICPGnBaxxYmlb.attachSchema(Inspire.Schema.ICPGnBaxxYmlb);


if (Meteor.isServer) {
    //ToDo -- publish

    //PERIMISSION
    Meteor.users.allow({
        insert: function(userId,doc,fieldNames,modifier) { return userId && Roles.userIsInRole(userId,['admin']); },
        update: function(userId,doc,fieldNames,modifier) { return userId && Roles.userIsInRole(userId,['admin']); },
        remove: function(userId,doc) { return userId && Roles.userIsInRole(userId,['admin']); }
    });
}