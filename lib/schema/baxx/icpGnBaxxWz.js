/**
 * Created by meteor on 12/11/15.
 */

//ICP备案信息网站列表
var ICPGnBaxxWzSchema = new SimpleSchema({
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
    LRYHLX:{
        type: String,
        optional: true
    },
    SCBBSJ:{
        type: Date,
        optional: true
    }
});

Inspire.Schema.ICPGnBaxxWz = ICPGnBaxxWzSchema;
Inspire.Collection.ICPGnBaxxWz = new Meteor.Collection("data_icp_gn_baxx_wz");
Inspire.Collection.ICPGnBaxxWz.attachSchema(Inspire.Schema.ICPGnBaxxWz);


if (Meteor.isServer) {
    //ToDo -- publish

    //PERIMISSION
    Inspire.Collection.ICPGnBaxxWz.allow({
        insert: function(userId,doc,fieldNames,modifier) { return userId && Roles.userIsInRole(userId,['admin']); },
        update: function(userId,doc,fieldNames,modifier) { return userId && Roles.userIsInRole(userId,['admin']); },
        remove: function(userId,doc) { return userId && Roles.userIsInRole(userId,['admin']); }
    });
}