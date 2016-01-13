/**
 * Created by meteor on 12/11/15.
 */
//ICP备案信息主体
var ICPGnBaxxZtSchema = new SimpleSchema({
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
    DWXZ:{
        type: Number,
        optional: true,
        label: "单位性质"
    },
    ZJLX:{
        type: Number,
        optional: true
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
    BBFS:{
        type: String,
        optional: true
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

Inspire.Schema.ICPGnBaxxZt = ICPGnBaxxZtSchema;
Inspire.Collection.ICPGnBaxxZt = new Meteor.Collection("data_icp_gn_baxx_zt");
Inspire.Collection.ICPGnBaxxZt.attachSchema(Inspire.Schema.ICPGnBaxxZt);


if (Meteor.isServer) {
    //ToDo -- publish

    //PERIMISSION
    Inspire.Collection.ICPGnBaxxZt.allow({
        insert: function(userId,doc,fieldNames,modifier) { return userId && Roles.userIsInRole(userId,['admin']); },
        update: function(userId,doc,fieldNames,modifier) { return userId && Roles.userIsInRole(userId,['admin']); },
        remove: function(userId,doc) { return userId && Roles.userIsInRole(userId,['admin']); }
    });
}